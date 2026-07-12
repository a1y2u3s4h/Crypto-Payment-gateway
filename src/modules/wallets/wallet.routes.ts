import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import * as walletController from "./wallet.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Wallet
 *     description: Wallet Management APIs
 */

/**
 * @swagger
 * /api/v1/wallets:
 *   post:
 *     summary: Create Wallet
 *     description: Creates a new Ethereum wallet for the authenticated user.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Wallet created successfully.
 *       401:
 *         description: Unauthorized.
 *       409:
 *         description: Wallet already exists.
 */
router.post(
  "/",
  authenticate,
  walletController.createWallet
);

/**
 * @swagger
 * /api/v1/wallets/me:
 *   get:
 *     summary: Get My Wallet
 *     description: Returns wallet details of the logged-in user.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Wallet not found.
 */
router.get(
  "/me",
  authenticate,
  walletController.getMyWallet
);

/**
 * @swagger
 * /api/v1/wallets/balance:
 *   get:
 *     summary: Get Wallet Balance
 *     description: Returns the current ETH balance of the authenticated user's wallet.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get(
  "/balance",
  authenticate,
  walletController.getBalance
);

/**
 * @swagger
 * /api/v1/wallets/test:
 *   get:
 *     summary: Wallet Test Endpoint
 *     tags:
 *       - Wallet
 *     responses:
 *       200:
 *         description: Wallet router is working.
 */
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Wallet Router Working"
  });
});

export default router;