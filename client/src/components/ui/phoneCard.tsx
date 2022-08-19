import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPhones } from "../../store/phones";
import ColorCircles from "../common/colorСircles";

function PhoneCard() {
  const phones = useSelector(getPhones());

  return (
    <>
      {phones.map((phone) => {
        return (
          <div key={phone._id} className="group relative">
            <Link to={`/product/${phone._id}`}>
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={`/phoneImage/${phone._id}.jpg`}
                  alt={phone.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full "
                />
              </div>
            </Link>
            <div className="mt-4 flex justify-between">
              <ul>
                <li className="text-sm text-gray-700">
                  {phone.brand} {phone.name}
                </li>
                <h3 className="flex mt-1 text-sm text-gray-500 flex-row">
                  <ColorCircles colors={phone.color} />
                </h3>
              </ul>
              <p className="text-sm font-medium text-gray-900">${phone.price}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PhoneCard;
