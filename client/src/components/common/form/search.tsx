import React from "react";
import PropTypes from "prop-types";
import { IOptions } from "../../../types";
import { useDispatch } from "react-redux";
import { findPhones } from "../../../store/phones";

const SearchForm = () => {
  const dispatch = useDispatch();
  const changeUsers = ({ target }: { target: IOptions }) => {
    // @ts-ignore
    dispatch(findPhones({ name: target.value }));
  };

  return (
    <div>
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-orange-500 dark:text-orange-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          onChange={changeUsers}
          className="bg-white border border-gray-300 text-orange-500 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5  dark:bg-white dark:border-white dark:placeholder-dark dark:text-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
          placeholder="Search"
          required
        />
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchForm;
