"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const notFoundMiddleware = (req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
