import express from "express";
import { prisma } from "../prisma";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(
    await prisma.task.findMany({
      where: {
        userId: req.user?.id || "",
      },
      orderBy: { createdAt: "desc" },
    })
  );
});

export { router };
