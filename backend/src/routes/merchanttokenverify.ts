import { Router } from "express";
import { MerchantTokenVerify } from "../controllers/merchanttokenverify.js";

const router = Router();

router.use("/dashboard", MerchantTokenVerify);
router.get("/dashboard", (req, res) => {
  res.json({
    message: "welcone to your dashboard",
  });
});

export default router;
