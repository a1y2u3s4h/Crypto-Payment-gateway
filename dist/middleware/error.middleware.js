"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const AppError_1 = __importDefault(require("../exceptions/AppError"));
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err instanceof AppError_1.default ? err.statusCode : 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
