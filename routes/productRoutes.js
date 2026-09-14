// server/routes/productRoutes.js
import { Router } from "express";
import Product from "../models/Product.js";
import Brand from "../models/Brand.js";
import { slugify } from "../utils/slugify.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// GET /api/products            -> all products
// GET /api/products?brand=slug -> only products under that brand
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.brand) filter.brandSlug = String(req.query.brand).toLowerCase();
    const products = await Product.find(filter).sort({ createdAt: 1 }).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id -> single product + up to 6 related (same brand)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id.toLowerCase() }).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    const related = await Product.find({
      brandSlug: product.brandSlug,
      id: { $ne: product.id },
    })
      .limit(6)
      .lean();

    res.json({ product, related });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products -> create a product UNDER a brand (brandSlug required)
router.post("/", requireAuth, async (req, res) => {
  try {
    const {
      brandSlug,
      model,
      subHeading,
      range,
      img,
      hoverImg,
      tagline,
      specs,
      bullets,
      thumbnails,
      datasheetUrl,
      whatsappNumber,
      sectionHeading,
      infoLarge,
      infoBoxes,
      id,
    } = req.body;

    if (!brandSlug) return res.status(400).json({ message: "brandSlug is required" });
    if (!model || !model.trim()) return res.status(400).json({ message: "model is required" });

    const brand = await Brand.findOne({ slug: String(brandSlug).toLowerCase() });
    if (!brand) return res.status(404).json({ message: "Selected brand does not exist" });

    let finalId = slugify(id || `${brand.brandName}-${model}-${range || ""}`);
    if (!finalId) finalId = slugify(brand.brandName, model, Date.now().toString());

    const clash = await Product.findOne({ id: finalId });
    if (clash) finalId = `${finalId}-${Date.now().toString().slice(-5)}`;

    const product = await Product.create({
      id: finalId,
      brandSlug: brand.slug,
      category: brand.brandName,
      model: model.trim(),
      subHeading: subHeading || "",
      range: range || "",
      img: img || "",
      hoverImg: hoverImg || "",
      tagline: tagline || "",
      specs: specs || {},
      bullets: Array.isArray(bullets) ? bullets.filter(Boolean) : [],
      thumbnails: Array.isArray(thumbnails) ? thumbnails.filter(Boolean) : [],
      datasheetUrl: datasheetUrl || "",
      whatsappNumber: whatsappNumber || "",
      sectionHeading: sectionHeading || "",
      infoLarge: infoLarge || null,
      infoBoxes: Array.isArray(infoBoxes) ? infoBoxes : [],
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id -> update a product (can also move it to a different brand)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const update = { ...req.body };
    delete update.id; // id is immutable once created

    if (update.brandSlug) {
      const brand = await Brand.findOne({ slug: String(update.brandSlug).toLowerCase() });
      if (!brand) return res.status(404).json({ message: "Selected brand does not exist" });
      update.brandSlug = brand.slug;
      update.category = brand.brandName;
    }

    const product = await Product.findOneAndUpdate(
      { id: req.params.id.toLowerCase() },
      update,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id.toLowerCase() });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
