import express from "express";
import { registerSuperAdmin, registerAdmin, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/superadmin/register", registerSuperAdmin);
router.post("/admin/register", registerAdmin);
router.post("/user/login", login);
router.post("/user/logout", logout);

export default router;