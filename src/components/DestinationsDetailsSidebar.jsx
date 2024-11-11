import React from 'react'
import "./sidebar.css";
import { FaRegCalendar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function DestinationsDetailsSidebar() {
  return (
     <div className="mt-28 pb-10 max-md:hidden  basis-[20%] ">
      <div className="flex justify-between items-center border-gray-300 border-2 px-6 py-5 rounded-lg rounded-b-none">
        <p className="font-semibold text-2xl">Filters</p>
        <p className="cursor-pointer border-gray-300 border-2 p-2 rounded-lg px-6 text-gray-500">
          Reset
        </p>
      </div>

      <div className="border-gray-300 border-2 border-t-0 flex flex-col px-6 py-5">
        <p className="font-semibold">Category</p>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" checked="true" />
          <label htmlFor="">Promo Deals</label>
        </div>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" />
          <label htmlFor="">One Day Trip</label>
        </div>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" checked="true"/>
          <label htmlFor="">Top Vacations</label>
        </div>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150 " />
          <label htmlFor="">Things To Do</label>
        </div>
      </div>

      <div className="border-gray-300 border-2 border-t-0  px-6 py-5">
        <p className="font-semibold">Date</p>

        <div className="flex items-center border-gray-300 border-2 rounded mt-2">
          <p className="border-gray-300 h-8 w-10 rounded bg-gray-400/40">
            <FaRegCalendar className="ms-3 mt-2" />
          </p>

          <input
            type="date"
            name=""
            id=""
            className="date outline-none text-gray-300 ps-2"
          />
        </div>
      </div>

      <div className="border-gray-300 border-2 border-t-0  px-6 py-5">
        <p> <span className="text-sky-900">|</span>  Filter By Price</p>

        <input type="range" className="mt-4 accent-sky-800" />

        <p className="mt-2">Price : ₹3000-₹20,000</p>

        <button className="bg-sky-800 text-white px-8 mt-3 text-sm py=[3px]">
          Filter
        </button>
      </div>

      <div className="border-gray-300 border-2 border-t-0  px-6 py-5">
        <p>Rating</p>

        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" checked="true" />
          <FaStar className="text-yellow-500" />
          <label htmlFor="">5 Star</label>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" />
          <FaStar className="text-yellow-500" />
          <label htmlFor="">4 Star</label>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" />
          <FaStar className="text-yellow-500" />
          <label htmlFor="">3 Star</label>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150 " />
          <FaStar className="text-yellow-500" />
          <label htmlFor="">2 Star</label>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150 " />
          <FaStar className="text-yellow-500" />
          <label htmlFor="">1 Star</label>
        </div>
      </div>

      <div className="border-gray-300 border-2 rounded-lg rounded-t-none border-t-0 flex flex-col px-6 py-5">
        <p className="font-semibold">Activity</p>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" />
          <label htmlFor="">Beach</label>
        </div>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" />
          <label htmlFor="">Club</label>
        </div>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150" />
          <label htmlFor="">Cultural</label>
        </div>

        <div className="flex gap-3 mt-4">
          <input type="checkbox" name="" id="" className="scale-150 " />
          <label htmlFor="">Natural Tourism</label>
        </div>
      </div>
    </div>
  )
}

export default DestinationsDetailsSidebar