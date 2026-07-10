export interface CreatePaymentInput {
  amount: number;
  currency: string;
  receiverAddress: string;
}