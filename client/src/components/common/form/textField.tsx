import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error, placeholder }) => {
  const handleChange = ({ target }: { target: { name: string; value: string } }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return (
      "appearance-none border rounded px-4 py-3 mt-1 block w-full outline-none focus:border-blue-500" +
      (error ? " focus:border-red-500" : "")
    );
  };

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="block text-gray-600">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          placeholder={placeholder}
        />
        {error && <div className="block text-red-600">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextField;
