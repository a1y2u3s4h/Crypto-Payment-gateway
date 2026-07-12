import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import * as paymentController from "./payment.controller";

const router = Router();

router.post(
  "/create",
  authenticate,
  paymentController.createPayment
);

router.get(
  "/history",
  authenticate,
  paymentController.getPaymentHistory
);

router.get(
  "/:id/invoice",
  authenticate,
  paymentController.generateInvoice
);

router.post(
  "/webhook",
  paymentController.paymentWebhook
);

router.get(
  "/:id",
  authenticate,
  paymentController.getPaymentById
);

router.patch(
  "/:id/refund",
  authenticate,
  paymentController.refundPayment
);

router.delete(
  "/:id",
  authenticate,
  paymentController.deletePayment
);

export default router;