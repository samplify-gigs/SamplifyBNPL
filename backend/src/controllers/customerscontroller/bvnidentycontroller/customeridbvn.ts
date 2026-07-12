import { type Request, type Response } from "express";
import {
  bvnverifyidentity,
  verifyMethod,
  verifyOtpfromBvn,
} from "../../../services/customersapplication/bvn.service.js";

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
  console.log("this bvn verify otp body:", req.body);

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
