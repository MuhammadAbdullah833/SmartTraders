// server/routes/headerContentRoutes.js
import { Router } from "express";
import HeaderContent from "../models/HeaderContent.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/header-content -> public, used by the site-wide Header.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let content = await HeaderContent.findOne();
    if (!content) content = await HeaderContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/header-content -> admin only, used by the Navbar admin screen.
// Upserts so it works even before the singleton document exists yet.
router.put("/", requireAuth, async (req, res) => {
  try {
    const { logo, navLabels } = req.body;
    const update = {
      ...(logo !== undefined && { logo }),
      ...(navLabels !== undefined && { navLabels }),
    };

    const content = await HeaderContent.findOneAndUpdate({}, update, {
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
