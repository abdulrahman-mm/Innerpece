import React from "react";
import whatsapp from "../assets/whatsapp.png";
import telegram from "../assets/telegram.png";
import customerservice from "../assets/customerservice.png";
import approve from "../assets/approve.png";
import insurance from "../assets/insurance.png";
import pricetag from "../assets/pricetag.png";
import calendar from "../assets/featuredCalender.png";
import map from "../assets/featuredmap.png";

function Sidebar() {
  return (
    <div className=" w-full lg:basis-[22%] xl:basis-[25%] flex-grow mt-3 md:mt-7">
      <div className="flex flex-col p-3 shadow-md bg-white shadow-black/10 rounded-lg items-center gap-y-4 gap-2">
        <span className="text-gray-600 ">
          Starting Form <del>INR 28000</del>{" "}
        </span>
        <p className="text-green-800 font-semibold text-2xl">INR 25000</p>

        <div className="border-t-2 border-dotted w-full border-sky-800"></div>

        <span className="bg-sky-800 -mt-8 px-16 py-1  text-sm rounded-full text-white font-bold">
          Per Person
        </span>

        <div className="flex flex-wrap justify-center gap-4 pb-4">
          <div className="flex cursor-pointer flex-wrap flex-grow md:flex-grow-0 bg-green-600 px-3 py-1 items-center rounded-lg gap-2">
            <img src={whatsapp} alt="" />
            <p className="text-white font-semibold">Whatsapp</p>
          </div>

          <div
            style={{ backgroundColor: "#EC3B63" }}
            className="flex flex-wrap cursor-pointer flex-grow md:flex-grow-0 px-4 py-2 items-center rounded-lg gap-2"
          >
            <img src={telegram} alt="" />
            <p className="text-white font-semibold">Send Enquiry</p>
          </div>
        </div>
      </div>

      <div className="shadow-md mt-10 shadow-black/10 rounded-lg">

      <div className="flex gap-4 mt-3 ms-3">
            <p className="text-sky-800">|</p>
            <p className="font-semibold">Book With Confidence</p>
          </div>

        <div className="flex flex-wrap  items-start mt-10 justify-between md:flex-col p-5   gap-y-4 gap-2">
         

          <div className="flex gap-4 items-center">
            <img src={customerservice} alt="" />
            <p>Customer care available 24/7</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={approve} alt="" />
            <p>Hand-picked Tours & Activities</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={insurance} alt="" />
            <p>Free Travel Insurance</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={pricetag} alt="" />
            <p>No-hassle best price guarantee</p>
          </div>
        </div>
      </div>

      <img src={calendar} alt="" className="mt-10  w-screen" />

      <p className="font-semibold mt-10">Where you'll be</p>
      <img src={map} alt="" className="mt-5 w-screen" />
    </div>
  );
}

export default Sidebar;
