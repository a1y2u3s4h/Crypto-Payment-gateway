"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
console.log("process.env.WALLET_SECRET_KEY =", process.env.WALLET_SECRET_KEY);
app_1.default.listen(Number(env_1.env.PORT), () => {
    console.log(`
=========================================
🚀 Server Started Successfully
🌐 http://localhost:${env_1.env.PORT}
=========================================
`);
});
