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
            ? "https://crypto-payment-gateway-1.onrender.com"
            : "http://localhost:5000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "Password@123",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "Password@123",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "clx123456789",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              example: "USER",
            },
          },
        },

        Wallet: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            address: {
              type: "string",
            },
            balance: {
              type: "number",
            },
          },
        },

        Payment: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            amount: {
              type: "number",
            },
            status: {
              type: "string",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis:
    process.env.NODE_ENV === "production"
      ? ["dist/modules/**/*.js"]
      : ["src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

console.log(
  "Swagger Paths:",
  Object.keys((swaggerSpec as any).paths || {})
);

export default swaggerSpec;