import { Request, Response, NextFunction } from "express";
import AppError from "../exceptions/AppError";

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};