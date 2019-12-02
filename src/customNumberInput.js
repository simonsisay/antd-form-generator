import React from "react";

const CustomNumberInput = ({ name, value, onChange }) => {
  return (
    <input name={name} value={value} onChange={e => onChange(e.target.value)} />
  );
};

export default CustomNumberInput;
