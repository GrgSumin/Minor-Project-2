require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const Product = require("../models/Product");
const { BRANDS, CATEGORIES, CATALOG, adjectives, finishes } = require("./seedData");

function syncSeedImages() {
  const src = path.join(__dirname, "..", "seed-images");
  const dst = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
  let copied = 0;
  for (const file of fs.readdirSync(src)) {
    if (file.startsWith(".")) continue;
    const target = path.join(dst, file);
    if (!fs.existsSync(target)) {
      fs.copyFileSync(path.join(src, file), target);
      copied++;
    }
  }
  if (copied) console.log(`Copied ${copied} seed images to uploads/`);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundPrice(n) {
  // round to nearest 100 for clean Rs. amounts
  return Math.round(n / 100) * 100;
}

async function run() {
  syncSeedImages();
  await connectDB();
  const args = process.argv.slice(2);
  const wipe = args.includes("--wipe");

  if (wipe) {
    console.log("Wiping products, categories, brands...");
    await Promise.all([Product.deleteMany({}), Category.deleteMany({}), Brand.deleteMany({})]);
  }

  console.log("Seeding brands...");
  const brandDocs = {};
  for (const name of BRANDS) {
    let doc = await Brand.findOne({ name });
    if (!doc) doc = await Brand.create({ name });
    brandDocs[name] = doc;
  }

  console.log("Seeding categories...");
  const categoryDocs = {};
  for (const name of CATEGORIES) {
    let doc = await Category.findOne({ name });
    if (!doc) doc = await Category.create({ name });
    categoryDocs[name] = doc;
  }

  const existingTitles = new Set((await Product.find({}, "title")).map((p) => p.title));

  console.log("Seeding products...");
  let created = 0;
  let skipped = 0;

  for (const [catName, spec] of Object.entries(CATALOG)) {
    const cat = categoryDocs[catName];
    if (!cat) continue;

    for (let i = 0; i < spec.count; i++) {
      const brandName = pick(spec.brandPool);
      const brand = brandDocs[brandName];
      const modelName = spec.models[i % spec.models.length];

      // Vary titles so we never duplicate exactly. ~30% get an adjective prefix
      // and ~25% get a finish suffix. The rest stay as "Brand Model".
      let title = `${brandName} ${modelName}`;
      if (Math.random() < 0.3) title = `${pick(adjectives)} ${title}`;
      if (Math.random() < 0.25) title = `${title} — ${pick(finishes)}`;

      // Disambiguate clashes by appending a year
      if (existingTitles.has(title)) {
        const year = pickInt(2018, 2025);
        title = `${title} (${year})`;
      }
      if (existingTitles.has(title)) {
        skipped++;
        continue;
      }
      existingTitles.add(title);

      const price = roundPrice(pickInt(spec.priceRange[0], spec.priceRange[1]));
      const stock = pickInt(0, 25);
      const image = spec.images[i % spec.images.length];
      const featured = Math.random() < 0.12; // ~12% featured
      const rating = Math.random() < 0.4 ? 0 : Number((3.5 + Math.random() * 1.5).toFixed(1));
      const numReviews = rating === 0 ? 0 : pickInt(1, 60);

      await Product.create({
        title,
        description: spec.description(title),
        price,
        stock,
        brand: brand._id,
        category: cat._id,
        image,
        featured,
        rating,
        numReviews,
      });
      created++;
    }
  }

  console.log(`\nDone. Created ${created} products (${skipped} skipped as duplicates).`);
  console.log(`Total products now in DB: ${await Product.countDocuments()}`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
