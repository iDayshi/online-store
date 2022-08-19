import React from "react";
import { Link } from "react-router-dom";
import Cart from "./cartBoard";
import NavProfole from "./navProfile";
import { getIsLoggedIn, loadingUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  const ifLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  if (ifLoggedIn) {
    // @ts-ignore
    dispatch(loadingUser());
  }

  return (
    <header className="text-gray-600 body-font ">
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
        <Cart />
        {ifLoggedIn ? (
          <NavProfole />
        ) : (
          <Link to="login">
            <h1>Sign In</h1>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navigation;
