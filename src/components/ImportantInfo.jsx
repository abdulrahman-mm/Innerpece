import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ImportantInfo() {
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
    <div className="ms-5  me-5 mt-14 md:ms-20 md:mt-10 md:me-20 w-90vw md:w-[55%] ">
      <p className="font-semibold text-2xl ">Important Info</p>

      {apiData.important_info && (
        <p className="mt-3">{apiData.important_info}</p>
      )}
    </div>
  );
}

export default ImportantInfo;
