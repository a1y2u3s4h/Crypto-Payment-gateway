import prisma from "../../database/prisma";
import { PaymentStatus } from "@prisma/client";

import { CreatePaymentInput } from "./payment.validation";

import AppError from "../../exceptions/AppError";

import { decrypt } from "../../utils/encryption";

import { sendEthereumTransaction } from "../../helpers/blockchain.helper";

export const createPayment = async (
  userId: string,
  data: CreatePaymentInput
) => {
  // Find user's wallet
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId,
    },
  });

  if (!wallet) {
    throw new AppError("Wallet not found", 404);
  }

  // Decrypt private key
  const privateKey = decrypt(wallet.privateKey);

  // Create payment with PENDING status
  const payment = await prisma.payment.create({
    data: {
      amount: data.amount,
      currency: data.currency,
      receiverAddress: data.receiverAddress,
      status: PaymentStatus.PENDING,
      userId,
    },
  });

  try {
    // Send ETH transaction
    const transaction = await sendEthereumTransaction(
      privateKey,
      data.receiverAddress,
      data.amount
    );

    // Update payment after success
    const updatedPayment = await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        txHash: transaction.transactionHash,
        status: PaymentStatus.SUCCESS,
      },
    });

    return updatedPayment;

  } catch (error) {
        console.error("Blockchain Error:", error);
    // Update payment as failed
    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.FAILED,
      },
    });

    throw error;
  }
};

export const getPaymentHistory = async (userId: string) => {
  return await prisma.payment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPaymentById = async (
  paymentId: string,
  userId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId,
    },
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  return payment;
};

export const deletePayment = async (
  paymentId: string,
  userId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId,
    },
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  if (payment.status === PaymentStatus.SUCCESS) {
    throw new AppError(
      "Successful payments cannot be deleted",
      400
    );
  }

  await prisma.payment.delete({
    where: {
      id: paymentId,
    },
  });

  return {
    message: "Payment deleted successfully",
  };
};


export const refundPayment = async (
  paymentId: string,
  userId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId,
    },
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  if (payment.status !== PaymentStatus.SUCCESS) {
    throw new AppError(
      "Only successful payments can be refunded",
      400
    );
  }

  const refundedPayment = await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status: PaymentStatus.REFUNDED,
    },
  });

  return refundedPayment;
};

export const generateInvoice = async (
  paymentId: string,
  userId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId,
    },
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  return {
    invoiceNumber: `INV-${Date.now()}`,
    paymentId: payment.id,
    amount: `${payment.amount} ${payment.currency}`,
    status: payment.status,
    receiverAddress: payment.receiverAddress,
    transactionHash: payment.txHash,
    createdAt: payment.createdAt,
    generatedAt: new Date(),
  };
};

export const paymentWebhook = async (payload: any) => {
  console.log("Webhook Payload:", payload);

  return true;
};