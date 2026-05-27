const fs = require("fs");
const path = require("path");

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
  if (copied) console.log(`Synced ${copied} seed images to uploads/`);
}

module.exports = syncSeedImages;
