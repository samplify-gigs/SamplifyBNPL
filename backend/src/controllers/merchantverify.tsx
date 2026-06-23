import { type Response, type Request } from "express";
import { pool } from "../DB/db.js";

export async function MerchantEmailVerify(req: Request, res: Response) {
  try {
    console.log("request body for verifying email", req.body);
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const result = await pool.query(
      `select id, expires_at from Merchant where token = $1`,
      [token],
    );

    const merchant = result.rows[0];
    console.log("result token from db", merchant);
    if (!merchant) {
      console.log("Invalid token provided", token);
      return res.status(404).json({
        message: "Invalid token or link has already been used",
      });
    }

    if (new Date() > merchant.expires_at) {
      return res.json({
        message: "link is expired",
      });
    }

    if (new Date() > merchant.expires_at) {
      return res.status(400).json({
        message: "Link has expired",
      });
    }

    await pool.query(
      `
     update Merchant 
      set email_verified = true,
          token = null,
          expires_at = null
      where id = $1
      `,
      [merchant.id],
    );

    res.status(200).json({
      message: "successfully verified",
    });
  } catch (err) {
    console.error(`email verify error: ${err}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
