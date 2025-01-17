import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Plan from "../models/Plan.js";

// Admin or Superadmin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { role, organizationId } = req.user;

    let users;
    if (role === "superadmin") {
      // Superadmin can see all users
      users = await User.find().select("-password");
    } else if (role === "admin") {
      // Admin sees only their organization's users
      users = await User.find({ organizationId }).select("-password");
    } else {
      return res.status(403).json({ message: "Access denied." });
    }

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Admin or Superadmin: Get user details
export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, organizationId } = req.user;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      role === "admin" &&
      user.organizationId.toString() !== organizationId.toString()
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
};

// Admin: Add a new user (Admin can only add to their organization)
export const addUser = async (req, res) => {
  try {
    const { role, organizationId } = req.user;
    const { name, email, password, planId } = req.body;

    console.log(req.user);
    console.log(req.body);

    console.log("user role: ", role);

    if (role !== "admin" || organizationId !== req.body.organizationId) {
      return res.status(403).json({ message: "Access denied." });
    }

    // Check the organization plans
    const organization = await Organization.findById(organizationId);
    const plan = organization.plans.find((p) => p.planId.toString() === planId);

    if (!plan) {
      return res
        .status(400)
        .json({ message: "This plan is not available for your organization." });
    }

    console.log("plan for organization: ", plan);

    const selectedPlan = await Plan.findById(planId);
    if (plan.usersPurchased >= selectedPlan.maxUsers) {
      console.log("users purchased till now: ", plan.usersPurchased);
      console.log("max users allowed: ", selectedPlan.maxUsers);
      return res
        .status(400)
        .json({ message: "User limit exceeded for this plan." });
    }

    // Add user
    const newUser = new User({
      name,
      email,
      password,
      role: "user",
      organizationId,
    });
    await newUser.save();

    // Update organization user count and plan usage
    plan.usersPurchased += 1;
    organization.totalUsers += 1;
    await organization.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};

// Admin or Superadmin: Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, organizationId } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      role === "admin" &&
      user.organizationId.toString() !== organizationId.toString()
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" }); // Redundant but ensures safety
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
