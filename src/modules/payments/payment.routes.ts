import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import * as paymentController from "./payment.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Payment Management APIs
 */

/**
 * @swagger
 * /api/v1/payments/create:
 *   post:
 *     summary: Create Payment
 *     description: Creates a new crypto payment transaction.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 250
 *               currency:
 *                 type: string
 *                 example: ETH
 *               receiverAddress:
 *                 type: string
 *                 example: "0x1234567890abcdef1234567890abcdef12345678"
 *     responses:
 *       201:
 *         description: Payment created successfully.
 *       400:
 *         description: Invalid request.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/create",
  authenticate,
  paymentController.createPayment
);

/**
 * @swagger
 * /api/v1/payments/history:
 *   get:
 *     summary: Get Payment History
 *     description: Returns all payments of the authenticated user.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history fetched successfully.
 */
router.get(
  "/history",
  authenticate,
  paymentController.getPaymentHistory
);

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   get:
 *     summary: Get Payment By ID
 *     description: Returns a specific payment by its ID.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details.
 *       404:
 *         description: Payment not found.
 */
router.get(
  "/:id",
  authenticate,
  paymentController.getPaymentById
);

/**
 * @swagger
 * /api/v1/payments/{id}/refund:
 *   patch:
 *     summary: Refund Payment
 *     description: Refunds an existing payment.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment refunded successfully.
 *       404:
 *         description: Payment not found.
 */
router.patch(
  "/:id/refund",
  authenticate,
  paymentController.refundPayment
);

/**
 * @swagger
 * /api/v1/payments/{id}/invoice:
 *   get:
 *     summary: Generate Invoice
 *     description: Generates invoice for a payment.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice generated successfully.
 */
router.get(
  "/:id/invoice",
  authenticate,
  paymentController.generateInvoice
);

/**
 * @swagger
 * /api/v1/payments/webhook:
 *   post:
 *     summary: Payment Webhook
 *     description: Receives payment status updates from external systems.
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Webhook processed successfully.
 */
router.post(
  "/webhook",
  paymentController.paymentWebhook
);

/**
 * @swagger
 * /api/v1/payments/{id}:
 *   delete:
 *     summary: Delete Payment
 *     description: Deletes a payment by ID.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully.
 *       404:
 *         description: Payment not found.
 */
router.delete(
  "/:id",
  authenticate,
  paymentController.deletePayment
);

export default router;