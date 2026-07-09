"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashboard = exports.profile = exports.login = exports.register = void 0;
const asyncHandler_1 = require("../../helpers/asyncHandler");
const apiResponse_1 = require("../../helpers/apiResponse");
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const auth_service_2 = require("./auth.service");
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = auth_validation_1.registerSchema.parse(req.body);
    const result = await (0, auth_service_2.registerUser)(data);
    return (0, apiResponse_1.successResponse)(res, "User registered successfully", result, 201);
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = auth_validation_1.loginSchema.parse(req.body);
    const result = await (0, auth_service_2.loginUser)(data);
    return (0, apiResponse_1.successResponse)(res, "Login successful", result);
});
exports.profile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await (0, auth_service_1.getProfile)(req.user.id);
    return (0, apiResponse_1.successResponse)(res, "Profile fetched successfully", user);
});
exports.adminDashboard = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    return (0, apiResponse_1.successResponse)(res, "Welcome Admin", {
        totalUsers: 100,
        totalPayments: 500,
    });
});
