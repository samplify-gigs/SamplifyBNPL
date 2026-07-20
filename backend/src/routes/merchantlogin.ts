import { Router } from "express";
import { merchantlogin } from "../controllers/merchantlogin.js";

const router = Router();

router.post("/merchantlogin", merchantlogin);

export default router;
