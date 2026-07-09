import { Router } from "express";

//import { authenticate } from "../../middleware/auth.middleware";

import { authorize, authenticate } from "../../middleware/auth.middleware";

import { UserRole } from "../../constants/roles";

import {
  register,
  login,
  profile,
  adminDashboard,
} from "./auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authenticate, profile);

router.get(
  "/admin",
  authenticate,
  authorize(UserRole.ADMIN),
  adminDashboard
);



export default router;