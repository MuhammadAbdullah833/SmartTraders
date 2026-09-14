// server/models/Article.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tag: { type: String, default: "Company News", trim: true },
    date: { type: String, default: "", trim: true }, // free text, e.g. "August 2026"
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "#" },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
