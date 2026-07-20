import { Router } from "express";
import {
  bvnCreditHistoryLookup,
  bvnOtpMethods,
  bvnOtpverify,
  customerBvnIdentiy,
  customerLoanApplication,
} from "../../../controllers/customerscontroller/bvnidentycontroller/customeridbvn.js";
import { linkToPayment } from "../../../controllers/customerscontroller/linktopayment.js";
import { payments } from "../../../controllers/customerscontroller/payment.js";

const router = Router();

router.post("/customerbvnidentity", customerBvnIdentiy);
router.post("/customerbvn/method", bvnOtpMethods);
router.post("/customerbvn/otp", bvnOtpverify);
router.post("/customerbvn/creditlookup", bvnCreditHistoryLookup);
router.post("/customerbvn/loanapplication", customerLoanApplication);
router.post("/customerbvn/linktopay", linkToPayment);
router.post("/customerbvn/payment", payments);

export default router;
