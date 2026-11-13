const crypto = require("node:crypto");
const express = require("express");
const multer = require("multer");
const path = require("node:path");
const templates = require("./templates");

const app = express();
const publicDirectory = path.join(__dirname, "..", "public");
const uploadDirectory = path.join(publicDirectory, "uploads");
const designs = [];
const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp"
};
let nextDesignId = 1;

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
      callback(null, `${crypto.randomUUID()}${imageExtensions[file.mimetype]}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, callback) => {
    callback(null, imageExtensions[file.mimetype] !== undefined);
  }
});

app.use(express.json());
app.use("/uploads", express.static(uploadDirectory));

app.get("/", (req, res) => {
  return res.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/templates", (req, res) => {
  return res.json(templates);
});

app.post("/design", (req, res) => {
  const { text, templateId } = req.body || {};
  const numericTemplateId = Number(templateId);

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "text must not be empty" });
  }

  const template = templates.find((item) => item.id === numericTemplateId);
  if (!template) {
    return res.status(404).json({ error: "Template not found" });
  }

  const design = {
    designId: nextDesignId++,
    text: text.trim(),
    templateId: template.id,
    templateName: template.name,
    imageUrl: template.imageUrl,
    backgroundColor: "#ffffff"
  };

  designs.push(design);
  return res.status(201).json(design);
});

app.patch("/design/:designId/color", (req, res) => {
  const designId = Number(req.params.designId);
  const { backgroundColor } = req.body || {};
  const design = designs.find((item) => item.designId === designId);

  if (!design) {
    return res.status(404).json({ error: "Design not found" });
  }

  if (typeof backgroundColor !== "string" || !/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(backgroundColor)) {
    return res.status(400).json({ error: "backgroundColor must be a 3- or 6-digit hex color" });
  }

  design.backgroundColor = backgroundColor.toLowerCase();
  return res.json(design);
});

app.post("/upload", (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      return res.status(status).json({ error: error.message });
    }

    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({ error: "A JPEG, PNG, or WebP image file is required" });
    }

    return res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

module.exports = app;
