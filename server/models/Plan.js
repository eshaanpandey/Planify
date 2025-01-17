import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePerUser: { type: Number, required: true },
  maxUsers: { type: Number, required: true },
  duration: { type: Number, required: true }, // Duration in days
},
{ timestamps: true }
);

export default mongoose.model("Plan", planSchema);
