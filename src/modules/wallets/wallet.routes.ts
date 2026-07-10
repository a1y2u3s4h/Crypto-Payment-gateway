import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import * as walletController from "./wallet.controller";


// console.log(walletController);



const router = Router();

/**
 * Create Wallet
 * POST /api/v1/wallets
 */



router.post(
  "/",
  authenticate,
  walletController.createWallet
);

/**
 * Get My Wallet
 * GET /api/v1/wallets/me
 */
router.get(
  "/me",
  authenticate,
  walletController.getMyWallet
);

console.log("Balance handler:", walletController.getBalance);

router.get(
  "/balance",
  authenticate,
  walletController.getBalance
);



router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Wallet Router Working"
  });
});

export default router;