import React from "react";
import { IColors } from "../../types";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

function СolorСircles({ colors }: { colors: Array<IColors> }) {
  return (
    <div className="flex py-2 pr-10">
      <span className="">Colors:</span>
      {colors.map((color) => {
        return (
          <span
            key={nanoid()}
            className={"border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none " + color.value}
          ></span>
        );
      })}
    </div>
  );
}

СolorСircles.propTypes = {
  colors: PropTypes.array,
};

export default СolorСircles;
