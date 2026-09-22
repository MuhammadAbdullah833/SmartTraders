// server/routes/uploadRoutes.js
import { Router } from "express";
import upload from "../middleware/upload.js";
import uploadDatasheet from "../middleware/uploadDatasheet.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// POST /api/upload  (multipart/form-data, field name "image") -> { url }
router.post("/", requireAuth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image file received" });
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

// POST /api/upload/datasheet  (multipart/form-data, field name "datasheet") -> { url }
router.post("/datasheet", requireAuth, (req, res) => {
  uploadDatasheet.single("datasheet")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No PDF file received" });
    }
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

export default router;
