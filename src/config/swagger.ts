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
              example: "clx123456789",
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
              example: "2026-07-12T12:30:00Z",
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
    "./src/modules/**/*.ts",
    "./src/modules/**/*.routes.ts",
    "./src/modules/**/*.controller.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;