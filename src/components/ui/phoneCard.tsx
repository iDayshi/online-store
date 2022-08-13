import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartAddPhone } from "../../store/cartStore";
import { getPhones } from "../../store/phonesStore";
import { IPhone } from "../../types";
import ColorCircles from "../common/colorСircles";

function PhoneCard() {
  const phones = useSelector(getPhones());
  const dispatch = useDispatch();

  const handleAddToCart = (item: IPhone) => {
    // @ts-ignore
    dispatch(cartAddPhone(item));
  };

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
                <li className="text-xs text-gray-700">
                  <span className="text-yellow-600 ml-3">Release: {phone.date} year</span>
                </li>
                <li className="text-xs text-gray-700">
                  <span className="text-yellow-600 ml-3">Rate: {phone.rate} / 10</span>
                </li>
                <li className="text-xs text-gray-700">
                  <span className="text-yellow-600 ml-3">Accumulator: {phone.accumulator} mA*h </span>
                </li>
                <li className="text-xs text-gray-700">
                  <span className="text-yellow-600 ml-3">Weight: {phone.weight} g </span>
                </li>
                <li className="text-xs text-gray-700">
                  <span className="text-yellow-600 ml-3">Count: {phone.count} </span>
                </li>

                <h3 className="flex mt-1 text-sm text-gray-500 flex-row">
                  <ColorCircles colors={phone.color} />
                  <button
                    onClick={() => handleAddToCart(phone)}
                    className="p- w-10 h-10 bg-orange-600 rounded-full hover:bg-orange-400 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none active:bg-white"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      enableBackground="new 0 0 20 20"
                      className="w-6 h-6 inline-block rounded-full active:bg-orange-600"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399C15.952,9,16,9.447,16,10z"
                      />
                    </svg>
                  </button>
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
