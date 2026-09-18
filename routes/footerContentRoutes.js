// server/routes/footerContentRoutes.js
import { Router } from "express";
import FooterContent from "../models/FooterContent.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/footer-content -> public, used by the site Footer.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let content = await FooterContent.findOne();
    if (!content) content = await FooterContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/footer-content -> admin only, used by the Footer editor.
// Upserts so it works even before the singleton document exists yet.
router.put("/", requireAuth, async (req, res) => {
  try {
    const { top, newsletter, columnTitles, mainPagesLinks, brandLinks, contact, copyrightText } = req.body;
    const update = {
      ...(top !== undefined && { top }),
      ...(newsletter !== undefined && { newsletter }),
      ...(columnTitles !== undefined && { columnTitles }),
      ...(mainPagesLinks !== undefined && { mainPagesLinks }),
      ...(brandLinks !== undefined && { brandLinks }),
      ...(contact !== undefined && { contact }),
      ...(copyrightText !== undefined && { copyrightText }),
    };

    const content = await FooterContent.findOneAndUpdate({}, update, {
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
