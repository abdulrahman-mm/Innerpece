import React from "react";
import Tourplanning from "../assets/tourplanning.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TourPlanning() {
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
    <div className="ms-5 me-5 w-90vw md:ms-20 md:me-20 mt-10 md:w-2/3">
      <p className="font-semibold text-2xl ">Tour Planning</p>

      {apiData.tour_planning &&
        apiData.tour_planning.plan_title.length > 0 && ( // Check for presence and length
          <div>
            {apiData.tour_planning.plan_title.map((title, index) => (
              <div key={index} className="mt-5">
                <p className="font-semibold text-xl">{title}</p>
                <p className="font-semibold text-xl">
                  {apiData.tour_planning.plan_subtitle[index]}
                </p>

                <p
                  dangerouslySetInnerHTML={{
                    __html: apiData.tour_planning.plan_description[index],
                  }}
                >
                  {/* {apiData.tour_planning.plan_description[index].replace(/<\/?[^>]+(>|$)/g, "")} */}
                </p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

{
  /* <h2
className="paras"
dangerouslySetInnerHTML={{
  __html: programDetails.program_desc,
}}
/> */
}

export default TourPlanning;
