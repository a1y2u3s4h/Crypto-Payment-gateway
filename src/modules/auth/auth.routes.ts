import { Router } from "express";
import { authorize, authenticate } from "../../middleware/auth.middleware";
import { UserRole } from "../../constants/roles";

import {
  register,
  login,
  profile,
  adminDashboard,
} from "./auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication & Authorization APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with encrypted password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation failed.
 *       409:
 *         description: User already exists.
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and return JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid email or password.
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     description: Returns the profile of the authenticated user.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/profile", authenticate, profile);

/**
 * @swagger
 * /api/v1/auth/admin:
 *   get:
 *     summary: Admin Dashboard
 *     description: Accessible only by ADMIN users.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard accessed successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Access denied.
 */
router.get(
  "/admin",
  authenticate,
  authorize(UserRole.ADMIN),
  adminDashboard
);

export default router;