import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans, createPlan } from "../../redux/slices/planSlices";
import PlanCard from "./PlanCard";

const PlanList = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.plans);
  const { user } = useSelector((state) => state.auth);
  const [newPlan, setNewPlan] = useState({
    name: "",
    pricePerUser: 0,
    maxUsers: 1,
    duration: 14,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (user?.role === "superadmin") {
      dispatch(createPlan(newPlan));
      setNewPlan({ name: "", pricePerUser: 0, maxUsers: 1, duration: 14 });
      dispatch(fetchPlans());
      setShowForm(false);
    }
  };

  if (loading) return <p>Loading plan list...</p>;
  if (error) return <p>Error: {error.message || "Failed to load plans"}</p>;

  return (
    <div className="p-8">
      {user?.role === "superadmin" && (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          >
            {showForm ? "Cancel" : "Add New Plan"}
          </button>
          {showForm && (
            <form onSubmit={handleAddPlan} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Plan</h2>
              <div>
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Price Per User</label>
                <input
                  type="number"
                  value={newPlan.pricePerUser}
                  onChange={(e) => setNewPlan({ ...newPlan, pricePerUser: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Max Users</label>
                <input
                  type="number"
                  value={newPlan.maxUsers}
                  onChange={(e) => setNewPlan({ ...newPlan, maxUsers: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-600">Duration (Days)</label>
                <input
                  type="number"
                  value={newPlan.duration}
                  onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Add Plan
              </button>
            </form>
          )}
        </>
      )}

      <h2 className="text-2xl font-semibold text-center text-gray-800 my-6">Browse the Plans</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {plans?.length > 0 ? (
          plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              isSuperAdmin={user?.role === "superadmin"}
            />
          ))
        ) : (
          <p>No plans available.</p>
        )}
      </div>
    </div>
  );
};

export default PlanList;
