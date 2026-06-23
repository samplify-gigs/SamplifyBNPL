// app.ts
import express from "express";
import cors from "cors";
import merchantRoutes from "./routes/merchantsignuproute.js";
import MerchantVerify from "./routes/merchantverify.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/merchant", merchantRoutes);
app.use("/api/merchantverify", MerchantVerify);

export default app;
