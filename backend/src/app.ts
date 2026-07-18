// app.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import merchantRoutes from "./routes/merchantsignuproute.js";
import MerchantVerify from "./routes/merchantverify.js";
import Merchantlogin from "./routes/merchantlogin.js";
import cookieparser from "cookie-parser";
import merchanttokenver from "./routes/merchanttokenverify.js";
import customerbvnidverify from "./routes/customersRoutes/bvnIdentityrroute/customeridbvn.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/merchant", merchantRoutes);
app.use("/api/merchantverify", MerchantVerify);
app.use("/api/merchantlogin", Merchantlogin);
app.use("/api/merchantdash", merchanttokenver);
app.use("/api/customerbidbvn", customerbvnidverify);

export default app;
