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

function Hero({
  handleInformationScroll,
  handleTourPlanningScroll,
  handleLocationShareScroll,
  reviewRefScroll,
}) {
  const location = useLocation();
  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
        // setIsWishlisted(response.data.data.wishlists);

        // document.title = apiData.title || "Default Title";

        const metaOgTitle = document.querySelector("meta[property='og:title']");
        if (metaOgTitle) {
          metaOgTitle.setAttribute("content", apiData.title || "Default Title");
        }

        // console.log('metaogtitle',metaOgTitle);

        const metaOgDescription = document.querySelector(
          "meta[property='og:description']"
        );
        if (metaOgDescription) {
          metaOgDescription.setAttribute(
            "content",
            apiData.program_desc || "Default description"
          );
        }

        // console.log('metadescription',metaOgDescription);

        const metaOgImage = document.querySelector("meta[property='og:image']");
        if (metaOgImage) {
          metaOgImage.setAttribute(
            "content",
            `https://backoffice.innerpece.com/${programData.cover_img}` || ""
          );
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    <div className="relative ">
      {loading ? (
        <div className=" h-[50vh] md:h-[40vh] lg:h-[50vh] w-full bg-gray-400 animate-pulse">
        </div>
      ) : (
        <img
          src={
            apiData.cover_img
              ? `https://backoffice.innerpece.com/${apiData.cover_img}`
              : defaultimage
          }
          alt=""
          className="h-[50vh] md:h-[40vh] lg:h-[50vh] w-full object-cover "
        />
      )}

      <div className="absolute  bg-white  -bottom-9 left-1/2 -translate-x-1/2 flex flex-wrap  gap-2 justify-start  md:justify-between rounded-3xl lg:rounded-full px-3 py-2  w-full md:w-4/5 items-center shadow-lg shadow-black/10">
        {" "}
        <div
          onClick={handleInformationScroll}
          className="flex flex-grow cursor-pointer  gap-2 md:gap-3   py-1 md:px-6 md:py-4 lg:px-10 lg:py-5 rounded-full items-center"
        >
          <img src={vector1} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Information
          </p>
        </div>
        <div
          onClick={handleTourPlanningScroll}
          className="flex flex-grow cursor-pointer   py-1  gap-2 md:gap-3 items-center"
        >
          <img src={vector2} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Tour Planning
          </p>
        </div>
        <div
          onClick={handleLocationShareScroll}
          className="flex flex-grow cursor-pointer   py-1 gap-2 md:gap-3 items-center"
        >
          <img src={vector3} alt="" className="object-contain h-6 md:h-8" />
          <p className="text-sm md:text-base lg:text-lg font-semibold">
            Location Share
          </p>
        </div>
        {apiData.total_reviews > 0 && (
          <div
            onClick={reviewRefScroll}
            className="flex flex-grow cursor-pointer   py-1 gap-2 md:gap-3 items-center"
          >
            <img src={vector4} alt="" className="object-contain h-6 md:h-8" />
            <p className="text-sm md:text-base lg:text-lg font-semibold">
              Reviews
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
