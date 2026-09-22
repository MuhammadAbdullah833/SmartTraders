// server/models/HomeContent.js
import mongoose from "mongoose";

// This is a singleton — only ever one HomeContent document exists.
// It backs everything shown on the public Home page (Hero, Logo Slider,
// About snippet, Explore slides, Solution testimonials, FAQ) so the
// admin CMS can edit it without touching code.
const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      badgeText: { type: String, default: "Smart Traders is Here." },
      titleLine1: { type: String, default: "Shaping" },
      titleHighlight: { type: String, default: "Sustainable" },
      titleLine3: { type: String, default: "Future Today" },
      bgImage: { type: String, default: "/mainbanner.png" },
      thumbImage: { type: String, default: "/f.png" },
      bottomText: {
        type: String,
        default: "Seamlessly facilitate reliable technologies after team building ideas equity invested",
      },
      ctaText: { type: String, default: "GET A QUOTE" },
      cardImage: { type: String, default: "/ow.jpg" },
      cardCaption: { type: String, default: "Renewable-Energy\nFuture Begins" },
      socialText: { type: String, default: "More than 18 k customer all\nover the world" },
    },

    logos: {
      type: [String],
      default: ["/1.png", "/2.jpg", "/3.jpg", "/9.png", "/13.png", "/11.png"],
    },

    aboutSnippet: {
      introText: {
        type: String,
        default:
          "We're helping farmers turn waste opportunity with sustainable biogas systems that fuel productivity and protect the planet.",
      },
      ctaText: { type: String, default: "SEE ALL SERVICES" },
      image1: { type: String, default: "/ab1.jpg" },
      image2: { type: String, default: "/ab2.jpg" },
      eyebrow: { type: String, default: "ABOUT MORE" },
      headline: { type: String, default: "POWERING FARMS WITH CIRCULAR ENERGY" },
      tags: {
        type: [String],
        default: [
          "Sustainable",
          "Innovative",
          "Global",
          "Reliable",
          "Impactful",
          "Adaptive",
          "Efficient",
          "Visionary",
          "Collaborative",
        ],
      },
      stat1Number: { type: String, default: "15" },
      stat1Unit: { type: String, default: "%" },
      stat1Label: { type: String, default: "Innovating for Sustainability" },
      stat2Number: { type: String, default: "5K" },
      stat2Unit: { type: String, default: "+" },
      stat2Label: { type: String, default: "Building a Cleaner Future" },
    },

    exploreSlides: {
      type: [
        {
          subtitle: { type: String, default: "" },
          // Brand logo shown inside the badge above the title (above `subtitle`).
          // Uploaded from the admin panel and stored as an /uploads/... path,
          // same pattern as every other image field on this schema.
          badgeLogo: { type: String, default: "" },
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          cta: { type: String, default: "Explore All" },
          image: { type: String, default: "" },
          align: { type: String, enum: ["left", "right"], default: "left" },
        },
      ],
      default: [
        {
          subtitle: "SUNGROW",
          badgeLogo: "",
          title: "Enhance your energy efficiency and profit with our cutting edge products.",
          desc: "Maximize solar performance with Sungrow's efficient, reliable inverters.",
          cta: "Explore All",
          image: "/pb9.jpg",
          align: "left",
        },
        {
          subtitle: "ALPSOLAR",
          badgeLogo: "",
          title: "Commercial & Industrial One-Fits-All Solution",
          desc: "Commercial & Industrial Solar Solutions Built for Performance",
          cta: "Explore All",
          image: "/alp1.webp",
          align: "right",
        },
        {
          subtitle: "GOODWE",
          badgeLogo: "",
          title: "Comfort and savings with Goodwe residential inverters",
          desc: "Comfort, Savings, and Reliable Power with GoodWe Inverters",
          cta: "Explore All",
          image: "/goodwebg.jpg",
          align: "left",
        },
        {
          subtitle: "SOLIS",
          badgeLogo: "",
          title: "Need Reliability? Try Solis Inverters",
          desc: "Reduce carbon emissions your environmental footprint with clean renewable biogas energy.",
          cta: "Explore All",
          image: "/solisbg.jpg",
          align: "right",
        },
        {
          subtitle: "PYLONTECH",
          badgeLogo: "",
          title: "Commercial & Industrial One-Fits-All Solution",
          desc: "Reduce carbon emissions your environmental footprint with clean renewable biogas energy.",
          cta: "Explore All",
          image: "/pylontech.jpg",
          align: "left",
        },
      ],
    },

    testimonials: {
      type: [
        {
          quote: { type: String, default: "" },
          name: { type: String, default: "" },
          role: { type: String, default: "" },
        },
      ],
      default: [
        {
          quote:
            "The team planned every phase of construction with total transparency. Timelines were realistic and every milestone was hit without a single surprise.",
          name: "Ayesha Raza",
          role: "Farm Owner, Multan",
        },
        {
          quote:
            "Their system design cut our monthly energy bill in half within the first quarter. The engineering behind it is genuinely impressive.",
          name: "Bilal Ahmed",
          role: "Operations Head, GreenAcre",
        },
        {
          quote:
            "The compliance audit caught issues we didn't even know existed. Working with people who actually care about doing it right made all the difference.",
          name: "Sana Tariq",
          role: "Site Manager",
        },
        {
          quote:
            "From the first site visit to final handover, communication never dropped. It's rare to find a contractor this organized.",
          name: "Usman Khalid",
          role: "Director, Khalid Estates",
        },
        {
          quote:
            "We've reduced our environmental footprint significantly while lowering costs — something we didn't think was possible together.",
          name: "Hira Malik",
          role: "Sustainability Lead",
        },
        {
          quote:
            "Every recommendation was backed by data, not guesswork. That gave us the confidence to move forward with the full rollout.",
          name: "Farhan Sheikh",
          role: "Founder, AgriTech Farms",
        },
      ],
    },

    faqs: {
      type: [
        {
          question: { type: String, default: "" },
          answer: { type: String, default: "" },
        },
      ],
      default: [
        {
          question: "What is the difference between lithium batteries and lead-acid batteries?",
          answer:
            "Lithium Batteries:\n- Longer lifespan (5–10 years)\n- Faster charging\n- Higher efficiency\n- Maintenance-free\n\nLead-Acid Batteries:\n- Lower upfront cost\n- Heavier\n- Requires regular maintenance",
        },
        {
          question: "Which inverter is suitable for my home?",
          answer:
            "Yes — replacing grid power with self-generated biogas energy typically lowers monthly electricity costs significantly.",
        },
        {
          question: "24/7 Energy from Organic Waste",
          answer:
            "A properly sized digester keeps producing gas around the clock, turning daily organic waste into a continuous energy supply.",
        },
        {
          question: "Can I use biogas for heating as well as electricity?",
          answer: "Yes, biogas can be routed to burners and boilers for heating in addition to running a generator for electricity.",
        },
      ],
    },

    sectionVisibility: {
      hero: { type: Boolean, default: true },
      logoSlider: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      explore: { type: Boolean, default: true },
      solution: { type: Boolean, default: true },
      faq: { type: Boolean, default: true },
      resource: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("HomeContent", homeContentSchema);
