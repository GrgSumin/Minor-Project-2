# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Three apps in one repo, all independent:

- `backend/` — Express + Mongoose REST API (port 4000).
- `frontend/` — Customer storefront (React + Vite, port 5173).
- `admin/` — Admin panel (React + Vite, port 5174).

## Common commands

This project uses **yarn**, not npm. `package-lock.json` files have been removed in favour of `yarn.lock`.

Backend (from `backend/`):
```
yarn install
yarn dev          # nodemon, hot reload
yarn start        # plain node
yarn seed         # populate brands/categories/products (~150 items, idempotent)
yarn seed:wipe    # clear catalog first, then reseed
```
Requires a `.env` file (template: `.env.example`). On first start with a valid SMTP/JWT config, an admin user is seeded from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.

Frontend (from `frontend/`):
```
yarn install
yarn dev          # vite on :5173
yarn build
yarn lint
```

Admin (from `admin/`):
```
yarn install
yarn dev          # vite on :5174
yarn build
```

Both client apps read `VITE_API_URL` (defaults to `http://localhost:4000`).

There is no test runner configured.

## Backend architecture

`backend/App.js` boots Express, connects Mongo via `config/db.js`, seeds an admin via `utils/seedAdmin.js`, then mounts routers under `/api/*`:

```
/api/auth        register, login, admin-login, me, updateProfile
/api/products    list (q/category/brand/price/sort/page), CRUD (admin), :id/related
/api/categories  list + admin CRUD
/api/brands      list + admin CRUD
/api/orders      create (auth), mine, list-all (admin), update-status (admin)
/api/reviews     /product/:productId GET + upsert; DELETE (owner or admin)
/api/wishlist    list, toggle, remove (all auth)
/api/users       list customers (admin)
/api/health      ok ping
```

Per-feature code splits into `controllers/`, `routes/`, `models/`. Cross-cutting concerns:

- `middleware/authMiddleware.js` — `protect` (JWT) and `isAdmin` (role check). All write routes use these.
- `middleware/upload.js` — multer instance writing to `backend/uploads/` (served at `/static`), 5MB cap, jpg/png/webp only.
- `middleware/errorMiddleware.js` — global `notFound` + `errorHandler`, used at the bottom of `App.js`.
- `services/mailer.js` — nodemailer transport. If `SMTP_USER`/`SMTP_PASS` aren't set, emails are logged to stdout instead of sent. Order creation calls it twice (owner notification + customer confirmation) fire-and-forget.
- `config/jwt.js` — single `signToken` / `verifyToken` pair, uses `JWT_SECRET` and `JWT_EXPIRES_IN`.

Passwords use bcrypt via `userSchema.pre("save")`. Don't reintroduce md5.

`models/Order.js` exports `ORDER_STATUSES` as a sibling property of the model: `["pending","confirmed","shipped","delivered","cancelled"]`. Status changes go through `PUT /api/orders/:id/status` (admin-only).

`models/Product.js` has a text index on `title`/`description` and a pre-validate hook that regenerates `slug` whenever `title` changes. Reviews update `rating`/`numReviews` via `recomputeProductRating()` in `reviewController.js`.

`GET /api/products/:id/related` is a simple content-based recommender: it first looks for other products sharing both **category and brand**, sorted by `rating` then `numReviews`. If there aren't at least 4 hits, it falls back to fill out 8 from the same category alone. The product page calls this endpoint and renders the result via `ProductCard` in a "You may also like" grid. Don't try to fold this into the main listing endpoint — keep it on its own URL so caching/recommendations can evolve independently.

The seed script lives in `backend/utils/`. `seedData.js` defines the brand/category/catalog spec — title pools, brand pools, price ranges, image pools per category — and `seedProducts.js` is the runnable that connects to Mongo and inserts. Each category has its own image pool of files that actually live in `backend/uploads/`, so seeded products show real instrument photos. Image filenames are cycled (with intentional reuse) — that's expected for demo data.

No payment integration. Checkout creates an order and emails the owner — that's the whole flow.

## Frontend architecture (`frontend/`)

- Entry: `src/main.jsx` wraps `<App />` in `BrowserRouter` and `ToastContainer`. No UI library — plain CSS with design tokens in `src/styles/global.css`.
- `src/App.jsx` declares routes. Auth-gated routes are nested under `<ProtectedRoute />` which redirects to `/login`.
- State is **Zustand**, not Context. Three stores in `src/store/`:
  - `authStore` — user + token, persisted via `zustand/middleware/persist` under key `im-auth`.
  - `cartStore` — items, `drawerOpen`, add/remove/setQuantity, persisted under `im-cart`.
  - `wishlistStore` — fetched from server; `App.jsx` calls `fetch()` on auth changes.
- `src/api/client.js` — single axios instance reads `VITE_API_URL`, attaches Bearer token from `authStore`, auto-logs-out on 401. Use this for every API call. `imageUrl(filename)` returns `<API>/static/<filename>` (falls back to `/placeholder.svg`).
- `src/components/CartDrawer.jsx` is mounted globally in `App.jsx`; any component can call `useCartStore.getState().openDrawer()`.

## Admin architecture (`admin/`)

- Lives at port 5174 to avoid colliding with the storefront in dev.
- Same Zustand auth pattern under a separate localStorage key (`im-admin-auth`).
- `App.jsx` wraps protected routes in `RequireAdmin` (checks `token` AND `user.role === "admin"`) + `Layout` (sidebar + topbar). `Login` posts to `/api/auth/admin-login`, which rejects non-admins.
- Categories and Brands share `components/NameListCrud.jsx` — any future "name-only" list type can reuse it: `<NameListCrud title="..." endpoint="/foo" />`.

## Cross-app conventions

- All API paths are plural collections (`/products`, `/orders`, `/reviews`) — keep that going.
- Currency is rendered as `Rs. {n.toLocaleString()}` in the UI.
- Image uploads use `multipart/form-data` with field name `image`.
- Use the `card`, `btn`, `btn-ghost`, `input`, `badge` utility classes from `global.css` — they exist in both clients with matching design tokens.
