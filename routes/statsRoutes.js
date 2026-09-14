// server/routes/statsRoutes.js
import { Router } from "express";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import Article from "../models/Article.js";
import QuoteRequest from "../models/QuoteRequest.js";
import ContactMessage from "../models/ContactMessage.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/stats -> live counts for the admin Dashboard
router.get("/", requireAuth, async (req, res) => {
  try {
    const [totalBrands, totalProducts, totalArticles, newQuoteRequests, newContactMessages] =
      await Promise.all([
        Brand.countDocuments(),
        Product.countDocuments(),
        Article.countDocuments(),
        QuoteRequest.countDocuments({ isRead: false }),
        ContactMessage.countDocuments({ isRead: false }),
      ]);
    res.json({ totalBrands, totalProducts, totalArticles, newQuoteRequests, newContactMessages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
