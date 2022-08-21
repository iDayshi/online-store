import React from "react";
import { IColors } from "../../types";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

function СolorСircles({ colors }: { colors: Array<IColors> }) {
  return (
    <div className="flex py-2 pr-10 ">
      {/* fix bug tailwind initial color, background color not changing */}
      <span className="bg-rose-400"></span>
      <span className="bg-amber-800"></span>
      <span className="bg-white"></span>
      <span className="bg-black"></span>
      <span className="bg-blue-800"></span>
      <span className="bg-zinc-600"></span>
      <span className="bg-red-600"></span>
      <span className="bg-orange-500"></span>
      {colors.map((colorInfo) => {
        return (
          <span
            key={nanoid()}
            className={`border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none mr-1 ` + colorInfo.color}
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
