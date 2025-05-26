import React from "react";

const RadioButton = ({ status, title, value, children, onChange }) => {
  return (
    <div className="second__value flex justify-between  px-2 py-1 bg-[#5676ff] w-[190px] rounded-lg">
      <label
        className="flex items-center gap-2 w-full cursor-pointer"
        htmlFor={value}
      >
        {children}
        {`${title}`}
      </label>
      <input
        type="radio"
        id={value}
        name={value}
        value={value}
        checked={status === value}
        onChange={onChange}
      />
    </div>
  );
};

export default RadioButton;
