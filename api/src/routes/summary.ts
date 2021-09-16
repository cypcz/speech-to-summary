import express from "express";
import {
  initiateSummaryFromUpload,
  initiateSummaryFromYoutube,
} from "../lib/speech";

const router = express.Router();

router.post("/upload", initiateSummaryFromUpload);
router.post("/youtube", initiateSummaryFromYoutube);

export default router;
