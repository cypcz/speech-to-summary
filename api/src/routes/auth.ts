import express from "express";
import passport from "passport";
import { generatePasswordHash } from "../lib/auth";
import { prisma } from "../prisma";
import { FE_ORIGIN } from "../utils/env";

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

  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash, name: "Ocas" },
    update: { passwordHash },
  });

  res.json();
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: FE_ORIGIN }),
  (req, res) => {
    res.redirect(`${FE_ORIGIN}/app`);
  }
);

export { router };
