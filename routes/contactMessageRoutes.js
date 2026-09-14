// server/routes/contactMessageRoutes.js
import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

// POST /api/contact-messages -> anyone can submit this (the Contact page form)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name is required" });
    if (!email || !email.trim()) return res.status(400).json({ message: "Email is required" });

    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone || "",
      subject: subject || "",
      message: message || "",
    });

    res.status(201).json(contactMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contact-messages -> admin only, newest first
router.get("/", requireAuth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/contact-messages/:id -> mark read/unread (admin only)
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const { isRead } = req.body;
    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: !!isRead },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Message not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/contact-messages/:id -> admin only
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
