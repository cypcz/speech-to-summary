import express from "express";
import passport from "passport";
import { generatePasswordHash } from "../lib/auth";
import { prisma } from "../prisma";

const router = express.Router();

router.post("/login", passport.authenticate("local"), async (req, res) => {
  console.log(req.user);

  res.json({ status: "ok" });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw new Error("User already exists!");

  const passwordHash = await generatePasswordHash(password);

  await prisma.user.create({ data: { email, passwordHash, name: "Ocas" } });

  res.json();
});

export default router;
