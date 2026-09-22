// server/middleware/uploadDatasheet.js
import multer from "multer";
import path from "path";
import { UPLOADS_DIR } from "./upload.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40);
    cb(null, `${Date.now()}-${base || "datasheet"}${ext}`);
  },
});

const ALLOWED_TYPES = new Set(["application/pdf"]);

function fileFilter(req, file, cb) {
  if (!ALLOWED_TYPES.has(file.mimetype)) {
    return cb(new Error("Only PDF files are allowed for the datasheet"));
  }
  cb(null, true);
}

const uploadDatasheet = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

export default uploadDatasheet;
