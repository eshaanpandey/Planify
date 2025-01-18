import express from "express";
import {
  recordPayment,
  getAllPayments,
  getPaymentsByOrganization,
  handleStripeWebhook,
} from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(["admin"]), recordPayment);
// router.get("/", authMiddleware(["superadmin"]), getAllPayments);
router.get("/", authMiddleware(["superadmin", "admin"]), getAllPayments);
router.get("/:id", authMiddleware(["admin", "superadmin"]), getPaymentsByOrganization);

router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;
