import Organization from "../models/Organization.js";
import User from "../models/User.js";

export const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate("adminId", "email");
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizations", error: error.message });
  }
};

export const getOrganizationDetails = async (req, res) => {
  const { id } = req.params;
  const { role, organizationId } = req.user;

  try {
    const organization = await Organization.findById(id).populate("adminId", "email");

    if (!organization) return res.status(404).json({ message: "Organization not found" });

    if (role !== "superadmin" && organization._id.toString() !== organizationId) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organization details", error: error.message });
  }
};

export const updateOrganizationPlans = async (req, res) => {
  const { id } = req.params;
  const { planId, usersPurchased } = req.body;

  try {
    const organization = await Organization.findById(id);

    if (!organization) return res.status(404).json({ message: "Organization not found" });

    organization.plans.push({ planId, usersPurchased });
    await organization.save();

    res.status(200).json({ message: "Organization plans updated successfully", organization });
  } catch (error) {
    res.status(500).json({ message: "Error updating plans", error: error.message });
  }
};
