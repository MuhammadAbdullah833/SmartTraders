// server/models/AboutContent.js
import mongoose from "mongoose";

// Singleton — only one AboutContent document exists. Backs everything
// shown on the public About page (Hero, Stats strip, Our Story,
// What Drives Us, Brands We Work With, CTA banner).
const aboutContentSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "Powering a Sustainable Future" },
      subtitle: {
        type: String,
        default:
          "We are a solar technology company helping homes and businesses switch to clean, reliable energy — sourcing and supplying premium inverters, batteries, and solar solutions from the world's leading brands.",
      },
      heroImage: { type: String, default: "/goodwebg.jpg" },
    },

    stats: {
      type: [
        {
          figure: { type: String, default: "" },
          label: { type: String, default: "" },
        },
      ],
      default: [
        { figure: "10+", label: "Years of Experience" },
        { figure: "5,000+", label: "Installations Powered" },
        { figure: "6", label: "Global Brand Partners" },
        { figure: "24/7", label: "Customer Support" },
      ],
    },

    story: {
      image: { type: String, default: "/about-rt.png" },
      eyebrow: { type: String, default: "Our Story" },
      heading: { type: String, default: "Building trust in solar, one installation at a time" },
      paragraph1: {
        type: String,
        default:
          "What started as a small team passionate about renewable energy has grown into a trusted name in the solar industry. We partner directly with globally recognized manufacturers — Huawei, Sungrow, Goodwe, Solis, Pylontech, and Aip Solar — to bring dependable inverters, batteries, and energy solutions to our customers.",
      },
      paragraph2: {
        type: String,
        default:
          "Every product we sell is backed by genuine warranties, technical support, and a team that understands solar systems inside and out. Our goal is simple: make clean energy accessible, efficient, and easy to manage.",
      },
    },

    drives: {
      missionText: {
        type: String,
        default:
          "To accelerate the shift to clean energy by delivering reliable, high-performance solar products backed by expert support at every step.",
      },
      visionText: {
        type: String,
        default:
          "A future where every home and business generates and manages its own clean, affordable energy — with zero compromise on performance.",
      },
      valuesText: {
        type: String,
        default:
          "Transparency, technical excellence, and long-term relationships with our customers and brand partners guide every decision we make.",
      },
    },

    brands: {
      type: [String],
      default: ["Huawei", "Sungrow", "GoodWe", "Solis", "Pylontech", "AlpSolar"],
    },

    ctaBanner: {
      title: { type: String, default: "Ready to go solar?" },
      subtitle: { type: String, default: "Talk to our team and find the right solution for your energy needs." },
    },
  },
  { timestamps: true }
);

export default mongoose.model("AboutContent", aboutContentSchema);
