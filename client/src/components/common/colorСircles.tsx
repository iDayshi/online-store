import React from "react";
import { IColors } from "../../types";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

function СolorСircles({ colors }: { colors: Array<IColors> }) {
  return (
    <div className="flex py-2 pr-10 ">
      <span className="bg-rose-400"></span>
      {colors.map((colorInfo) => {
        console.log(colorInfo.color);

        return (
          <span
            key={nanoid()}
            className={`${colorInfo.color} border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none mr-1 `}
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
