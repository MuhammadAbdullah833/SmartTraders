// server/seed/seedArticles.js
//
// One-time import of the sample articles that used to be hardcoded in
// src/Pages/News.jsx, so the News page isn't empty on first run.
//
// Run:  npm run seed:articles

import "dotenv/config";
import { connectDB } from "../config/db.js";
import Article from "../models/Article.js";

const articles = [
  {
    tag: "Company News",
    date: "August 2026",
    title: "We're Now an Official Sungrow Distribution Partner",
    description:
      "Expanding our lineup with Sungrow's full range of hybrid inverters and battery storage systems, now available with local warranty support.",
    image: "https://picsum.photos/id/1076/500/380",
  },
  {
    tag: "Product Launch",
    date: "July 2026",
    title: "Huawei LUNA2000 Storage Systems Now In Stock",
    description:
      "The latest smart string energy storage system from Huawei is available for residential and commercial installations.",
    image: "https://picsum.photos/id/1078/500/380",
  },
  {
    tag: "Industry Update",
    date: "June 2026",
    title: "Battery Storage Prices Continue to Drop",
    description:
      "Falling battery costs are making hybrid solar systems more affordable than ever for homes and businesses alike.",
    image: "https://picsum.photos/id/1080/500/380",
  },
  {
    tag: "Case Study",
    date: "May 2026",
    title: "C&I Rooftop Project: 500kW Installation Completed",
    description:
      "A look at our latest commercial and industrial rooftop solar installation, powered by Sungrow inverters.",
    image: "https://picsum.photos/id/250/500/380",
  },
  {
    tag: "Company News",
    date: "April 2026",
    title: "New Pylontech Battery Range Now Available",
    description:
      "High-performance lithium battery storage from Pylontech has joined our product catalog for residential energy storage.",
    image: "https://picsum.photos/id/1084/500/380",
  },
  {
    tag: "Tips & Guides",
    date: "March 2026",
    title: "How to Choose the Right Inverter for Your Home",
    description:
      "A practical guide to comparing string inverters, hybrid inverters, and storage-ready systems before you buy.",
    image: "https://picsum.photos/id/1069/500/380",
  },
];

async function run() {
  await connectDB();

  let created = 0;
  let skipped = 0;
  for (const a of articles) {
    const exists = await Article.findOne({ title: a.title });
    if (exists) {
      skipped += 1;
      continue;
    }
    await Article.create({ ...a, link: "#" });
    created += 1;
  }

  console.log(`Done. Articles created: ${created}, already present: ${skipped}.`);
  process.exit(0);
}

run().catch((err) => {
  console.error("Article seed failed:", err);
  process.exit(1);
});
