import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Payment Gateway API",
      version: "1.0.0",
      description: "Backend API for Crypto Payment Gateway",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://crypto-payment-gateway-0gp5.onrender.com"
            : "http://localhost:5000",
      },
    ],
  },

  apis: [
    "./src/modules/**/*.ts",
    "./src/routes/*.ts"
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;