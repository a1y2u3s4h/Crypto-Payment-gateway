import prisma from "../../database/prisma";
import AppError from "../../exceptions/AppError";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateAccessToken } from "../../utils/jwt";
import { RegisterInput, LoginInput } from "./auth.validation";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  console.log("Database User:", user);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await comparePassword(
    data.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};