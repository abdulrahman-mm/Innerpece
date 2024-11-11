import React from "react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate=useNavigate()

  return (
    <div className="flex justify-between items-center w-full px-10 py-3 bg-black text-white backdrop:blur-lg shadow-2xl shadow-white">
      <div onClick={()=>navigate('/')} className="cursor-pointer">
        <p className="text-2xl md:text-3xl lg:text-4xl leading-none font-semibold">
          Innerpece
        </p>
        <div className="flex justify-end">
          <p className="text-[10px] md:text-xs italic leading-none me-3">
            More Travel{" "}
          </p>
          <p className="text-[10px] md:text-xs italic ps-0 lg:ps-6 leading-none">
            {" "}
            More Peace
          </p>
        </div>
      </div>

      <div className="max-md:hidden">
        <ul className="flex items-center ">
          <li className="md:pe-4 lg:pe-10 cursor-pointer hover:text-gray-500"><Link to="/">Home</Link></li>
          <li className="md:pe-4 lg:pe-10 cursor-pointer hover:text-gray-500"><Link to="/destinations">Destinations</Link></li>
          <li className="md:pe-4 lg:pe-10 cursor-pointer hover:text-gray-500"><Link to="/aboutus">About</Link></li>
          <li className="md:pe-4 lg:pe-10 cursor-pointer hover:text-gray-500"><Link to="/contactus">Contact us</Link></li>
          <li className="md:pe-4 lg:pe-10 cursor-pointer hover:text-gray-500">Community</li>
          <button
            style={{ backgroundColor: "#DBF056" }}
            className=" text-green-800 pt-2 px-3 lg:px-8 py-2 rounded-2xl font-semibold"
          >
            Book an event
          </button>
        </ul>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu className="text-2xl"/>
        </button>
      </div>

      {isOpen && (
        <div className="fixed z-10 md:hidden">
          <div className="fixed top-0 right-0 h-full font-semibold z-10 w-full bg-white transition-transform transform">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-10 scroll-m-0 text-red-600 font-extrabold text-3xl"
            >
              &times;
            </button>
            <ul className="flex gap-5 mt-20 flex-col items-start ms-10">
              <li className=" text-black text-xl cursor-pointer" ><Link to='/'>Home</Link></li>
              <li className=" text-black text-xl cursor-pointer"><Link to="/destinations">Destinations</Link></li>
              <li className=" text-black text-xl cursor-pointer"><Link to='/aboutus'>About</Link></li>
              <li className=" text-black text-xl cursor-pointer"><Link to="/contactus">Contact us</Link></li>
              <li className=" text-black text-xl cursor-pointer">Community</li>
              <button
                style={{ backgroundColor: "#DBF056" }}
                className=" text-green-800 pt-2 px-8 py-2 rounded-2xl font-semibold"
              >
                Book an event
              </button>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
