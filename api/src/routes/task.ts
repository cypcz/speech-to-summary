import express from "express";
import { prisma } from "../prisma";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(
    await prisma.task.findMany({
      select: { id: true, transcript: true, summaries: true },
      orderBy: { createdAt: "desc" },
    })
  );
});

export default router;
