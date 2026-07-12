"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const walletController = __importStar(require("./wallet.controller"));
const router = (0, express_1.Router)();
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
router.post("/", auth_middleware_1.authenticate, walletController.createWallet);
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
router.get("/me", auth_middleware_1.authenticate, walletController.getMyWallet);
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
router.get("/balance", auth_middleware_1.authenticate, walletController.getBalance);
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
exports.default = router;
