import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlan, deletePlan } from "../../redux/slices/planSlices";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlices";

const PlanCard = ({ plan, isSuperAdmin }) => {
  const { _id, name, pricePerUser, duration, maxUsers } = plan;
  const [editMode, setEditMode] = useState(false);
  const [updatedPlan, setUpdatedPlan] = useState({ name, pricePerUser, duration, maxUsers });
  const [inCart, setInCart] = useState(false);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updatePlan({ id: _id, data: updatedPlan }));
    window.location.reload();  
  };

  const handleDelete = () => {
    dispatch(deletePlan(_id));
    window.location.reload(); 
  };

  const handleCartToggle = () => {
    if (inCart) {
      dispatch(removeFromCart(plan));
    } else {
      dispatch(addToCart(plan));
    }
    setInCart(!inCart);
  };

  const priceText = pricePerUser === 0 ? `Free` : `INR ${pricePerUser} Per User`;

  return (
    <div className="border border-gray-300 rounded-lg p-6 w-64 text-center shadow-lg bg-white">
      <h3 className="text-xl font-bold text-gray-700 mb-2">
        {editMode ? (
          <input
            type="text"
            value={updatedPlan.name}
            onChange={(e) => setUpdatedPlan({ ...updatedPlan, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
        ) : (
          name
        )}
      </h3>
      <p className="text-gray-600 mb-2">
        {editMode ? (
          <input
            type="text"
            value={updatedPlan.pricePerUser}
            onChange={(e) => setUpdatedPlan({ ...updatedPlan, pricePerUser: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
        ) : (
          priceText
        )}
      </p>
      <p className="text-gray-600 mb-2">Duration: {duration} Days</p>
      <p className="text-gray-600 mb-2">
        {name === "Plus" ? `Min Users: ${maxUsers}` : `Max Users: ${maxUsers}`}
      </p>

      {!isSuperAdmin && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
          onClick={handleCartToggle}
        >
         {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
      )}

      {isSuperAdmin && (
        <div className="flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
      
    </div>
  );
};

export default PlanCard;
