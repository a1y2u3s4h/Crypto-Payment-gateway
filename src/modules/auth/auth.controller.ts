import { Request, Response } from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { successResponse } from "../../helpers/apiResponse";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getProfile } from "./auth.service";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation";

import {
  registerUser,
  loginUser,
} from "./auth.service";

export const register = asyncHandler(
  async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const result = await registerUser(data);

    return successResponse(
      res,
      "User registered successfully",
      result,
      201
    );
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response) => {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    return successResponse(
      res,
      "Login successful",
      result
    );
  }
);

export const profile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await getProfile(req.user!.id);

    return successResponse(
      res,
      "Profile fetched successfully",
      user
    );
  }
);

export const adminDashboard = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    return successResponse(
      res,
      "Welcome Admin",
      {
        totalUsers: 100,
        totalPayments: 500,
      }
    );
  }
);