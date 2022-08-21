import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { sortedPhones } from "../../../store/phones";

const SelectField = () => {
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    // @ts-ignore
    dispatch(sortedPhones({ name: target.value.split(".")[0], value: target.value.split(".")[1] }));
  };

  return (
    <div className="flex flex-col mb-3">
      <label htmlFor="brand" className="text-base font-medium text-orange-400 mb-2">
        Sort by:
      </label>
      <select
        id="sort"
        onChange={handleChange}
        defaultValue={"value"}
        className="bg-white border border-gray-300 text-orange-600 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:border-orange-600 dark:placeholder-gray-400 dark:text-orange-600 dark:focus:ring-orange-500 dark:focus:border-orange-500"
      >
        <option value={"value"} disabled hidden>
          {"select sort"}
        </option>
        <option value="price.low">Price: Low to High</option>
        <option value="price.high">Price: High to Low</option>
        <option value="name.low">Name: A - Z</option>
        <option value="name.high">Name: Z - A</option>
      </select>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectField;
