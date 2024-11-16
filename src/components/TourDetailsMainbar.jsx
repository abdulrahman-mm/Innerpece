import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useref } from "react";
import axios from "axios";

function Mainbar() {
  const location = useLocation();
  const { id } = location.state || {};
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
        // setIsWishlisted(response.data.data.wishlists);

        document.title = apiData.title || "Default Title";

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

        const metaOgImage = document.querySelector("meta[property='og:image']");
        if (metaOgImage) {
          metaOgImage.setAttribute(
            "content",
            `https://backoffice.innerpece.com/${programData.cover_img}` || ""
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    <div className="lg:basis-[45%] xl:basis-[55%] flex-grow ">
      <p className="font-semibold text-2xl">Property Highlights</p>
      <p
        className="mt-5 text-gray-600 leading-7 "
        dangerouslySetInnerHTML={{
          __html: apiData.program_desc,
        }}
      ></p>

      <p className="text-sm font-semibold ms-3 mt-2 cursor-pointer">
        Read More{" "}
        <span>
          <MdOutlineKeyboardArrowDown className="inline-block" />
        </span>{" "}
      </p>

      {apiData.amenity_details &&
        Object.keys(apiData.amenity_details).length > 0 && (
          <div className="border-[1px] px-4 py-3 border-black/40 mt-14 rounded-3xl">
            <p className="font-semibold text-2xl">Amenities</p>

            <div className="flex flex-wrap flex-col gap-5 mt-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Object.keys(apiData.amenity_details).map((key, index) => {
                  const amenity = apiData.amenity_details[key];

                  return (
                    <div className="flex gap-5 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${amenity.amenity_pic}`}
                        // alt={amenity.amenity_name}
                      />
                      <p className="text-lg text-gray-700">
                        {amenity.amenity_name}
                      </p>
                    </div>
                  );
                })}
              </div>

              <span className="text-sm font-semibold ms-3 cursor-pointer">
                More Details{" "}
                <span>
                  <MdOutlineKeyboardArrowDown className="inline-block" />
                </span>{" "}
              </span>
            </div>
          </div>
        )}

      {apiData.foodBeverages &&
        Object.keys(apiData.foodBeverages).length > 0 && (
          <div className="border-[1px] px-4 py-3   border-black/40 mt-14 rounded-3xl">
            <p className="font-semibold text-2xl">Food and Beverages </p>

            <div className="flex  flex-wrap flex-col gap-5 mt-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Object.keys(apiData.foodBeverages).map((key, index) => {
                  const foodBeverage = apiData.foodBeverages[key];

                  return (
                    <div className="flex gap-5 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${foodBeverage.food_beverage_pic}`}
                        // alt={foodBeverage.food_beverage_pic}
                        className="bg-contain"
                      />
                      <p className="text-lg text-gray-700">
                        {foodBeverage.food_beverage}
                      </p>
                    </div>
                  );
                })}
              </div>

              <span className="text-sm font-semibold ms-3 cursor-pointer">
                More Details{" "}
                <span>
                  <MdOutlineKeyboardArrowDown className="inline-block" />
                </span>{" "}
              </span>
            </div>
          </div>
        )}

      {apiData.activities && Object.keys(apiData.activities).length > 0 && (
        <div className="mt-14">
          <p className="font-semibold text-2xl ms-4">Activities</p>

          <div className="flex flex-wrap justify-start mt-5 gap-4">
            {Object.keys(apiData.activities).map((key, index) => {
              const activities = apiData.activities[key];

              return (
                <div
                  className="flex flex-col justify-start  items-start border-[1px] gap-3 w-32 md:w-40  border-black/40 p-3 rounded-lg py-5  "
                  key={index}
                >
                  <img
                    src={`https://backoffice.innerpece.com/${activities.activities_pic}`}
                    // alt={foodBeverage.food_beverage_pic}
                    className="bg-contain "
                  />
                  <p className="text-lg text-gray-700">
                    {activities.activities}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {apiData.safety_features &&
        Object.keys(apiData.safety_features).length > 0 && (
          <div className="border-[1px] px-4 py-3 w-50vw  border-black/40 mt-14 rounded-3xl">
            <p className="font-semibold text-2xl">Safety Features</p>

            <div className="flex flex-wrap flex-col gap-5 mt-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {Object.keys(apiData.safety_features).map((key, index) => {
                  const safety_features = apiData.safety_features[key];

                  return (
                    <div className="flex gap-5 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${safety_features.safety_features_pic}`}
                        // alt={foodBeverage.food_beverage_pic}
                        className="bg-contain"
                      />
                      <p className="text-lg text-gray-700">
                        {safety_features.safety_features}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Mainbar;
