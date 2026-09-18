// server/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import quoteRequestRoutes from "./routes/quoteRequestRoutes.js";
import contactMessageRoutes from "./routes/contactMessageRoutes.js";
import homeContentRoutes from "./routes/homeContentRoutes.js";
import aboutContentRoutes from "./routes/aboutContentRoutes.js";
import contactContentRoutes from "./routes/contactContentRoutes.js";
import footerContentRoutes from "./routes/footerContentRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Uploaded images are served from here, e.g. http://localhost:5000/uploads/169...-panel.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/quote-requests", quoteRequestRoutes);
app.use("/api/contact-messages", contactMessageRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/about-content", aboutContentRoutes);
app.use("/api/contact-content", contactContentRoutes);
app.use("/api/footer-content", footerContentRoutes);
app.use("/api/stats", statsRoutes);

// Fallback error handler so a bad request never crashes the server
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET missing in server/.env — set it to any long random string.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
});
