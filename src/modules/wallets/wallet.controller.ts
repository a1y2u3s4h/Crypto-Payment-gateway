import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as walletService from "./wallet.service";

export const createWallet = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const wallet = await walletService.createWallet(req.user!.id);

    res.status(201).json({
      success: true,
      message: "Wallet created successfully",
      data: wallet,
    });
  } catch (error) {
    next(error);
  }
};
export const getMyWallet = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const wallet = await walletService.getMyWallet(req.user!.id);

    res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    next(error);
  }
};

export const getBalance = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const balance = await walletService.getBalance(req.user!.id);

    res.status(200).json({
      success: true,
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};