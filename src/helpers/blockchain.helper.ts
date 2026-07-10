import { ethers } from "ethers";
import { env } from "../config/env";

export const provider = new ethers.JsonRpcProvider(
  env.ETHEREUM_RPC_URL
);

export const getWalletBalance = async (address: string) => {
  const balance = await provider.getBalance(address);

  return ethers.formatEther(balance);
};