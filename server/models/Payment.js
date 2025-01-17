import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  usersPurchased: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["successful", "failed", "pending"], required: true },
  paymentIntentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);