// server/routes/contactContentRoutes.js
import { Router } from "express";
import ContactContent from "../models/ContactContent.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/contact-content -> public, used by the Contact page.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let content = await ContactContent.findOne();
    if (!content) content = await ContactContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/contact-content -> admin only, used by the Contact Page editor.
router.put("/", requireAuth, async (req, res) => {
  try {
    const { hero, info, form, map } = req.body;
    const update = {
      ...(hero !== undefined && { hero }),
      ...(info !== undefined && { info }),
      ...(form !== undefined && { form }),
      ...(map !== undefined && { map }),
    };

    const content = await ContactContent.findOneAndUpdate({}, update, {
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
