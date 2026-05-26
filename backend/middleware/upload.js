const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (/^image\/(jpeg|jpg|png|webp)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, PNG, or WEBP images are allowed"), false);
};

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
