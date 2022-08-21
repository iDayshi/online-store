import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  cartIncreaseCountItem,
  cartDecreaseCountItem,
  cartRemovePhone,
  getCartItems,
  cartClear,
} from "../../store/cart";
import { getCurrentUser } from "../../store/user";
import { createOrder } from "../../store/orders";

function Cart() {
  const dispath = useDispatch();
  const cartItems = useSelector(getCartItems());
  const [isOpen, setOpen] = useState(true);
  const currentUser = useSelector(getCurrentUser());

  const handleRemoveItems = (id: string) => {
    // @ts-ignore
    dispath(cartRemovePhone(id));
  };

  const handleMakeOrder = () => {
    if (cartItems.length) {
      const data = {
        orderId: nanoid(5),
        dateOrder: new Date().toLocaleDateString(),
        itemsOrder: cartItems,
        userId: currentUser._id,
        confirm: false,
      };
      // @ts-ignore
      dispath(createOrder(data));
      // @ts-ignore
      dispath(cartClear());
      setOpen(!isOpen);
    }
  };

  const handleDecrimentCount = (id: string) => {
    // @ts-ignore
    dispath(cartDecreaseCountItem(id));
  };

  const handleIncrementCount = (id: string) => {
    // @ts-ignore
    dispath(cartIncreaseCountItem(id));
  };

  return (
    <div className="dropdown p-1 border rounded-lg border-orange-400 mr-4">
      <button
        onClick={() => setOpen(!isOpen)}
        className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-orange-400 focus:outline-none focus:text-gray-500 transition duration-1000 ease-in-out "
        aria-label="Cart"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span className="absolute inset-0 object-right-top -mr-6">
          {cartItems.length ? (
            <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
              {cartItems.length}
            </div>
          ) : (
            ""
          )}
        </span>
      </button>
      <div
        className={
          isOpen
            ? "hidden"
            : "dropdown-menu p-2 border-2 border-orange-400 right-60 absolute  text-gray-700 z-10 mt-5 bg-stone-100 "
        }
      >
        <h2 className="text-xl font-semibold">Your cart</h2>
        <ul className="flex flex-col divide-y divide-gray-700">
          {cartItems.map((phone) => {
            return (
              <li id={phone._id} key={phone._id} className="flex flex-col py-1 sm:flex-row sm:justify-between p-2">
                <div className="flex w-full space-x-2 sm:space-x-4">
                  <img
                    className="flex-shrink-0 object-contain dark:border-transparent rounded outline-none sm:w-26 sm:h-16 dark:bg-gray-500"
                    src={`/phoneImage/${phone._id}.jpg`}
                    alt={phone.name}
                  />
                  <div className="flex flex-col justify-between w-full pb-4">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">{phone.brand + " " + phone.name}</h3>
                        <p className="text-sm dark:text-gray-400">{phone.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{phone.price}$</p>
                      </div>
                    </div>
                    <div className="flex text-sm divide-x">
                      <button
                        onClick={() => handleRemoveItems(phone._id)}
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                          <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                          <rect width="32" height="200" x="168" y="216"></rect>
                          <rect width="32" height="200" x="240" y="216"></rect>
                          <rect width="32" height="200" x="312" y="216"></rect>
                          <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                        </svg>
                        <span>Remove</span>
                      </button>
                      <div className="inline-flex items-center mt-2">
                        <button
                          onClick={() => handleDecrimentCount(phone._id)}
                          className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200 ml-6"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                          {phone.count}
                        </div>
                        <button
                          onClick={() => handleIncrementCount(phone._id)}
                          className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="space-y-1 text-right p-4">
          <p>
            Total amount:
            <span className="font-semibold">
              {" $ " +
                cartItems.reduce((acc, p) => {
                  return acc + p.price * p.count;
                }, 0)}
            </span>
          </p>
        </div>
        <div className="flex justify-center mb-3  ">
          <button
            onClick={handleMakeOrder}
            type="button"
            className="px-6 py-2 border rounded-md dark:bg-orange-400 dark:text-gray-900 dark:border-orange-400 transform active:scale-95 transition-transform"
          >
            <span className="sr-only sm:not-sr-only">Make an order</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
