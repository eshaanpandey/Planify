import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlans, createPlan, updatePlan, deletePlan } from '../../redux/slices/planSlices';
import PlanList from '../Plans/PlanList';

const ManagePlans = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.plans);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    pricePerUser: 0,
    maxUsers: 1,
    duration: 14,
  });

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (selectedPlan) {
      dispatch(updatePlan({ id: selectedPlan._id, data: formData }));
    } else {
      dispatch(createPlan(formData));
    }
    setFormData({
      name: '',
      pricePerUser: 0,
      maxUsers: 1,
      duration: 14,
    });
    setSelectedPlan(null);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      pricePerUser: plan.pricePerUser,
      maxUsers: plan.maxUsers,
      duration: plan.duration,
    });
  };

  const handleDeletePlan = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      dispatch(deletePlan(id));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Manage Plans</h1>
      <form onSubmit={handleAddPlan} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Price Per User</label>
          <input
            type="number"
            value={formData.pricePerUser}
            onChange={(e) => setFormData({ ...formData, pricePerUser: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Max Users</label>
          <input
            type="number"
            value={formData.maxUsers}
            onChange={(e) => setFormData({ ...formData, maxUsers: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Duration (Days)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>
        <button type="submit">{selectedPlan ? 'Update Plan' : 'Add Plan'}</button>
      </form>

      <PlanList
        plans={plans}
        onEdit={handleEditPlan}
        onDelete={handleDeletePlan}
      />
    </div>
  );
};

export default ManagePlans;
