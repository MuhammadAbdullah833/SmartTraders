// server/routes/articleRoutes.js
import { Router } from "express";
import Article from "../models/Article.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/articles -> newest first (public — front website News page uses this)
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }).lean();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/articles/:id
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).lean();
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/articles -> create (admin only)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, tag, date, description, image, link } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "title is required" });
    }

    const article = await Article.create({
      title: title.trim(),
      tag: tag || "Company News",
      date: date || "",
      description: description || "",
      image: image || "",
      link: link || "#",
    });

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/articles/:id -> update (admin only)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { title, tag, date, description, image, link } = req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        ...(title !== undefined && { title }),
        ...(tag !== undefined && { tag }),
        ...(date !== undefined && { date }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(link !== undefined && { link }),
      },
      { new: true, runValidators: true }
    );
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/articles/:id -> (admin only)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
