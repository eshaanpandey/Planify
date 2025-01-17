import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plans: [
    {
      planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
      usersPurchased: { type: Number, required: true },
      paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
      startDate: { type: Date },
      endDate: { type: Date},
    },
  ],
  totalUsers: { type: Number, default: 0 },
});

export default mongoose.model("Organization", organizationSchema);