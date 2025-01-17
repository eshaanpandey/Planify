import express from "express";
import {
  getAllOrganizations,
  getOrganizationDetails,
  updateOrganizationPlans,
} from "../controllers/organizationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware(["superadmin"]), getAllOrganizations);
router.get("/:id", authMiddleware(["superadmin", "admin"]), getOrganizationDetails);
router.put("/:id/plans", authMiddleware(["admin"]), updateOrganizationPlans);

export default router;
