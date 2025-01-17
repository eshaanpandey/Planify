import express from "express";
import {
  getAllUsers,
  getUserDetails,
  addUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Superadmin and Admin: View users
router.get("/", authMiddleware(["superadmin", "admin"]), getAllUsers);
router.get("/:id", authMiddleware(["superadmin", "admin"]), getUserDetails);

// Admin only: Add or delete users
router.post("/", authMiddleware(["admin"]), addUser);
router.delete("/:id", authMiddleware(["admin"]), deleteUser);

export default router;
