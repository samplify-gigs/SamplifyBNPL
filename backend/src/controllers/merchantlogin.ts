import { type Request, type Response } from "express";
import { merchantLoginSchema } from "../zod/schema.js";
import { pool } from "../DB/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function merchantlogin(req: Request, res: Response) {
  try {
    const result = merchantLoginSchema.safeParse(req.body);

    if (!result.success) {
      {
        const fieldErrors = result.error.flatten().fieldErrors;
        return res.status(400).json({
          message: "validation failed , please try again",
          errors: fieldErrors,
        });
      }
    }

    const { email, password } = result.data;
    const existingUser = await pool.query(
      `select email_address,email_verified,
       password , is_manualverified, merchantid from Merchant where email_address = $1`,
      [email],
    );

    const user = existingUser.rows[0];

    if (existingUser.rows.length === 0) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if (!ispasswordMatch) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    if (user.email_verified === false) {
      return res.status(401).json({
        message: "user is not verified",
      });
    }

    if (user.is_manualverified === false) {
      return res.status(401).json({
        message: "account will be verified manually",
      });
    }

    const payload = { merchant_id: user.merchantid };
    const myJtSec = process.env.JWT_SECRET!;

    const token = jwt.sign(payload, myJtSec, {
      expiresIn: "3h",
    });

    console.log("checking if token is still signing", token);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    res.cookie("login_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 60 * 60 * 1000,
    });

    console.log(res.getHeaders());
    console.log(process.env.NODE_ENV);

    res.status(200).json({
      message: "login successful",
      token: token,
    });
  } catch (err) {
    console.error("could not log in, server error", err);

    return res.status(500).json({
      message: "failed to login server error",
    });
  }
}
