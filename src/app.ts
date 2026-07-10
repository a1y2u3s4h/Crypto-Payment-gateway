import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import walletRoutes from "./modules/wallets/wallet.routes";
import authRoutes from "./modules/auth/auth.routes";
import paymentRoutes from "./modules/payments/payment.routes";

import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/notFound.middleware";

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Crypto Payment Gateway API");
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallets", walletRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;