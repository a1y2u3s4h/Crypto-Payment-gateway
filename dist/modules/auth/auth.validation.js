"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50),
    email: zod_1.z
        .string()
        .email("Invalid email"),
    password: zod_1.z
        .string()
        .min(8)
        .regex(/[A-Z]/, "Must contain uppercase")
        .regex(/[a-z]/, "Must contain lowercase")
        .regex(/[0-9]/, "Must contain number")
        .regex(/[@$!%*?&]/, "Must contain special character"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(8),
});
