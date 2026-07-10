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
exports.getBalance = exports.getMyWallet = exports.createWallet = void 0;
const walletService = __importStar(require("./wallet.service"));
const createWallet = async (req, res, next) => {
    try {
        const wallet = await walletService.createWallet(req.user.id);
        res.status(201).json({
            success: true,
            message: "Wallet created successfully",
            data: wallet,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createWallet = createWallet;
const getMyWallet = async (req, res, next) => {
    try {
        const wallet = await walletService.getMyWallet(req.user.id);
        res.status(200).json({
            success: true,
            data: wallet,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyWallet = getMyWallet;
const getBalance = async (req, res, next) => {
    try {
        const balance = await walletService.getBalance(req.user.id);
        res.status(200).json({
            success: true,
            data: balance,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBalance = getBalance;
