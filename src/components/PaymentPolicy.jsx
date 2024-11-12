import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PaymentPolicy() {
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
    <div className="ms-5 me-5 mt-14 md:ms-20 md:mt-10 md:me-20 w-90vw md:w-[55%] ">
      <p className="font-semibold text-2xl ">Payment Policy</p>

      {apiData.payment_policy && apiData.payment_policy.length > 0 && (
        <div className="flex flex-col mt-5 gap-5">
          {apiData.payment_policy.map((item, index) => (
            <p key={index}>
              <span className="pe-2">{index + 1}.</span>
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentPolicy;
