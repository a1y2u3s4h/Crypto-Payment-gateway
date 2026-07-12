import { ethers } from "ethers";
import { env } from "../config/env";

export const provider = new ethers.JsonRpcProvider(
  env.ETHEREUM_RPC_URL
);

export const getWalletBalance = async (address: string) => {
  const balance = await provider.getBalance(address);

  return ethers.formatEther(balance);
};

export const sendEthereumTransaction = async (
  privateKey: string,
  receiverAddress: string,
  amount: number
) => {
  // Create wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Send transaction
  const tx = await wallet.sendTransaction({
    to: receiverAddress,
    value: ethers.parseEther(amount.toString()),
  });

  // Wait until transaction is mined
  const receipt = await tx.wait();

  return {
    transactionHash: tx.hash,
    blockNumber: receipt?.blockNumber,
    status: receipt?.status,
  };
};