import express from "express";
import {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Superadmin only: Create, update, delete plans
router.post("/", authMiddleware(["superadmin"]), createPlan);
router.put("/:id", authMiddleware(["superadmin"]), updatePlan);
router.delete("/:id", authMiddleware(["superadmin"]), deletePlan);

// All roles: Get all plans
router.get("/", getAllPlans);

export default router;
