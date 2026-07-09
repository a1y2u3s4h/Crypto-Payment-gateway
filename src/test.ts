import { registerSchema } from "./modules/auth/auth.validation";

const result = registerSchema.safeParse({
  name: "Ayush",
  email: "ayush@gmail.com",
  password: "23443",
});

console.log(result);