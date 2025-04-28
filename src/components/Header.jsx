import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import innerpece_logo2 from "../assets/innerpece_logo2.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLogedIn, setUserLogedIn] = useState(false);
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

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    if (storedUserDetails) setUserLogedIn(true);
  }, []);

  const onClickLogout = () => {
    localStorage.removeItem("loginDetails");
  };

  return (
    <div className="flex justify-between items-center px-2  xl:px-10 py-0   sm:py-2   bg-black text-white ">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img
          src={innerpece_logo2}
          alt=""
          className="w-28 lg:w-40 h-14 object-contain"
        />
      </div>

      <div className="max-md:hidden">
        <ul className="flex items-center">
          <li className="md:pe-5 lg:pe-11 font-semibold  ">
            <Link to="/" className="cursor-pointer hover:text-gray-500">
              Home
            </Link>
          </li>

          <li className="md:pe-5 lg:pe-11 font-semibold  ">
            <Link
              to="/sendenquiry"
              className="cursor-pointer hover:text-gray-500"
            >
              Customization Enquiry
            </Link>
          </li>

          <li className="md:pe-5 lg:pe-11  font-semibold ">
            <Link
              className="cursor-pointer hover:text-gray-500"
              to="/destinations"
            >
              Destinations
            </Link>
          </li>

          <li className="md:pe-5 lg:pe-11 font-semibold  ">
            <Link to="/aboutus" className="cursor-pointer hover:text-gray-500">
              About Us
            </Link>
          </li>
          <li className="md:pe-5 lg:pe-11 font-semibold  ">
            <Link
              to="/contactus"
              className="cursor-pointer hover:text-gray-500"
            >
              Contact Us
            </Link>
          </li>
          {userLogedIn && (
            <li className=" lg:pe-11 font-semibold   ">
              <Link
                to="/profile"
                className="cursor-pointer hover:text-gray-500"
              >
                My Profile
              </Link>
            </li>
          )}
          {/* {userLogedIn ? (
            <Link
              onClick={onClickLogout}
              to="/login"
              className="cursor-pointer  font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-gray-700 hover:border-gray-700  text-center    md:px-3 lg:px-6 py-2"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer font-semibold   border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-gray-700 hover:border-gray-700 text-center   md:px-3 lg:px-6 py-2"
            >
              Login
            </Link>
          )} */}

          {!userLogedIn && (
            <Link
              to="/login"
              className="cursor-pointer font-semibold   border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-gray-700 hover:border-gray-700 text-center   md:px-3 lg:px-6 py-2"
            >
              Login
            </Link>
          )}
        </ul>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 p-10 transform transition-transform duration-500 ease-in-out ${
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
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/sendenquiry" onClick={() => setIsOpen(false)}>
              Customization Enquiry
            </Link>
          </li>
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link className="cursor-pointer" to="/destinations">
              Destinations
            </Link>
          </li>
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/aboutus" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="text-black text-xl cursor-pointer font-medium">
            <Link to="/contactus" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>
          {userLogedIn && (
            <li className="text-black text-xl cursor-pointer font-medium">
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                My Profile
              </Link>
            </li>
          )}

          {!userLogedIn && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 cursor-pointer text-center font-semibold border-[#005FC4] border-2 rounded-2xl text-[#005FC4] bg-white hover:text-white hover:bg-gray-700 hover:border-gray-700"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
