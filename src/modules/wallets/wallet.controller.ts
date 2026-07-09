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