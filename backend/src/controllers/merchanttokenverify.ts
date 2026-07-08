import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function MerchantTokenVerify(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.login_jwt;
  const payload = req.body;
  console.log("token back:", token);
  if (!token) {
    return res.status(401).json({
      message: "empty token",
    });
  }

  try {
    const decoded = jwt.verify(token, "secret-key-for-now");
    req.body = decoded;
    next();
  } catch (err) {
    console.error("token verify error", err);
    res.status(401).json({
      message: "server could not process any token",
    });
  }
}
