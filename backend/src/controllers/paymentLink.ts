import { type Request, type Response } from "express";
import { paymentLink } from "../zod/schema.js";
import { pool } from "../DB/db.js";

export async function paymentlinkGenerator(req: Request, res: Response) {
  const merchantId = req.merchant?.merchant_id;

  const result = paymentLink.safeParse(req.body);

  if (!result.success) {
    {
      const fieldErrors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "validation failed , please try again",
        errors: fieldErrors,
      });
    }
  }

  const { productName, price } = result.data;
  const slug = productName.toLowerCase().replace(/\s+/g, "_").slice(0, 24);
  const paymentLinkId = Math.floor(Math.random() * 9000) + 1000;
  const newURL = process.env.BASE_URL;
  const baseURL = `${newURL}/samplifypay/${slug}_${paymentLinkId}`;
  

  try {
    await pool.query(
      `insert into customerpaymentlinks(
    productname,
    producturl,
    price,
    merchantid,
    productlinkid
   ) values($1,$2,$3,$4,$5)`,
      [productName, baseURL, price, merchantId, paymentLinkId],
    );

    res.status(200).json({
      data: baseURL,
      message: "succesful link creation",
      paymentLinkID: paymentLinkId,
    });
  } catch (err) {
    console.error("customer payment link error:", err);
    return res.status(500).json({
      message: "couldnt procees links to db",
    });
  }
}
