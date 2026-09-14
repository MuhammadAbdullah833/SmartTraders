// server/routes/brandRoutes.js
import { Router } from "express";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import { slugify } from "../utils/slugify.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/brands  -> all brands, each with its live product count
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: 1 }).lean();
    const counts = await Product.aggregate([
      { $group: { _id: "$brandSlug", count: { $sum: 1 } } },
    ]);
    const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));
    const withCounts = brands.map((b) => ({
      ...b,
      productCount: countMap[b.slug] || 0,
    }));
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/brands/:slug -> single brand
router.get("/:slug", async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug.toLowerCase() }).lean();
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/brands -> create a new brand
router.post("/", requireAuth, async (req, res) => {
  try {
    const { brandName, bannerImage, eyebrow, heading, logo, slug } = req.body;
    if (!brandName || !brandName.trim()) {
      return res.status(400).json({ message: "brandName is required" });
    }

    const finalSlug = slugify(slug || brandName);
    if (!finalSlug) {
      return res.status(400).json({ message: "Could not generate a slug from brandName" });
    }

    const exists = await Brand.findOne({ slug: finalSlug });
    if (exists) {
      return res.status(409).json({ message: `Brand "${finalSlug}" already exists` });
    }

    const brand = await Brand.create({
      slug: finalSlug,
      brandName: brandName.trim(),
      bannerImage: bannerImage || "",
      eyebrow: eyebrow || "OUR PRODUCTS",
      heading: Array.isArray(heading) ? heading.filter(Boolean) : [],
      logo: logo || "",
    });

    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/brands/:slug -> update a brand
router.put("/:slug", requireAuth, async (req, res) => {
  try {
    const { brandName, bannerImage, eyebrow, heading, logo } = req.body;
    const brand = await Brand.findOneAndUpdate(
      { slug: req.params.slug.toLowerCase() },
      {
        ...(brandName !== undefined && { brandName }),
        ...(bannerImage !== undefined && { bannerImage }),
        ...(eyebrow !== undefined && { eyebrow }),
        ...(heading !== undefined && { heading }),
        ...(logo !== undefined && { logo }),
      },
      { new: true, runValidators: true }
    );
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/brands/:slug -> delete brand + every product under it
router.delete("/:slug", requireAuth, async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const brand = await Brand.findOneAndDelete({ slug });
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    const { deletedCount } = await Product.deleteMany({ brandSlug: slug });
    res.json({ message: "Brand deleted", deletedProducts: deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
