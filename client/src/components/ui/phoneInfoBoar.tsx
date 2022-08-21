import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import СolorСircles from "../common/colorСircles";
import { cartAddPhone, getCartItems } from "../../store/cart";
import { getPhonesById } from "../../store/phones";
import { IPhone } from "../../types";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../store/user";

const PhoneInfoBoard = () => {
  const { id } = useParams();
  const isUser = useSelector(getCurrentUser());
  const cartLength = useSelector(getCartItems()).length;
  const currentPhone = useSelector(getPhonesById(id));
  const dispatch = useDispatch();

  function correctData(phone: IPhone) {
    return {
      _id: phone._id,
      name: phone.name,
      brand: phone.brand,
      type: phone.type,
      price: phone.price,
      count: 1,
    };
  }

  const handleAddToCart = (item: IPhone) => {
    if (isUser) {
      if (cartLength < 3) {
        const newData = correctData(item);
        // @ts-ignore
        dispatch(cartAddPhone(newData));
      } else {
        toast.error("Максимум 3 позиции в заказе", { position: "top-center", autoClose: 2000 });
      }
    } else {
      toast("Ввойдите в аккаунт");
    }
  };

  return (
    <>
      <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
        <img
          alt={currentPhone.name}
          className="lg:w-1/3 w-full lg:h-auto h-64 object-scale-down object-center rounded"
          src={`/phoneImage/${currentPhone._id}.jpg`}
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">{currentPhone.brand}</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{currentPhone.name}</h1>
          <div className="flex mb-4">
            <span className="text-xl text-yellow-600 ml-3">{currentPhone.rate} / 10 Rate</span>
          </div>
          <p className="leading-relaxed">{currentPhone.info.value}</p>
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
            <div className="flex">
              <СolorСircles colors={currentPhone.color} />
            </div>
          </div>
          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-900">${currentPhone.price}</span>
            <button
              onClick={() => handleAddToCart(currentPhone)}
              className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded transform active:scale-95 transition-transform"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneInfoBoard;
