const User = require("../models/User");

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) return;
  const exists = await User.findOne({ role: "admin" });
  if (exists) return;
  await User.create({
    name: "Admin",
    email,
    password,
    role: "admin",
  });
  console.log(`Seeded admin user: ${email}`);
}

module.exports = seedAdmin;
