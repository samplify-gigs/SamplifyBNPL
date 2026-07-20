import { pool } from "../../DB/db.js";

export async function CustomerLoanApplication(
  productlinkid: number,
  creditScore: number,
  months: number,
) {
  const result = await pool.query(
    `select price from customerPaymentLinks
    where productlinkid = $1`,
    [productlinkid],
  );

  if (result.rows.length === 0) {
    throw new Error("invalid link — no product found for this ID");
  }

  const price = result.rows[0].price;

  
  if (!price) {
    throw new Error("product price is missing from the database");
  }

  let interestRate = 0;

  switch (months) {
    case 2:
      interestRate = 0.02;
      break;

    case 4:
      interestRate = 0.04;
      break;

    case 6:
      interestRate = 0.06;
      break;

    default:
      throw new Error("invalid repayment duration");
  }

  let downPaymentRate = 0;

  if (creditScore >= 700) {
    downPaymentRate = 0.25;
  } else if (creditScore >= 500) {
    downPaymentRate = 0.35;
  } else if (creditScore >= 400) {
    downPaymentRate = 0.45;
  } else {
    throw new Error("customer not eligible");
  }

  const interest = price * interestRate;
  const totalPrice = price + interest;
  const downPayment = totalPrice * downPaymentRate;
  const remainingBalance = totalPrice - downPayment;
  const monthlyPayment = remainingBalance / months;

  return {
    price,
    interestRate,
    interest,
    totalPrice,
    downPaymentRate,
    downPayment,
    remainingBalance,
    months,
    monthlyPayment,
  };
}
