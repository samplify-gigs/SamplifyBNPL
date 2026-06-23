import { Router } from "express";
import { MerchantEmailVerify } from "../controllers/merchantverify.js";

const router = Router();

router.post("/meremailverify", MerchantEmailVerify);

export default router;
