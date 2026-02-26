import express from "express";
import { receiveText } from "../controllers/laara.controller.js";
const router = express.Router();

router.post("/text", receiveText);

export default router;
