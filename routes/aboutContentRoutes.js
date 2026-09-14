// server/routes/aboutContentRoutes.js
import { Router } from "express";
import AboutContent from "../models/AboutContent.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/about-content -> public, used by the About page.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let content = await AboutContent.findOne();
    if (!content) content = await AboutContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/about-content -> admin only, used by the About Page editor.
router.put("/", requireAuth, async (req, res) => {
  try {
    const { hero, stats, story, drives, brands, ctaBanner } = req.body;
    const update = {
      ...(hero !== undefined && { hero }),
      ...(stats !== undefined && { stats }),
      ...(story !== undefined && { story }),
      ...(drives !== undefined && { drives }),
      ...(brands !== undefined && { brands }),
      ...(ctaBanner !== undefined && { ctaBanner }),
    };

    const content = await AboutContent.findOneAndUpdate({}, update, {
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
