// server/models/Brand.js
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    // URL-safe identifier used in /brands/:slug on the public site
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    brandName: { type: String, required: true, trim: true },
    bannerImage: { type: String, default: "" },
    eyebrow: { type: String, default: "OUR PRODUCTS" },
    // Two-line heading shown on the brand page banner
    heading: { type: [String], default: [] },
    // Logo shown in product listing / cards
    logo: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);
