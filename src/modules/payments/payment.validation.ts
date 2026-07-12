// import { z } from "zod";

// export const createPaymentSchema = z.object({
//   amount: z.number().positive("Amount must be greater than 0"),

//   currency: z.string().min(1, "Currency is required"),

//   receiverAddress: z.string().min(1, "Receiver address is required"),
// });

// export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),

  currency: z.string().min(1, "Currency is required"),

  receiverAddress: z.string().min(1, "Receiver address is required"),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;