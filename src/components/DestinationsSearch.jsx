import React from "react";
import button from "../assets/Button.png";
import Destination_Tour1 from "../assets/Destination_Tour1.png";
import Destination_Tour2 from "../assets/Destination_Tour2.png";
import Destination_Tour3 from "../assets/Destination_Tour3.png";
import Destination_Tour4 from "../assets/Destination_Tour4.png";
import Destination_Tour5 from "../assets/Destination_Tour5.png";
import Destination_Tour6 from "../assets/Destination_Tour6.png";
import Destination_Tour7 from "../assets/Destination_Tour7.png";
import Destination_Tour8 from "../assets/Destination_Tour8.png";
import Destination_Tour9 from "../assets/Destination_Tour9.png";
import OfferDetails from "../assets/OfferDetails.png";

function Search() {
  return (
    <div className="bg-gray-50/50 pt-10">
      <div className="flex  items-center w-fit gap-5 justify-between mx-auto ps-8 pe-1 bg-white  py-1 rounded-full">
        <input
          type="text"
          placeholder="Search"
          className="border-none w-full outline-none "
        />
        <img src={button} alt="" />
      </div>

      <div className="mt-24 overflow-hidden  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ms-3 me-3 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 justify-center gap-3 items-center ">
        <img
          src={Destination_Tour1}
          alt=""
          className="bg-contain overflow-hidden w-full row-span-2 transform transition duration-700 ease-in-out hover:scale-95 "
        />
        <img src={Destination_Tour2} alt="" className="bg-contain w-full cursor-pointer transform transition duration-700 ease-in-out hover:scale-95"  />
        <img src={Destination_Tour3} alt="" className="bg-contain w-full cursor-pointer transform transition duration-300 ease-in-out hover:scale-95" />
        <img src={Destination_Tour4} alt="" className="bg-contain w-full cursor-pointer transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={OfferDetails} alt="" className="bg-contain w-full cursor-pointer transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={Destination_Tour5} alt="" className="bg-contain w-full cursor-pointer transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={Destination_Tour6} alt="" className="bg-contain w-full cursor-pointer transform transition duration-700 ease-in-out hover:scale-95" />
        <img
          src={Destination_Tour9}
          alt=""
          className="bg-contain w-full row-span-2 transform transition duration-700 ease-in-out hover:scale-95"
        />
        <img src={Destination_Tour7} alt="" className="bg-contain w-full transform transition duration-700 ease-in-out hover:scale-95" />
        <img src={Destination_Tour8} alt="" className="bg-contain w-full transform transition duration-700 ease-in-out hover:scale-95" />
      </div>

      {/* <div className="flex items-center justify-center mt-9">
        <button className="bg-sky-800 px-12 rounded-full text-white py-3">Load More</button>
      </div> */}
    </div>
  );
}

export default Search;
