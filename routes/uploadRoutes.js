// server/routes/uploadRoutes.js
import { Router } from "express";
import upload from "../middleware/upload.js";
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

export default router;
