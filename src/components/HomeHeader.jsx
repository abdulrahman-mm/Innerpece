// import React from "react";
// import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import innerpece_logo from "../assets/innerpece_logo.svg";

// function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   let navigate = useNavigate();

//   return (
//     <div className="flex justify-between items-center px-5 md:px-11 py-3">
//       <div onClick={() => navigate("/")} className="cursor-pointer">
//         <img src={innerpece_logo} alt="" />
//       </div>

//       <div className="max-md:hidden">
//         <ul className="flex items-center">
//           <li className=" md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
//             <Link to="/">Home</Link>
//           </li>
//           <li className=" md:pe-5 lg:pe-11 cursor-pointer font-semibold  hover:text-gray-500">
//             <Link to="/destinations">Destinations</Link>
//           </li>
//           <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold  hover:text-gray-500">
//             <Link to="/aboutus">About</Link>
//           </li>
//           <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold  hover:text-gray-500">
//             <Link to="/contactus">Contact us</Link>
//           </li>
//           <li className="md:me-2 cursor-pointer  lg:me-10 font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-blue-700 hover:border-blue-700   md:px-3 lg:px-6 py-2">
//             <Link to="/login">Login</Link>
//           </li>

//           {/* <button className="bg-gradient-to-r cursor-pointer from-sky-700 to-sky-950 pt-2 md:px-3 lg:px-6 py-3 rounded-2xl text-white  font-semibold">
//             Book Now
//           </button> */}
//         </ul>
//       </div>

//       <div className="md:hidden">
//         <button onClick={() => setIsOpen(!isOpen)}>
//           <GiHamburgerMenu className="text-2xl " />
//         </button>
//       </div>

//       {isOpen && (
//         <div className="fixed z-10  md:hidden ">
//           <div className="fixed top-0 right-0  h-[100vh] py-10 transition-all ease-in-out duration-500  font-semibold z-10 w-full bg-white ">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-1 right-5 scroll-m-0 text-red-600 font-extrabold text-3xl"
//             >
//               &times;
//             </button>
//             <ul className="flex gap-5 mt-20 flex-col items-start ms-10">
//               <li className="text-xl cursor-pointer">
//                 <Link to="/">Home</Link>
//               </li>
//               <li className="text-xl cursor-pointer">
//                 <Link to="/destinations">Destinations</Link>
//               </li>
//               <li className="text-xl cursor-pointer">
//                 <Link to="/aboutus">About</Link>
//               </li>
//               <li className="text-xl cursor-pointer">
//                 <Link to="/contactus">Contact us</Link>
//               </li>
//               <li className="px-6 cursor-pointer py-2 font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white ">
//                 <Link to="/login">Login</Link>
//               </li>

//               {/* <button className="px-6 cursor-pointer py-2 bg-gradient-to-r from-sky-700 to-sky-950 rounded-2xl text-white font-semibold">
//                 Book Now */}
//               {/* </button> */}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;


import React, { useState,useEffect } from "react";
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
    <div className="flex justify-between items-center px-5 md:px-11 py-3">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src={innerpece_logo} alt="" />
      </div>

      <div className="max-md:hidden">
        <ul className="flex items-center">
          <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
            <Link to="/">Home</Link>
          </li>
          <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
            <Link to="/destinations">Destinations</Link>
          </li>
          <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
            <Link to="/aboutus">About</Link>
          </li>
          <li className="md:pe-5 lg:pe-11 cursor-pointer font-semibold hover:text-gray-500">
            <Link to="/contactus">Contact us</Link>
          </li>
          <li className="md:me-2 cursor-pointer  lg:me-10 font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white hover:text-white hover:bg-blue-700 hover:border-blue-700   md:px-3 lg:px-6 py-2">
         <Link to="/login">Login</Link>
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
            <Link to="/destinations" onClick={() => setIsOpen(false)}>
              Destinations
            </Link>
          </li>
          <li className="text-xl cursor-pointer">
            <Link to="/aboutus" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="text-xl cursor-pointer">
            <Link to="/contactus" onClick={() => setIsOpen(false)}>
              Contact us
            </Link>
          </li>
          <li className="px-6 py-2 cursor-pointer font-semibold border-sky-800 border-2 rounded-2xl text-sky-800 bg-white">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
        
      </div>
    </div>
  );
}

export default Header;
