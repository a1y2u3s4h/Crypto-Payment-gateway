//import { Response, NextFunction } from "express";

import { AuthRequest } from "../../middleware/auth.middleware";

import * as paymentService from "./payment.service";

import { Request, Response, NextFunction } from "express";

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
export const getPaymentHistory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await paymentService.getPaymentHistory(req.user!.id);

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await paymentService.getPaymentById(
      req.params.id as string,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};


export const deletePayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await paymentService.deletePayment(
      req.params.id as string,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const refundPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await paymentService.refundPayment(
      req.params.id as string,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      message: "Payment refunded successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const generateInvoice = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await paymentService.generateInvoice(
      req.params.id as string,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

export const paymentWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await paymentService.paymentWebhook(req.body);

    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    next(error);
  }
};