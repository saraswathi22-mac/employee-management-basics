import React from "react";

const TextField = ({ label, inputProps, onChange, value }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Input */}
      <input
        className="
          bg-white
          border
          border-gray-300
          rounded-md
          px-3
          py-2
          text-sm
          text-gray-800
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          placeholder:text-gray-400
          disabled:bg-gray-100
          disabled:cursor-not-allowed
        "
        {...inputProps}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
