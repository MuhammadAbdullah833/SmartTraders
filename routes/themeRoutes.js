// server/routes/themeRoutes.js
import { Router } from "express";
import ThemeSettings from "../models/ThemeSettings.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

const FIELDS = [
  "primary",
  "primaryLight",
  "primaryDark",
  "onPrimary",
  "bg",
  "bgPanel",
  "bgPanel2",
  "bgDeep",
];

// GET /api/theme -> public, read by every visitor on page load.
// Singleton: creates the default document the first time it's requested.
router.get("/", async (req, res) => {
  try {
    let theme = await ThemeSettings.findOne();
    if (!theme) theme = await ThemeSettings.create({});
    res.json(theme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/theme -> admin only, used by the Theme Settings screen.
// Upserts so it works even before the singleton document exists yet.
router.put("/", requireAuth, async (req, res) => {
  try {
    const update = {};
    for (const key of FIELDS) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }

    const theme = await ThemeSettings.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    res.json(theme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
