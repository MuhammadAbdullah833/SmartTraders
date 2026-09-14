// server/routes/homeContentRoutes.js
import { Router } from "express";
import HomeContent from "../models/HomeContent.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/home-content -> public, used by the Home page.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) content = await HomeContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/home-content -> admin only, used by the Home Page editor.
// Upserts so it works even before the singleton document exists yet.
router.put("/", requireAuth, async (req, res) => {
  try {
    const { hero, logos, aboutSnippet, exploreSlides, testimonials, faqs, sectionVisibility } = req.body;
    const update = {
      ...(hero !== undefined && { hero }),
      ...(logos !== undefined && { logos }),
      ...(aboutSnippet !== undefined && { aboutSnippet }),
      ...(exploreSlides !== undefined && { exploreSlides }),
      ...(testimonials !== undefined && { testimonials }),
      ...(faqs !== undefined && { faqs }),
      ...(sectionVisibility !== undefined && { sectionVisibility }),
    };

    const content = await HomeContent.findOneAndUpdate({}, update, {
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
