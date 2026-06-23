import { Router } from "express";
import { MerchantSignup } from "../controllers/merchantsignup.controller.js";

const router = Router();

router.post("/register", MerchantSignup
);

export default router;
