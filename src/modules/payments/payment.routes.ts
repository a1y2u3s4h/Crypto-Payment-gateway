import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import * as paymentController from "./payment.controller";
console.log(paymentController);
const router = Router();

router.post(
  "/create",
  authenticate,
  paymentController.createPayment
);

export default router;