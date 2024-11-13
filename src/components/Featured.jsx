import React from "react";
import hours from "../assets/hours.png";
import guests from "../assets/guests.png";
import locationimg from "../assets/location.png";
import share from "../assets/share.png";
import heart from "../assets/heart.png";
import featuedimg1 from "../assets/featuredimg1.jpg";
import featuedimg2 from "../assets/featuredimg2.jpg";
import featuedimg3 from "../assets/featuredimg3.jpg";
import defaultimage from "../assets/defaultimg.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Featured() {
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
    <div className="mt-32 md:mt-28 ms-5 me-5 md:ms-10 md:me-10  lg:ms-20 lg:me-20">
      <div className="flex flex-col gap-2 md:flex-row flex-wrap justify-between">
        <div className="flex flex-wrap flex-col items-start justify-between gap-4">
          <span className="bg-red-500  text-white px-2">Featured</span>
          <p className="font-semibold text-2xl md:text-4xl">{apiData.title}</p>

          <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              <img src={hours} alt="" className="object-contain" />
              <p className="text-gray-600">5 Hours</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <img src={guests} alt="" className="object-contain" />
              <p className="text-gray-600">{apiData.member_capacity} members</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <img src={locationimg} alt="" className="object-contain" />
              <p className="text-gray-600">
                {apiData.state} {apiData.city} {apiData.country}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap md:flex-col gap-5 ">
          <div className="flex flex-wrap gap-2 md:gap-5">
            <div className="flex items-center cursor-pointer border-2 border-gray-700 rounded-full p-2 gap-2 px-3">
              <img src={share} alt="" />
              <p className="text-gray-700">Share</p>
            </div>
            <div className="flex items-center cursor-pointer border-2  border-gray-700 rounded-full p-2 gap-2 px-3">
              <img src={heart} alt="" />
              <p className="text-gray-700">WishList</p>
            </div>
            <p className="font-semibold flex items-center md:justify-end">
            {`${apiData.total_reviews} ${
              apiData.total_reviews <= 1 ? "Review" : "Reviews"
            }`}
          </p>
          </div>

          

          {/* <div className="flex gap-3 flex-wrap items-center">
            <p className="font-semibold text-sky-800 text-xl md:text-2xl">
              {`INR ${apiData.discount_price}`}
            </p>
            <del className="text-gray-300 md:text-xl">{`INR ${apiData.actual_price}`}</del>
          </div> */}
        </div>
      </div>

      <div className="flex flex-wrap flex-grow  gap-12 justify-start mt-6">
        <img
          src={
            apiData.gallery_img
              ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
              : defaultimage
          }
          alt=""
          className="bg-cover flex-grow h-96 "
        />
        <img
          src={
            apiData.gallery_img
              ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
              : defaultimage
          }
          alt=""
          className="bg-cover flex-grow h-96 "
        />
        <img
          src={
            apiData.gallery_img
              ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
              : defaultimage
          }
          alt=""
          className="bg-cover flex-grow h-96  "
        />
      </div>
    </div>
  );
}

export default Featured;
