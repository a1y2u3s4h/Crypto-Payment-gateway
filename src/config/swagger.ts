import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Crypto Payment Gateway API",
      version: "1.0.0",
      description:
        "Production-ready Backend API for Crypto Payment Gateway built with Node.js, Express.js, TypeScript, Prisma ORM and PostgreSQL.",
      contact: {
        name: "Ayush Chitransh",
        email: "ayush@example.com",
      },
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://crypto-payment-gateway-0gp5.onrender.com"
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
          description: "Enter JWT Token",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Ayush Chitransh",
            },
            email: {
              type: "string",
              example: "ayush@gmail.com",
            },
            password: {
              type: "string",
              example: "Password@123",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              example: "USER",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "ayush@gmail.com",
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
              example: "clxyz123456",
            },
            name: {
              type: "string",
              example: "Ayush Chitransh",
            },
            email: {
              type: "string",
              example: "ayush@gmail.com",
            },
            role: {
              type: "string",
              example: "USER",
            },
            createdAt: {
              type: "string",
              example: "2026-07-12T18:30:00Z",
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
              example: "0x12AB34CD56EF78901234567890ABCDEF12345678",
            },
            balance: {
              type: "number",
              example: 0.25,
            },
            currency: {
              type: "string",
              example: "ETH",
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
              example: 100,
            },
            currency: {
              type: "string",
              example: "ETH",
            },
            status: {
              type: "string",
              example: "SUCCESS",
            },
            transactionHash: {
              type: "string",
              example:
                "0x123456789abcdef123456789abcdef123456789abcdef",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Unauthorized",
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

  apis: [
    "./src/modules/**/*.routes.ts",
    "./src/modules/**/*.controller.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;