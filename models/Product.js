// server/models/Product.js
import mongoose from "mongoose";

const infoBoxSchema = new mongoose.Schema(
  { title: String, text: String },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    // URL-safe identifier used in /products/:id on the public site
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Every product belongs to exactly one brand
    brandSlug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Denormalized brand display name (breadcrumbs, "Brand" spec row, etc.)
    category: { type: String, required: true, trim: true },

    model: { type: String, required: true, trim: true },
    subHeading: { type: String, default: "" },
    range: { type: String, default: "" },
    img: { type: String, default: "" },
    hoverImg: { type: String, default: "" },
    tagline: { type: String, default: "" },

    specs: { type: mongoose.Schema.Types.Mixed, default: {} },
    bullets: { type: [String], default: [] },
    thumbnails: { type: [String], default: [] },

    datasheetUrl: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    sectionHeading: { type: String, default: "" },

    infoLarge: { type: infoBoxSchema, default: null },
    infoBoxes: { type: [infoBoxSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
