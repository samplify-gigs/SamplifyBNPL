import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../DB/db.js";

export async function MerchantTokenVerify(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.login_jwt;
  const myJtSec = process.env.JWT_SECRET!;
  console.log("is it reciveing token:", token);
  console.log("sec key:", myJtSec);

  if (!token) {
    return res.status(401).json({
      message: "empty token",
    });
  }

  try {
    const decoded = jwt.verify(token, myJtSec) as {
      merchant_id: string;
    };

    const activeMerchant = await pool.query(
      `
      select merchantid AS merchant_id, email_address from merchant where merchantid = $1
      `,
      [decoded.merchant_id],
    );

    if (activeMerchant.rowCount === 0) {
      return res.status(401).json({
        message: "merchant not found",
      });
    }

    req.merchant = activeMerchant.rows[0];

    next();
  } catch (err) {
    console.error("token verify error", err);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
