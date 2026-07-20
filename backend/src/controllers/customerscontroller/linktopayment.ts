import { type Response, type Request } from "express";
import { pool } from "../../DB/db.js";
import { CustomerLoanApplication } from "../../services/customersapplication/loanapplication.service.js";

export async function linkToPayment(req: Request, res: Response) {
  const { paymentlinkid, creditScore, months } = req.body;
  const id = Number(paymentlinkid);
  const score = Number(creditScore);
  const month = Number(months);

  try {
    const activeSessionCustomer = await pool.query(
      `
    select id, price from customerPaymentLinks where productlinkid = $1
    `,
      [id],
    );

    if (activeSessionCustomer.rows.length === 0) {
      return res.status(401).json({
        message: "invalid session",
      });
    }

    const result = await CustomerLoanApplication(id, score, month);
    const chosenPrice = result.downPayment;

    const insertCustomerSession = await pool.query(
      `
    insert into customerpaymentsession(paymentlinkid,chosenprice)
    values($1,$2)
    `,
      [paymentlinkid, chosenPrice],
    );

    return res.status(200).json({
      message: "success",
      data: result.downPayment,
    });
  } catch (err) {
    console.error("link to payment error:", err);
    return res.status(500).json({
      message: "server failed to process this link to pay session",
    });
  }
}
