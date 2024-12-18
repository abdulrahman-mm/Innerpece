import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import innerpece_logo from "../assets/innerpece_logo.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up on component unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center px-5 md:px-11 py-1 md:py-3">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src={innerpece_logo} alt="" />
      </div>

      <div className="max-md:hidden">
        <ul className="flex items-center">
          <li className="md:pe-5 lg:pe-11  font-semibold hover:text-gray-500">
            <Link className="cursor-pointer" to="/">
              Home
            </Link>
          </li>
          {/* <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
            <Link to="/destinations">Destinations</Link>
          </li> */}
          <li className="md:pe-5 lg:pe-11  font-semibold hover:text-gray-500">
            <Link className="cursor-pointer" to="/aboutus">
              About
            </Link>
          </li>
          <li className="md:pe-5 lg:pe-11  font-semibold hover:text-gray-500">
            <Link className="cursor-pointer" to="/contactus">
              Contact Us
            </Link>
          </li>
          <li className="">
            <Link
              className="cursor-pointer md:me-2    lg:me-10 font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-blue-800 hover:border-blue-800   md:px-3 lg:px-6 py-2"
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-white z-20 p-10 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-red-600 font-extrabold text-3xl"
        >
          &times;
        </button>
        <ul className="flex flex-col gap-5 mt-20">
          <li className="text-xl cursor-pointer">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li className="text-xl cursor-pointer">
            <Link to="/aboutus" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="text-xl cursor-pointer">
            <Link to="/contactus" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 mx-auto cursor-pointer font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white"
          >
            Login
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
