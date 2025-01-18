import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationDetails } from "../../redux/slices/organizationSlices";

const OrganizationDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { organization, loading } = useSelector((state) => state.organizations);

  useEffect(() => {
    dispatch(getOrganizationDetails(id));
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Organization Details</h2>
      <div>
        <h3>{organization.name}</h3>
        <p>Admin: {organization.adminId.email}</p>
        <p>Active Users: {organization.activeUsers}</p>
        <p>Plan Expiry: {organization.planExpiry}</p>
        <p>Plans: {organization.plans.map(plan => (
          <span key={plan._id}>{plan.planId} ({plan.usersPurchased} users)</span>
        ))}</p>
      </div>
    </div>
  );
};

export default OrganizationDetails;
