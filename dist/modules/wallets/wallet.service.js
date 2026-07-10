"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = exports.getMyWallet = exports.createWallet = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const AppError_1 = __importDefault(require("../../exceptions/AppError"));
const wallet_helper_1 = require("../../helpers/wallet.helper");
const encryption_1 = require("../../utils/encryption");
const blockchain_helper_1 = require("../../helpers/blockchain.helper");
const env_1 = require("../../config/env");
const createWallet = async (userId) => {
    // Check if wallet already exists
    const existingWallet = await prisma_1.default.wallet.findUnique({
        where: {
            userId,
        },
    });
    if (existingWallet) {
        throw new AppError_1.default("Wallet already exists", 409);
    }
    // Generate Ethereum wallet
    const wallet = (0, wallet_helper_1.generateEthereumWallet)();
    console.log("Generated Wallet:", wallet);
    console.log("Private Key:", wallet.privateKey);
    console.log("Secret Key:", env_1.env.WALLET_SECRET_KEY);
    // Encrypt private key
    const encryptedPrivateKey = (0, encryption_1.encrypt)(wallet.privateKey);
    // Save wallet
    const savedWallet = await prisma_1.default.wallet.create({
        data: {
            address: wallet.address,
            privateKey: encryptedPrivateKey,
            network: "ETHEREUM",
            userId,
        },
        select: {
            address: true,
            network: true,
        },
    });
    return savedWallet;
};
exports.createWallet = createWallet;
const getMyWallet = async (userId) => {
    const wallet = await prisma_1.default.wallet.findUnique({
        where: {
            userId,
        },
        select: {
            address: true,
            network: true,
            createdAt: true,
        },
    });
    if (!wallet) {
        throw new AppError_1.default("Wallet not found", 404);
    }
    return wallet;
};
exports.getMyWallet = getMyWallet;
const getBalance = async (userId) => {
    const wallet = await prisma_1.default.wallet.findUnique({
        where: {
            userId,
        },
        select: {
            address: true,
        },
    });
    if (!wallet) {
        throw new AppError_1.default("Wallet not found", 404);
    }
    const balance = await (0, blockchain_helper_1.getWalletBalance)(wallet.address);
    return {
        address: wallet.address,
        balance,
        symbol: "ETH",
    };
};
exports.getBalance = getBalance;
