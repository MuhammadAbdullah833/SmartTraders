// server/seed/seed.js
//
// One-time import of the catalog that used to live in
// src/components/brandsData.js + src/data/products.js, so the database
// starts out with the same brands/products the site already showed.
//
// Run:  npm run seed   (from inside /server)
// Safe to re-run: it upserts brands and skips products whose id already exists.

import "dotenv/config";
import { connectDB } from "../config/db.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import { slugify } from "../utils/slugify.js";

import brandsData from "../../src/components/brandsData.js";
import { categories } from "../../src/data/products.js";

async function run() {
  await connectDB();

  console.log("Seeding brands...");
  for (const [slug, brand] of Object.entries(brandsData)) {
    const category = categories.find((c) => slugify(c.title) === slug);
    await Brand.findOneAndUpdate(
      { slug },
      {
        slug,
        brandName: brand.brandName,
        bannerImage: brand.bannerImage || "",
        eyebrow: brand.eyebrow || "OUR PRODUCTS",
        heading: brand.heading || [],
        logo: category?.logo || "",
      },
      { upsert: true, new: true }
    );
  }

  console.log("Seeding products...");
  let created = 0;
  let skipped = 0;
  for (const cat of categories) {
    const brandSlug = slugify(cat.title);
    for (const item of cat.items) {
      const exists = await Product.findOne({ id: item.id });
      if (exists) {
        skipped += 1;
        continue;
      }
      await Product.create({
        id: item.id,
        brandSlug,
        category: cat.title,
        model: item.model,
        subHeading: item.subHeading || "",
        range: item.range || "",
        img: item.img || "",
        hoverImg: item.hoverImg || "",
        tagline: item.tagline || "",
        specs: item.specs || {},
      });
      created += 1;
    }
  }

  console.log(`Done. Brands: ${Object.keys(brandsData).length}. Products created: ${created}, already present: ${skipped}.`);
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
