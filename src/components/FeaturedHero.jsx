import React from "react";
import vector1 from "../assets/vector1.svg";
import vector2 from "../assets/vector2.svg";
import vector3 from "../assets/vector3.svg";
import vector4 from "../assets/vector4.svg";
import defaultimage from "../assets/defaultimg.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

function Hero({
  handleInformationScroll,
  handleTourPlanningScroll,
  handleLocationShareScroll,
  reviewRefScroll,
}) {
  useEffect(() => {
    document.title = "Tour Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount
  const location = useLocation();

  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ogImage, setOgImage] = useState("");

  const pathName = window.location.pathname;
  const slicedPathName = pathName.slice(1, 3);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");
        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload = {
          program_id: id ? id : slicedPathName,
          user_id: userDetails?.id || null,
        };

        const response = await axios.post(
          "https://backoffice.innerpece.com/api/v1/get-program-details",
          payload
        );

        setApiData(response.data.data);
        setOgImage(response.data.data.cover_img);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, []);

  useEffect(() => {
    const metaTag = document.querySelector("meta[property='og:image']");
    if (metaTag) {

      metaTag.content = apiData?.cover_img
        ? `https://backoffice.innerpece.com/${apiData.cover_img}`
        : "default-image-url";

    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute("property", "og:image");
      newMetaTag.content = apiData?.cover_img
        ? `https://backoffice.innerpece.com/${apiData.cover_img}`
        : "default-image-url";
      document.head.appendChild(newMetaTag);
    }
  }, [apiData]);

  return (
    <div className="relative ">
      <Helmet>
        <meta
          property="og:image"
          content={
            apiData.cover_img
              ? `https://backoffice.innerpece.com/${apiData.cover_img}`
              : defaultimage
          }
        />
      </Helmet>

      {loading ? (
        <div className=" h-[50vh] md:h-[40vh] lg:h-[50vh] w-full bg-gray-500 animate-pulse"></div>
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

      <div className="absolute  bg-white  -bottom-9 left-1/2 -translate-x-1/2 flex flex-wrap  gap-2 justify-start  md:justify-between rounded-3xl lg:rounded-full px-3 py-3 md:py-4  w-full md:w-11/12 lg:w-4/5 items-center shadow-lg shadow-black/10">
        {" "}
        <div
          onClick={handleInformationScroll}
          className="flex flex-grow cursor-pointer  gap-2 md:gap-3   py-1  items-center"
        >
          <img
            src={vector1}
            alt={apiData.title}
            className="object-contain h-6 md:h-8"
          />
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
        {apiData.review_count > 0 && (
          <div
            onClick={reviewRefScroll}
            className="flex flex-grow cursor-pointer   py-1 gap-2 md:gap-3 items-center"
          >
            <img src={vector4} alt="" className="object-contain h-6 md:h-8" />
            <p className="text-sm md:text-base lg:text-lg font-semibold">
              <span className="text-sky-800">{apiData.review_count}</span>{" "}
              Reviews
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
