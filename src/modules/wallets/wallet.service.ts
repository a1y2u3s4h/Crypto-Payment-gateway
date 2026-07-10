import prisma from "../../database/prisma";
import AppError from "../../exceptions/AppError";

import { generateEthereumWallet } from "../../helpers/wallet.helper";
import { encrypt } from "../../utils/encryption";
import { getWalletBalance } from "../../helpers/blockchain.helper";
import { env } from "../../config/env";
export const createWallet = async (userId: string) => {
  // Check if wallet already exists
  const existingWallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  if (existingWallet) {
    throw new AppError("Wallet already exists", 409);
  }

  // Generate Ethereum wallet
  const wallet = generateEthereumWallet();


  console.log("Generated Wallet:", wallet);
console.log("Private Key:", wallet.privateKey);
console.log("Secret Key:", env.WALLET_SECRET_KEY);

  // Encrypt private key
  const encryptedPrivateKey = encrypt(wallet.privateKey);

  // Save wallet
  const savedWallet = await prisma.wallet.create({
    data: {
      address: wallet.address,
      privateKey: encryptedPrivateKey,
      network: "ETHEREUM",
      userId,
    },
    select: {
      address: true,
      network: true,
    },
  });

  return savedWallet;
};

export const getMyWallet = async (userId: string) => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
    select: {
      address: true,
      network: true,
      createdAt: true,
    },
  });

  if (!wallet) {
    throw new AppError("Wallet not found", 404);
  }

  return wallet;
};

export const getBalance = async (userId: string) => {
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
    select: {
      address: true,
    },
  });

  if (!wallet) {
    throw new AppError("Wallet not found", 404);
  }

  const balance = await getWalletBalance(wallet.address);

  return {
    address: wallet.address,
    balance,
    symbol: "ETH",
  };
};