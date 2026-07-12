const swaggerDocument = {
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
  
  paths: {
    "/api/v1/health": {
      get: {
        summary: "Health Check",
        responses: {
          "200": {
            description: "Server Running",
          },
        },
      },
    },
  },
};

export default swaggerDocument;