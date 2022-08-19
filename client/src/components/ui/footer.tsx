import React from "react";
// import ReactDOM from "react-dom";

function Footer() {
  return (
    <footer className="text-gray-600 body-font fixed bottom-0 left-0 right-0  bg-gray-200 backdrop-opacity-50 ">
      <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col justify-between">
        <a
          href="https://github.com/iDayshi"
          className="flex title-font font-medium items-center md:justify-start justify-center text-orange-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-12 h-12" src="https://cdn.iconscout.com/icon/free/png-256/github-169-1174970.png"></img>
        </a>
        <p className="text-xl text-orange-500 sm:border-l-2  sm:py-2 sm:mt-0 mt-4">© Dayshi 2022</p>
        <a
          href="https://result.school/products"
          className="flex title-font font-medium items-center md:justify-start justify-center text-orange-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://result.school/_next/static/media/main-logo-black.85858284.svg"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
