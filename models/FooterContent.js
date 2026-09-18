// server/models/FooterContent.js
import mongoose from "mongoose";

// Singleton — only one FooterContent document exists. Backs every piece of
// TEXT shown in the site footer (Footer.jsx). The links themselves (the
// `to="..."` on each <Link>) stay hardcoded in Footer.jsx on purpose — only
// the label shown for each link is editable here. mainPagesLinks and
// brandLinks are fixed-length arrays: index 0 of mainPagesLinks is always
// the "Home" link's label, index 1 is "About Us", etc — same order as the
// <Link> elements in Footer.jsx. Don't reorder/resize these arrays without
// updating Footer.jsx to match.
const footerContentSchema = new mongoose.Schema(
  {
    top: {
      heading: { type: String, default: "Ready To Transform Your Farm With?" },
      ctaText: { type: String, default: "Get A Quote" },
    },

    newsletter: {
      highlight: { type: String, default: "SIGN UP" },
      text1: { type: String, default: "FOR ALL THE LATEST" },
      text2: { type: String, default: "NEWS AND OFFERS" },
      emailPlaceholder: { type: String, default: "Enter your email address" },
    },

    columnTitles: {
      mainPages: { type: String, default: "Main Pages" },
      brands: { type: String, default: "Our Brand" },
      contact: { type: String, default: "Contact Us" },
    },

    // Fixed order — matches the hardcoded <Link to="..."> order in Footer.jsx:
    // Home, About Us, Services, News & Updates, Contact Us
    mainPagesLinks: {
      type: [String],
      default: ["Home", "About Us", "Services", "News & Updates", "Contact Us"],
    },

    // Fixed order — matches the hardcoded <Link to="/brands/..."> order:
    // sungrow, solis, pylontech, alpsolar, huawei
    brandLinks: {
      type: [String],
      default: ["Sungrow", "Solis", "Pylontech", "Alpsolar", "Huawei"],
    },

    contact: {
      phoneLabel: { type: String, default: "Phone No:" },
      phone: { type: String, default: "+92 321 8455 759" },
      addressLabel: { type: String, default: "Our Address" },
      address: {
        type: String,
        default: "Office # 8, Aslam Plaza, Main Boulevard, Khyban-e-Jinnah, DHA Road, Lahore Cantt",
      },
      emailLabel: { type: String, default: "Send E-Mail" },
      email: { type: String, default: "info@smarttraders.com" },
    },

    // Year is prepended automatically in Footer.jsx (new Date().getFullYear()) —
    // this field is only the text that follows it.
    copyrightText: { type: String, default: "SmartTraders. All rights reserved." },
  },
  { timestamps: true }
);

export default mongoose.model("FooterContent", footerContentSchema);
