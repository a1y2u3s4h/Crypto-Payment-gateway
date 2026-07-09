import { z } from "zod";

export const createWalletSchema = z.object({});

export type CreateWalletInput = z.infer<typeof createWalletSchema>;