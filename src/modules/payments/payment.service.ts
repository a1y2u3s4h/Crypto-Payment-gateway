import prisma from "../../database/prisma";
import { PaymentStatus } from "@prisma/client";
import { CreatePaymentInput } from "./payment.validation";

export const createPayment = async (
  userId: string,
  data: CreatePaymentInput
) => {
  const payment = await prisma.payment.create({
    data: {
      amount: data.amount,
      currency: data.currency,
      receiverAddress: data.receiverAddress,
      status: PaymentStatus.PENDING,
      userId,
    },
  });

  return payment;
};