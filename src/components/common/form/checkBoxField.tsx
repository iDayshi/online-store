/* eslint no-use-before-define: 0 */
import React from "react";
import PropTypes from "prop-types";
import { IOptions, IRadio, ITarget } from "../../../types";
import { useDispatch } from "react-redux";
import { filterPhones } from "../../../store/phonesStore";

const CheckBoxField = ({ options, name, onChange, value, label }: IRadio) => {
  const dispatch = useDispatch();
  const handleChange = ({ target }: ITarget) => {
    const { checked } = target;
    const filterName: IOptions = { name: target.name, value: target.value, checked };
    // @ts-ignore
    dispatch(filterPhones(filterName));
  };

  return (
    <div className="flex flex-col mb-3">
      <label className="text-base font-medium text-orange-400 mb-2">{label}</label>
      {options.map((option) => (
        <div key={option.name + "_" + option.value} className="flex items-center mr-4">
          <input
            type="checkbox"
            name={name}
            id={option.name + "_" + option.value}
            defaultChecked={option.value === value}
            value={option.value}
            onChange={handleChange}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={option.value + "_" + option.value} className="ml-2 text-sm font-medium text-gray-900 ">
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

CheckBoxField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckBoxField;
