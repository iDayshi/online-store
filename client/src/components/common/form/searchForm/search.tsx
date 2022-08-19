import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { findPhones, getPhonesLoadingStatus } from "../../../../store/phones";
import "./search.styles.css";

const SearchForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(getPhonesLoadingStatus());

  useEffect(() => {
    if (!isLoading) {
      // @ts-ignore
      dispatch(findPhones(value));
    }
  }, [value]);

  const clearSearh = () => {
    setValue("");
  };

  return (
    <div>
      <label htmlFor="simple-search" className="label-search">
        Search
      </label>
      <div className="container-search">
        <div className="flex-container-search">
          <svg className="svg-search" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          autoFocus
          autoComplete="off"
          type="text"
          id="simple-search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="input-style"
          placeholder="Search"
          required
        />
        <button onClick={clearSearh} type="button" className="btn-search-clear">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="svg-search-clear"
            viewBox="0 0 16 16"
          >
            <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchForm;
