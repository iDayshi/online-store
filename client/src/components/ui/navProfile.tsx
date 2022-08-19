import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser, logOut } from "../../store/user";

const NavProfole = () => {
  const [isOpen, setOpen] = useState(true);
  const currentUser = useSelector(getCurrentUser());
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // @ts-ignore
    dispatch(logOut());
  };

  return (
    <>
      {currentUser ? (
        <div className="flex items-center md:order-2 relative">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-orange-400"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            // onBlur={() => setOpen(!isOpen)}
            onClick={() => setOpen(!isOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-16 h-16 rounded-full" src={currentUser.image} alt="user photo" />
          </button>

          <div
            className={
              isOpen
                ? "hidden"
                : "" +
                  " z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-16"
            }
            id="user-dropdown"
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">{currentUser.name}</span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {currentUser.email}
              </span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              <Link to={"account"}>
                <li>
                  <p className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    {currentUser.isAdmin ? "Admin" : "Orders"}
                  </p>
                </li>
              </Link>
              <li onClick={handleLogOut}>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
};

export default NavProfole;
