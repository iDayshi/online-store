import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const LoginPage = () => {
  const [formType, setFormType] = useState("login");

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === "register" ? "login" : "register"));
  };

  return (
    <div className="flex items-center justify-center  text-gray-900 relative ">
      <div className="px-5 py-6 lg:px-6 lg:py-8 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
        <div className="rounded border p-6 lg:p-10 shadow-sm bg-white">
          {formType === "register" ? (
            <>
              <div className="mb-6 text-center">
                <h3 className="text-3xl inline-flex items-center">
                  <svg className="w-6 h-6 inline-block text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  Old Store Phones
                </h3>
                <p className="text-gray-600">Create your own account in one single step</p>
              </div>
              <RegisterForm />
              <div className="mt-6 text-center text-sm">
                <a
                  onClick={toggleFormType}
                  role="button"
                  className="text-gray-600 hover:text-gray-700 underline block md:inline-block mb-2 md:mb-0"
                >
                  Return to log in
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h3 className="text-3xl inline-flex items-center">
                  <svg className="w-6 h-6 inline-block text-orange-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  Old Store Phones
                </h3>
                <p className="text-gray-600">Welcome, please log in to your dashboard</p>
              </div>
              <LoginForm />
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600 hover:text-gray-700 block md:inline-block mb-2 md:mb-0">
                  You don`t have an account?
                </p>
                <span className="text-gray-600 mx-1 hidden md:inline-block">·</span>
                <a
                  onClick={toggleFormType}
                  role="button"
                  className="text-gray-600 hover:text-gray-700 underline block md:inline-block mb-2 md:mb-0"
                >
                  Create Account
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
