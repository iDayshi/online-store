import { nanoid } from "nanoid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartRemovePhone, getCartItems } from "../../store/cartStore";

function Navigation() {
  const dispath = useDispatch();
  const cartItems = useSelector(getCartItems());
  const handleRemoveItems = (id: string) => {
    // @ts-ignore
    dispath(cartRemovePhone(id));
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"}>
          <span className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="w-20 h-20" src="https://cdn-icons-png.flaticon.com/128/3616/3616582.png" alt="logo" />
            <span className="ml-3 text-3xl ">
              Old
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 ml-2 before:bg-orange-500 relative inline-block">
                <span className="relative text-white">Store</span>
              </span>
            </span>
          </span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <span className="text-xl rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 hover:underline decoration-sky-500">
            <Link to={"/"}>Phones</Link>
          </span>
          <span className="text-xl rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 hover:underline decoration-sky-500">
            <Link to={"/about"}>About</Link>
          </span>
        </nav>
        <div className="p-3 border rounded-lg border-orange-400">
          <div className="dropdown inline-block relative">
            <button
              className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-orange-400 focus:outline-none focus:text-gray-500 transition duration-1000 ease-in-out"
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
            <ul className="dropdown-menu right-5 absolute hidden text-gray-700  z-10">
              {cartItems.map((phone) => {
                return (
                  <li
                    key={nanoid()}
                    className="p-2 flex bg-white border-collapse hover:bg-gray-100 cursor-pointer border border-solid border-orange-300"
                  >
                    <div className="p-2 w-12">
                      <img src={`/phoneImage/${phone._id}.jpg`} alt={phone.name} />
                    </div>
                    <div className="flex-auto text-sm w-32">
                      <div className="font-bold">{phone.brand}</div>
                      <div className="truncate">{phone.name}</div>
                    </div>
                    <div className="flex flex-col w-18 font-medium items-end">
                      <button
                        onClick={() => handleRemoveItems(phone._id)}
                        className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-trash-2 "
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                      ${phone.price}
                    </div>
                  </li>
                );
              })}
              <li className="p-4 justify-center flex bg-gray-100">
                <span className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-orange-700 hover:text-orange-100   bg-orange-100 text-orange-700 border duration-200 ease-in-out border-orange-600 transition">
                  Checkout{" "}
                  {"$" +
                    cartItems.reduce((acc, p) => {
                      return acc + p.price;
                    }, 0)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
