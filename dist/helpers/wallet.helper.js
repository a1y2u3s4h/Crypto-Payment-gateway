"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEthereumWallet = void 0;
const ethers_1 = require("ethers");
const generateEthereumWallet = () => {
    const wallet = ethers_1.Wallet.createRandom();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase ?? "",
    };
};
exports.generateEthereumWallet = generateEthereumWallet;
