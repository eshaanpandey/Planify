import React from "react";

const ErrorHandler = ({ error }) => {
    if (!error) return null;
  
    const errorMessage = typeof error === "string" ? error : error.message || "An unknown error occurred.";
    return (
      <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{errorMessage}</span>
      </div>
    );
  };
  

export default ErrorHandler;
