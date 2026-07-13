"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Crypto Payment Gateway API",
            version: "1.0.0",
            description: "Backend API for Crypto Payment Gateway",
        },
        servers: [
            {
                url: process.env.NODE_ENV === "production"
                    ? "https://crypto-payment-gateway-1.onrender.com"
                    : "http://localhost:5000",
                description: process.env.NODE_ENV === "production"
                    ? "Production Server"
                    : "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: process.env.NODE_ENV === "production"
        ? ["dist/modules/**/*.js"]
        : ["src/modules/**/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
console.log("Swagger Paths:", Object.keys(swaggerSpec.paths || {}));
exports.default = swaggerSpec;
