"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const wallet_routes_1 = __importDefault(require("./modules/wallets/wallet.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const payment_routes_1 = __importDefault(require("./modules/payments/payment.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const notFound_middleware_1 = require("./middleware/notFound.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1/payments", payment_routes_1.default);
app.get("/", (req, res) => {
    res.send("Crypto Payment Gateway API");
});
app.get("/api/v1/health", (req, res) => {
    res.json({
        success: true,
        message: "Server Running",
    });
});
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/wallets", wallet_routes_1.default);
app.use(notFound_middleware_1.notFoundMiddleware);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
