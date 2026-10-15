const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const restaurantController = require("../controllers/restaurantController");

const router = express.Router();

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, "logo-" + req.params.id + "-" + Date.now() + ext);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    return cb(new Error("Only .jpg and .png files are allowed"));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

function uploadImage(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: true, message: "File is too big. Max size is 1 MB" });
    }
    if (err) {
      return res.status(400).json({ error: true, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: true, message: "Please choose a jpg or png file" });
    }
    next();
  });
}

router.get("/", restaurantController.getAll);
router.get("/:id", restaurantController.getById);
router.post("/", restaurantController.create);
router.patch("/:id", restaurantController.update);
router.delete("/:id", restaurantController.remove);
router.post("/:id/menu", restaurantController.addMenuItem);
router.post("/:id/image", uploadImage, restaurantController.saveImage);

module.exports = router;
