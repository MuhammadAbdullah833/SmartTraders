// server/models/ThemeSettings.js
import mongoose from "mongoose";

// Singleton — the site-wide color theme, editable from the admin
// Theme Settings screen. These map 1:1 to the CSS variables defined
// in src/index.css (--theme-primary, --theme-bg, etc.) — the public
// site reads this document once on load and writes the values onto
// <html> as inline CSS variables, so the whole site re-colors.
const themeSettingsSchema = new mongoose.Schema(
  {
    primary: { type: String, default: "#8fce3c" },
    primaryLight: { type: String, default: "#c7f34c" },
    primaryDark: { type: String, default: "#8fc720" },
    onPrimary: { type: String, default: "#0c0f0a" },

    bg: { type: String, default: "#0f0c19" },
    bgPanel: { type: String, default: "#1b1824" },
    bgPanel2: { type: String, default: "#16213f" },
    bgDeep: { type: String, default: "#14231a" },
  },
  { timestamps: true }
);

export default mongoose.model("ThemeSettings", themeSettingsSchema);
