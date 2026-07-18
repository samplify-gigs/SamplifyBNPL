import { type Request, type Response } from "express";
import {
  bvnverifyidentity,
  lookupcredithistoryBvn,
  verifyMethod,
  verifyOtpfromBvn,
} from "../../../services/customersapplication/bvn.service.js";
import { CustomerLoanApplication } from "../../../services/customersapplication/loanapplication.service.js";

export async function customerBvnIdentiy(req: Request, res: Response) {
  try {
    const { bvn } = req.body;
    const result = await bvnverifyidentity(bvn);

    return res.json({
      message: "successful",
      data: result,
    });
  } catch (err) {
    console.error("this is the error for cust bvn identity", err);
    return res.status(500).json({
      message: "unable to check identity with bvn",
    });
  }
}

export async function bvnOtpMethods(req: Request, res: Response) {
  try {
    const { method } = req.body;
    const result = await verifyMethod(method);

    return res.status(200).json({
      message: "successful method validation",
      data: result,
    });
  } catch (err) {
    console.error("this bvn verify otp method error:", err);
    return res.status(500).json({
      message: "server could not validate a method",
    });
  }
}

export async function bvnOtpverify(req: Request, res: Response) {
  const { otp } = req.body;
  try {
    const result = await verifyOtpfromBvn(otp);

    return res.status(200).json({
      message: "successful otp verification",
      data: result,
    });
  } catch (err) {
    console.error("this is bvn otp verify error:", err);
    return res.status(500).json({
      message: "server failed to verify otp",
    });
  }
}

export async function bvnCreditHistoryLookup(req: Request, res: Response) {
  console.log("this is req body bvn for credit:", req.body);
  const { bvn } = req.body;
  try {
    const result = await lookupcredithistoryBvn(bvn);

    return res.status(200).json({
      message: "succesful lookup",
      data: result,
    });
  } catch (err) {
    console.error("lookup credit history with bvn error:", err);
    return res.status(500).json({
      message: "server failed to lookup credit history",
    });
  }
}

export async function customerLoanApplication(req: Request, res: Response) {
  try {
    const { productlinkid, creditScore, months } = req.body;
    const id = Number(productlinkid);
    const score = Number(creditScore);
    const month = Number(months);

    const result = await CustomerLoanApplication(id, score, month);
    return res.status(200).json({
      message: "succesful application",
      data: result,
    });
  } catch (err) {
    console.error("error for loan app:", err);
    return res.status(500).json({
      message: "server failed to process application",
    });
  }
}
