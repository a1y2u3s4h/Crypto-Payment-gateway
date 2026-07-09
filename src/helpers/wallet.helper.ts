import { Wallet } from "ethers";

export const generateEthereumWallet = () => {
  const wallet = Wallet.createRandom();

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase ?? "",
  };
};