import React from "react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-5 md:px-11 py-3">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <p
          style={{ color: "#005FC4" }}
          className="text-2xl md:text-3xl lg:text-4xl leading-none font-semibold"
        >
          Innerpece
        </p>
        <div className="flex justify-end">
          <p
            style={{ color: "#005FC4" }}
            className="text-xs italic leading-none"
          >
            More Travel{" "}
          </p>
          <p
            style={{ color: "#005FC4" }}
            className="text-xs italic ps-3 md:ps-6 leading-none"
          >
            {" "}
            More Peace
          </p>
        </div>
      </div>

      <div className="max-md:hidden">
        <ul className="flex items-center">
          <li className=" md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
            <Link to="/">Home</Link>
          </li>
          <li className=" md:pe-5 lg:pe-11 cursor-pointer font-semibold  hover:text-gray-500">
            <Link to="/destinations">Destinations</Link>
          </li>
          <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold  hover:text-gray-500">
            <Link to="/aboutus">About</Link>
          </li>
          <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold  hover:text-gray-500">
            <Link to="/contactus">Contact us</Link>
          </li>
          <li className="md:me-2 cursor-pointer  lg:me-10 font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-sky-800   md:px-3 lg:px-6 py-2">
            <Link to="/login">Login</Link>
          </li>

          <button className="bg-gradient-to-r cursor-pointer from-sky-700 to-sky-950 pt-2 md:px-3 lg:px-6 py-3 rounded-2xl text-white  font-semibold">
            Book Now
          </button>
        </ul>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} >
          <GiHamburgerMenu className="text-2xl " />
        </button>
      </div>

      {isOpen && (
        <div className="fixed z-10 md:hidden ">
          <div className="fixed top-0 right-0 h-full font-semibold z-10 w-full bg-white transition-transform transform">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-5 scroll-m-0 text-red-600 font-extrabold text-3xl"
            >
              &times;
            </button>
            <ul className="flex gap-5 mt-20 flex-col items-start ms-10">
              <li className="text-xl cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="text-xl cursor-pointer">
                <Link to="/destinations">Destinations</Link>
              </li>
              <li className="text-xl cursor-pointer">
                <Link to="/aboutus">About</Link>
              </li>
              <li className="text-xl cursor-pointer">
                <Link to="/contactus">Contact us</Link>
              </li>
              <li className="px-6 cursor-pointer py-2 font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white ">
                <Link to="/login">Login</Link>
              </li>

              <button className="px-6 cursor-pointer py-2 bg-gradient-to-r from-sky-700 to-sky-950 rounded-2xl text-white font-semibold">
                Book Now
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
