import React from "react";
import { useState } from "react";
import mainbarimg1 from "../assets/mainbarimg1.jpg";
import mainbarimg2 from "../assets/mainbarimg2.jpg";
import mainbarimg3 from "../assets/mainbarimg3.jpg";
import mainbarimg4 from "../assets/mainbarimg4.jpg";
import img from "../assets/img.png";
import { FaLocationDot } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineChildCare } from "react-icons/md";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GiHighGrass } from "react-icons/gi";
import { LuWaves } from "react-icons/lu";
import { PiBowlFood } from "react-icons/pi";
import { MdTheaters } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import defaultimage from "../assets/defaultimg.png";


function Mainbar({apiData}) {
  
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  let navigate = useNavigate();


  function onClickView() {
    navigate("/tourdetails");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  return (
    <div className=" pb-52 mt-10 ">
      <div className="flex justify-between md:justify-end ">
        <p
          onClick={() => setFilterButtonClicked(!filterButtonClicked)}
          className={` w-28 text-center py-2 px-2 md:p-2 md:px-6 rounded-lg block md:hidden ${
            filterButtonClicked ? "bg-red-500 text-white" : "bg-gray-300"
          } }`}
        >
          {`${filterButtonClicked ? "Close Filter" : "Filter"}`}
        </p>

        <p className="cursor-pointer border-2 border-sky-800/35 py-2 px-2  text-gray-500 rounded-lg ">
          Sort By : Most Loved{" "}
        </p>
      </div>

      {filterButtonClicked && (
        <div className="mt-5 pb-10 md:hidden ">
          <div className="flex justify-between items-center border-gray-300 border-2 px-6 py-1 rounded-lg rounded-b-none">
            <p className="font-semibold text-xl">Filters</p>
            <p className="cursor-pointer border-gray-300 border-2 p-2 rounded-lg px-6 text-gray-500">
              Reset
            </p>
          </div>

          <div className="border-gray-300 border-2 border-t-0  px-2 py-1">
            <p className="font-semibold">Category</p>

            <div className=" flex flex-wrap gap-4  px-3 py-1">
              <div className="flex gap-3 mt-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="scale-150"
                  checked="true"
                />
                <label htmlFor="">Promo Deals</label>
              </div>

              <div className="flex gap-3 mt-2">
                <input type="checkbox" name="" id="" className="scale-150" />
                <label htmlFor="">One Day Trip</label>
              </div>

              <div className="flex gap-3 mt-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="scale-150"
                  checked="true"
                />
                <label htmlFor="">Top Vacations</label>
              </div>

              <div className="flex gap-3 mt-2">
                <input type="checkbox" name="" id="" className="scale-150 " />
                <label htmlFor="">Things To Do</label>
              </div>
            </div>
          </div>

          <div className="border-gray-300 border-2 border-t-0  px-2 py-1">
            <p className="font-semibold">Date</p>

            <div className="flex items-center border-gray-300 border-2 rounded mt-2">
              <p className="border-gray-300 h-8 w-10 rounded bg-gray-400/40">
                <FaRegCalendar className="ms-3 mt-2" />
              </p>

              <input
                type="date"
                name=""
                id=""
                className="outline-none text-gray-300 ps-2"
                placeholder="dfsf"
              />
            </div>
          </div>

          <div className="border-gray-300 border-2 border-t-0  px-2 py-1">
            <p>
              {" "}
              <span className="text-sky-900">|</span> Filter By Price
            </p>

            <input type="range" className="mt-2 accent-sky-800" />

            <p className="mt-2">Price : ₹3000-₹20,000</p>

            <button className="bg-sky-800 text-white px-8 mt-3 text-sm py=[3px]">
              Filter
            </button>
          </div>

          <div className="border-gray-300 border-2 border-t-0  px-2 py-1">
            <p>Rating</p>

            <div className="flex justify-start gap-4 items-center flex-wrap px-2 py-1">
              <div className="flex items-center gap-1 mt-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="scale-150"
                  checked="true"
                />
                <FaStar className="text-yellow-500" />
                <label htmlFor="">5 Star</label>
              </div>

              <div className="flex items-center gap-1  mt-2">
                <input type="checkbox" name="" id="" className="scale-150" />
                <FaStar className="text-yellow-500" />
                <label htmlFor="">4 Star</label>
              </div>

              <div className="flex items-center gap-1  mt-2">
                <input type="checkbox" name="" id="" className="scale-150" />
                <FaStar className="text-yellow-500" />
                <label htmlFor="">3 Star</label>
              </div>

              <div className="flex items-center gap-1  mt-2">
                <input type="checkbox" name="" id="" className="scale-150 " />
                <FaStar className="text-yellow-500" />
                <label htmlFor="">2 Star</label>
              </div>

              <div className="flex items-center gap-1  mt-2">
                <input type="checkbox" name="" id="" className="scale-150 " />
                <FaStar className="text-yellow-500" />
                <label htmlFor="">1 Star</label>
              </div>
            </div>
          </div>

          <div className="border-gray-300 border-2 border-t-0  px-2 py-1">
            <p className="font-semibold">Activity</p>

            <div className="flex justify-start gap-4 items-center flex-wrap px-2 py-1">
              <div className="flex gap-3 mt-2">
                <input type="checkbox" name="" id="" className="scale-150" />
                <label htmlFor="">Beach</label>
              </div>

              <div className="flex gap-3 mt-2">
                <input type="checkbox" name="" id="" className="scale-150" />
                <label htmlFor="">Club</label>
              </div>

              <div className="flex gap-3 mt-2">
                <input type="checkbox" name="" id="" className="scale-150" />
                <label htmlFor="">Cultural</label>
              </div>

              <div className="flex gap-3 mt-2">
                <input type="checkbox" name="" id="" className="scale-150 " />
                <label htmlFor="">Natural Tourism</label>
              </div>
            </div>
          </div>
        </div>
      )}



      {apiData.map((item, index) => (
        <div key={index} className="flex flex-col mt-10 ">
         
          <div key={index} className="flex  flex-col lg:flex-row mt-11    ">
            <img
              src={item.cover_img ? `https://backoffice.innerpece.com/${item.cover_img}` : defaultimage}
              alt=""
              className="object-cover w-full lg:w-72  bg-center  rounded-none"
            />

            <div className="flex flex-wrap flex-grow   flex-col gap-2 border-2 border-gray-300 py-2 px-3 ">
              <p className="font-semibold flex-wrap text-2xl md:text-3xl">{item.title}</p>

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-sky-800" />
                  <p>{item.location}</p>
                </div>

                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <p>
                    <b className="me-1">5</b>of 5
                  </p>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                <p>Upto 12 guests</p>

                <div className="flex items-center gap-3">
                  <PiStarFourFill className="text-gray-400" />
                  <p>4 rooms</p>
                </div>

                <div className="flex items-center gap-3">
                  <PiStarFourFill className="text-gray-400" />
                  <p>5 baths</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold">Great for:</p>

                <div className="flex items-center gap-2">
                  <IoPeopleSharp className="text-gray-400" />
                  <p>Senior Citizen</p>
                </div>

                <p>|</p>

                <div className="flex items-center gap-2">
                  <MdOutlineChildCare className="text-gray-400" />
                  <p>Kids</p>
                </div>
              </div>

              <div className="border-b border-gray-400"></div>

              <div className="flex justify-start mt-1 gap-2 flex-wrap items-start">
                <div className="flex flex-col  w-14 ">
                  <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                    {" "}
                    <LiaSwimmingPoolSolid className="text-gray-500" />
                  </span>
                  <p className="text-gray-500 text-xs">Swimming pool</p>
                </div>

                <div className="flex flex-col w-14 ">
                  <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                    {" "}
                    <GiHighGrass className="text-gray-500" />
                  </span>
                  <p className="text-gray-500 text-xs">Lawn</p>
                </div>

                <div className="flex flex-col w-14 ">
                  <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                    {" "}
                    <LuWaves className="text-gray-500 " />
                  </span>
                  <p className="text-gray-500 text-xs">Beach View</p>
                </div>

                <div className="flex flex-col w-14 ">
                  <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                    {" "}
                    <PiBowlFood className="text-gray-500" />
                  </span>
                  <p className="text-gray-500 text-xs">Meals</p>
                </div>

                <div className="flex flex-col w-14 ">
                  <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                    {" "}
                    <MdTheaters className="text-gray-500" />
                  </span>
                  <p className="text-gray-500 text-xs">Home Theatre</p>
                </div>

                <p className="text-gray-500">20+</p>
              </div>
            </div>



            <div className="flex flex-wrap  flex-row lg:flex-col items-center justify-between lg:justify-center gap-4  lg:border-s-0 border-t-0 lg:border-t-2 border-2 border-gray-300  px-3 py-2  lg:rounded-lg lg:rounded-s-none rounded-b-none">
              <p className="font-bold text-xl md:text-2xl">₹{item.actual_price}</p>

              <div className="flex border flex-wrap justify-center border-sky-700 py-1 px-4 bg-sky-100/50 rounded-lg  items-center gap-2">
                <IoBedSharp className="text-xl" />
                <p className="text-sm">For 4 Rooms</p>
              </div>

              <p className="text-xs text-gray-500">
                for 32 Nights + Taxes(4 rooms)
              </p>

              <div
                onClick={onClickView}
                className="flex  items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-900 px-5 py-1 lg:px-8 lg:py-2 rounded-lg "
              >
                <p className="text-white cursor-pointer  md:text-xl font-semibold ">
                  View
                </p>
                <FaArrowRight className="text-white" />
              </div>
            </div>
          </div>

          <p className="bg-sky-800/20 w-90vw  text-sm md:text-base rounded-lg py-2 ps-1 md:ps-5 rounded-t-none tracking-widest ">
            RATED BEST FOR ITS AMENITIES AND SERVICE
          </p>
        </div>
      ))}

      <div className="flex gap-2 md:gap-5 mt-16 items-center justify-center">
        <p className="border-2 cursor-pointer text-gray-500 px-5 py-3 rounded-full">
          1
        </p>
        <p className="border-2 cursor-pointer text-gray-500 px-5 py-3 rounded-full">
          2
        </p>
        <p className=" px-[22px] cursor-pointer text-white py-3 rounded-full bg-gradient-to-r from-sky-700 to-sky-900">
          3
        </p>
        <p className="border-2 cursor-pointer text-gray-500 px-5 py-3 rounded-full">
          4
        </p>
      </div>
    </div>
  );
}

export default Mainbar;
