import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useIsAuthenticated } from "./store/authStore";
import { useWishlistStore } from "./store/wishlistStore";

export default function App() {
  const isAuth = useIsAuthenticated();
  const fetchWishlist = useWishlistStore((s) => s.fetch);
  const clearWishlist = useWishlistStore((s) => s.clear);

  useEffect(() => {
    if (isAuth) fetchWishlist();
    else clearWishlist();
  }, [isAuth, fetchWishlist, clearWishlist]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderConfirmation />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
