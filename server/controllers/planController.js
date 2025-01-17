import Plan from "../models/Plan.js";

// Create a new plan (Superadmin only)
export const createPlan = async (req, res) => {
  try {
    const { name, pricePerUser, maxUsers, duration } = req.body;

    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) {
      return res.status(400).json({ message: "Plan with this name already exists" });
    }

    const newPlan = new Plan({ name, pricePerUser, maxUsers, duration });
    await newPlan.save();
    res.status(201).json({ message: "Plan created successfully", plan: newPlan });

  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Error creating plan", error: error.message });
  }
};


// Get all plans (All roles)
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans", error: error.message });
  }
};

// Update a plan (Superadmin only)
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pricePerUser, maxUsers } = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      { name, pricePerUser, maxUsers },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan updated successfully", plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: "Error updating plan", error: error.message });
  }
};

// Delete a plan (Superadmin only)
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await Plan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting plan", error: error.message });
  }
};
