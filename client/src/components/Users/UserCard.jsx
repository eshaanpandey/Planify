import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-xl font-semibold">{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
