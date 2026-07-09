"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_validation_1 = require("./modules/auth/auth.validation");
const result = auth_validation_1.registerSchema.safeParse({
    name: "Ayush",
    email: "ayush@gmail.com",
    password: "23443",
});
console.log(result);
