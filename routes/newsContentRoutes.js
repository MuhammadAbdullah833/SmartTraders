// server/routes/newsContentRoutes.js
import { Router } from "express";
import NewsContent from "../models/NewsContent.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/news-content -> public, used by the News page.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let content = await NewsContent.findOne();
    if (!content) content = await NewsContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/news-content -> admin only, used by the News admin screen.
// Upserts so it works even before the singleton document exists yet.
router.put("/", requireAuth, async (req, res) => {
  try {
    const { hero } = req.body;
    const update = {
      ...(hero !== undefined && { hero }),
    };

    const content = await NewsContent.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
