import express from "express";
import passport from "passport";
import { generatePasswordHash } from "../lib/auth";
import { prisma } from "../prisma";

const router = express.Router();

router.get("/me", async (req, res) => {
  res.json(req.user);
});

router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.json();
});

router.post("/logout", async (req, res) => {
  req.logout();
  res.json();
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
