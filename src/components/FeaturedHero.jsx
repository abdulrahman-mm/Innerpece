import React from "react";
import vector1 from "../assets/vector1.png";
import vector2 from "../assets/vector2.png";
import vector3 from "../assets/vector3.png";
import vector4 from "../assets/vector4.png";
import vector5 from "../assets/vector5.png";
import defaultimage from "../assets/defaultimg.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Hero() {
  const location = useLocation();
  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = sessionStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload = {
          program_id: id,
          user_id: userDetails?.id || null,
        };

        const response = await axios.post(
          "https://backoffice.innerpece.com/api/get-program-details",
          payload
        );

        setApiData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    <div className="relative ">
      <img
        src={
          apiData.cover_img
            ? `https://backoffice.innerpece.com/${apiData.cover_img}`
            : defaultimage
        }
        alt=""
        className="h-[50vh] md:h-[40vh] lg:h-[50vh] w-full object-cover "
      />
      <div className="absolute  bg-white  -bottom-9 left-1/2 -translate-x-1/2 flex flex-wrap  gap-2 justify-start  md:justify-between rounded-3xl lg:rounded-full px-5 py-3  w-full md:w-4/5 items-center shadow-lg shadow-black/10">
        {" "}
        <div className="flex flex-grow cursor-pointer  gap-2 md:gap-3  px-4 py-3 md:px-6 md:py-4 lg:px-10 lg:py-5 rounded-full items-center">
          <img src={vector1} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Information
          </p>
        </div>
        <div className="flex flex-grow cursor-pointer  px-4 py-3  gap-2 md:gap-3 items-center">
          <img src={vector2} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Tour Planning
          </p>
        </div>
        <div className="flex flex-grow cursor-pointer  px-4 py-3 gap-2 md:gap-3 items-center">
          <img src={vector3} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Location Share
          </p>
        </div>
        <div className="flex flex-grow cursor-pointer  px-4 py-3 gap-2 md:gap-3 items-center">
          <img src={vector4} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Reviews
          </p>
        </div>
        <div className="flex flex-grow  cursor-pointer px-4 py-3 gap-2 md:gap-3 items-center">
          <img src={vector5} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Shot Gallery
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
