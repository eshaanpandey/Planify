import User from "../models/User.js";
import Organization from "../models/Organization.js";
import Plan from "../models/Plan.js";
import { generateToken } from "../helpers/jwtHelper.js";
import dotenv from "dotenv";

dotenv.config();

export const registerSuperAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password, role: "superadmin" });
    await user.save();
    res.status(201).json({ message: "Super Admin registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  const { name, email, password, organizationName } = req.body;

  try {
    // Make an organization with a Basic plan while registring admin
    const organization = new Organization({ name: organizationName });
    const defaultPlan = await Plan.findOne({ name: "Basic" });

    if (!defaultPlan) {
      return res.status(400).json({ message: "Default plan not found" });
    }

    if (!defaultPlan._id) {
      return res.status(400).json({ message: "Invalid plan ID" });
    }

    organization.plans.push({
      planId: defaultPlan._id,
      usersPurchased: 0,
      paymentId: null,
      startDate: Date.now(),
      endDate: new Date(
        Date.now() + defaultPlan.duration * 24 * 60 * 60 * 1000
      ),
    });
    await organization.save();

    const user = new User({
      name,
      email,
      password,
      role: "admin",
      organizationId: organization._id,
    });

    await user.save();

    organization.adminId = user._id;
    await organization.save();

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
