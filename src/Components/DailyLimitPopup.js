import React, { useState } from "react";

const DailyLimitPopup = ({ onClose, onSave }) => {
  const [limit, setLimit] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const numericLimit = Number(limit);

    if (!limit || isNaN(numericLimit) || numericLimit <= 0) {
      setError("Please enter a valid positive number");
      return;
    }

    onSave(numericLimit);
    setError(""); 
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg z-[1001] w-80">
        <h2 className="text-lg font-bold mb-4">Set Your Daily Limit</h2>
        <input
          type="number"
          placeholder="Enter daily limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyLimitPopup;
