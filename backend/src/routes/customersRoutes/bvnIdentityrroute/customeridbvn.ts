import { Router } from "express";
import {
  bvnCreditHistoryLookup,
  bvnOtpMethods,
  bvnOtpverify,
  customerBvnIdentiy,
  customerLoanApplication,
} from "../../../controllers/customerscontroller/bvnidentycontroller/customeridbvn.js";

const router = Router();

router.post("/customerbvnidentity", customerBvnIdentiy);
router.post("/customerbvn/method", bvnOtpMethods);
router.post("/customerbvn/otp", bvnOtpverify);
router.post("/customerbvn/creditlookup", bvnCreditHistoryLookup);
router.post("/customerbvn/loanapplication", customerLoanApplication);

export default router;
