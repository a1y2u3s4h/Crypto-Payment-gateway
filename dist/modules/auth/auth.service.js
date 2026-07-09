"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const AppError_1 = __importDefault(require("../../exceptions/AppError"));
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const registerUser = async (data) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        throw new AppError_1.default("User already exists", 409);
    }
    const hashedPassword = await (0, hash_1.hashPassword)(data.password);
    const user = await prisma_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
    const token = (0, jwt_1.generateAccessToken)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    return {
        user,
        token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (data) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    console.log("Database User:", user);
    if (!user) {
        throw new AppError_1.default("Invalid email or password", 401);
    }
    const isPasswordCorrect = await (0, hash_1.comparePassword)(data.password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError_1.default("Invalid email or password", 401);
    }
    const token = (0, jwt_1.generateAccessToken)({
        id: user.id,
        email: user.email,
        role: user.role,
    });
    return {
        user,
        token,
    };
};
exports.loginUser = loginUser;
const getProfile = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            isVerified: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    return user;
};
exports.getProfile = getProfile;
