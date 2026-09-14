// server/routes/quoteRequestRoutes.js
import { Router } from "express";
import QuoteRequest from "../models/QuoteRequest.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// POST /api/quote-requests -> anyone on the website can submit this (the "Get a Quote" form)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name is required" });
    if (!email || !email.trim()) return res.status(400).json({ message: "Email is required" });

    const quoteRequest = await QuoteRequest.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone || "",
      message: message || "",
    });

    res.status(201).json(quoteRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/quote-requests -> admin only, newest first
router.get("/", requireAuth, async (req, res) => {
  try {
    const requests = await QuoteRequest.find().sort({ createdAt: -1 }).lean();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/quote-requests/:id -> mark read/unread (admin only)
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const { isRead } = req.body;
    const updated = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { isRead: !!isRead },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Request not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/quote-requests/:id -> admin only
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
