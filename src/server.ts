import "dotenv/config";

import app from "./app";
import { env } from "./config/env";

console.log("process.env.WALLET_SECRET_KEY =", process.env.WALLET_SECRET_KEY);

app.listen(Number(env.PORT), () => {
  console.log(`
=========================================
🚀 Server Started Successfully
🌐 http://localhost:${env.PORT}
=========================================
`);
});