import { type Request, type Response } from "express";
import { pool } from "../../DB/db.js";

export async function payments(req: Request, res: Response) {
  const { paymentlinkid } = req.body;

  try {
    const getPrice = await pool.query(
      ` select chosenprice from customerpaymentsession
      where paymentlinkid = $1
      `,
      [paymentlinkid],
    );

    if (getPrice.rows.length === 0) {
      return res.status(401).json({
        message: "invalid payment session",
      });
    }
    const resultprice = getPrice.rows;

    return res.status(200).json({
      message: "success",
      data: resultprice,
    });
  } catch (err) {
    console.error("this is payment error:", err);
    return res.status(500).json({
      message: "Server couldnt process payment",
    });
  }
}
