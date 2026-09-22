// server/models/ContactContent.js
import mongoose from "mongoose";

// Singleton — only one ContactContent document exists. Backs everything
// shown on the public Contact page (Hero, Info cards, Form heading, Map).
// NOTE: this is different from ContactMessage, which stores the messages
// visitors submit through the contact form.
const contactContentSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: "— GET IN TOUCH" },
      titleLine1: { type: String, default: "We'd Love to" },
      titleHighlight: { type: String, default: "Hear From You" },
      text: {
        type: String,
        default:
          "Have a question about our products or need help choosing the right solar solution? Our team is here to help.",
      },
      heroImage: { type: String, default: "/goodwebg.jpg" },
    },

    info: {
      phone1: { type: String, default: "0321 8455759" },
      phone2: { type: String, default: "0300 8455759" },
      email: { type: String, default: "info@smart.traders.com" },
      whatsappNumber: { type: String, default: "923218455759" },
      whatsappLabel: { type: String, default: "Chat with us" },
      addressLine1: { type: String, default: "Office # 8, Aslam Plaza, Main Boulevard," },
      addressLine2: { type: String, default: "Khyban-e-Jinnah, DHA Road, Lahore Cantt" },
    },

    form: {
      heading: { type: String, default: "Send Us a Message" },
      subtext: { type: String, default: "Fill out the form below and our team will get back to you shortly." },
    },

    map: {
      embedUrl: {
        type: String,
        default:
          "https://www.google.com/maps?q=Aslam+Plaza+Main+Boulevard+Khyban-e-Jinnah+DHA+Lahore+Cantt&output=embed",
      },
      iframeTitle: { type: String, default: "Office Location - Aslam Plaza, DHA Road, Lahore Cantt" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactContent", contactContentSchema);
