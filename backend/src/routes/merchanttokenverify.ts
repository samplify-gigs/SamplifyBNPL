import { Router } from "express";
import { MerchantTokenVerify } from "../controllers/merchanttokenverify.js";
import { paymentlinkGenerator } from "../controllers/paymentLink.js";

const router = Router();

router.use("/dashboard", MerchantTokenVerify);
router.get("/dashboard", (req, res) => {
  res.json({
    message: "welcone to your dashboard",
  });
});
router.post("/dashboard/paymentlink", paymentlinkGenerator);

export default router;
