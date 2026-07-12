import { Router } from "express";
import { paymentlinkGenerator } from "../controllers/paymentLink.js";

const router = Router();

router.post("/paymentlink", paymentlinkGenerator);

export default router;
