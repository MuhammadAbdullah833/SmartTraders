// server/models/NewsContent.js
import mongoose from "mongoose";

// Singleton — only one NewsContent document exists. Backs the Hero section
// shown on the public News & Updates page. The articles themselves are a
// separate collection (see Article.js) managed from the same admin screen.
const newsContentSchema = new mongoose.Schema(
  {
    hero: {
      titleLine1: { type: String, default: "News &" },
      titleHighlight: { type: String, default: "Updates" },
      subtitle: {
        type: String,
        default:
          "Stay up to date with our latest product launches, partnerships, and stories from the world of solar energy.",
      },
      heroImage: { type: String, default: "/goodwebg.jpg" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("NewsContent", newsContentSchema);
