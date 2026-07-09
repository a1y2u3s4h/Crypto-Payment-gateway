"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const env_1 = require("../config/env");
const encrypt = (text) => {
    return crypto_js_1.default.AES.encrypt(text, env_1.env.WALLET_SECRET_KEY).toString();
};
exports.encrypt = encrypt;
const decrypt = (cipherText) => {
    const bytes = crypto_js_1.default.AES.decrypt(cipherText, env_1.env.WALLET_SECRET_KEY);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.decrypt = decrypt;
