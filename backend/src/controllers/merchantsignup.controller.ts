import { type Request, type Response } from "express";
import { signupSchema } from "../zod/schema.js";
import { pool } from "../DB/db.js";
import crypto from "node:crypto";
import { Resend } from "resend";
import bcrypt from "bcrypt";

const resend = new Resend("re_RQDx2jLh_xsUcHvJe1tic9naLfcu3B5fe");

export async function MerchantSignup(req: Request, res: Response) {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "validation failed , please try again",
        errors: fieldErrors,
      });
    }

    const {
      businessName,
      email,
      password,
      productCategory,
      location,
      fullAddress,
      primaryNumber,
      secondaryPhone,
    } = result.data;

    console.log("this is the result data", result.data);
    const existingEmail = await pool.query(
      `SELECT id FROM Merchant WHERE email_address = $1`,
      [email],
    );

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({
        message: "Action required",
        errors: {
          email: ["this email is already is use"],
        },
      });
    }

    

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`hashed pass: ${hashedPassword}`);
    const token = crypto.randomBytes(32).toString("hex");
    const expiredTime = new Date(Date.now() + 5 * 60 * 1000);

    await pool.query(
      `INSERT INTO Merchant (

        business_name, 
        email_address, 
        product_category, 
        state_location, 
        full_address, 
        phone_number, 
        secondary_number,
        expires_at,
        token,
        password
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)`,
      [
        businessName,
        email,
        productCategory,
        location,
        fullAddress,
        primaryNumber,
        secondaryPhone,
        expiredTime,
        token,
        hashedPassword,
      ],
    );

    const baseUrl = process.env.BASE_URL || "http://localhost:3000/";
    const verifyUrl = `${baseUrl}/verify?token=${token}`;

    const { data, error } = await resend.emails.send({
      from: "Samplify <onboarding@resend.dev>",
      to: ["samplifygigs@gmail.com"],
      subject: "Verify your email",
      html: `<strong><a href="${verifyUrl}">click here</a>to verify your email. This link expires in 5 minutes</strong>`,
    });

    if (error) {
      console.log(`resend error: ${error.message}`);
    }

    console.log(`resend data: ${data?.id}`);
    return res.status(201).json({
      message: `merchant created successfully`,
    });
  } catch (err) {
    console.error("could not process", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
