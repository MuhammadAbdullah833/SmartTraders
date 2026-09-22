// server/models/HeaderContent.js
import mongoose from "mongoose";

// Singleton — controls the site-wide navbar (logo + nav item labels).
// Links/order/dropdown behaviour stay fixed in the Header component;
// only the logo image and the visible label text are editable here.
// The "Products" dropdown itself is populated live from the Brand
// collection (see brandRoutes.js), not stored here.
const headerContentSchema = new mongoose.Schema(
  {
    logo: { type: String, default: "/logo2.png" },
    navLabels: {
      home: { type: String, default: "Home" },
      products: { type: String, default: "Products" },
      news: { type: String, default: "News & Updates" },
      about: { type: String, default: "About Us" },
      contact: { type: String, default: "Contact Us" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("HeaderContent", headerContentSchema);
