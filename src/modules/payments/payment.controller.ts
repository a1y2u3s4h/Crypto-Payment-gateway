import { Response, NextFunction } from "express";

import { AuthRequest } from "../../middleware/auth.middleware";

import * as paymentService from "./payment.service";

export const createPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await paymentService.createPayment(
      req.user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};