// server/seed/seedAdmin.js
//
// Creates (or updates the password of) the one admin account used to log
// into the CMS, from ADMIN_USERNAME / ADMIN_PASSWORD in server/.env.
//
// Run:  npm run seed:admin

import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";

async function run() {
  const username = (process.env.ADMIN_USERNAME || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "";

  if (!username || !password) {
    console.error("Set ADMIN_USERNAME and ADMIN_PASSWORD in server/.env first.");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Admin account ready. Login with username "${username}" and the password from .env.`);
  process.exit(0);
}

run().catch((err) => {
  console.error("Admin seed failed:", err);
  process.exit(1);
});
