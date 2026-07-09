import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import * as walletController from "./wallet.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  walletController.createWallet
);

export default router;