import { Router } from "express";
import {
  bvnOtpMethods,
  bvnOtpverify,
  customerBvnIdentiy,
} from "../../../controllers/customerscontroller/bvnidentycontroller/customeridbvn.js";

const router = Router();

router.post("/customerbvnidentity", customerBvnIdentiy);
router.post("/customerbvn/method", bvnOtpMethods);
router.post("/customerbvn/otp", bvnOtpverify);

export default router;
