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
        // setIsWishlisted(response.data.data.wishlists);

        document.title = apiData.title || "Default Title";

        const metaOgTitle = document.querySelector("meta[property='og:title']");
          if (metaOgTitle) {
            metaOgTitle.setAttribute("content", apiData.title || "Default Title");
          }

          // console.log('metaogtitle',metaOgTitle);

          const metaOgDescription = document.querySelector("meta[property='og:description']");
          if (metaOgDescription) {
            metaOgDescription.setAttribute("content", apiData.program_desc || "Default description");
          }

          const metaOgImage = document.querySelector("meta[property='og:image']");
          if (metaOgImage) {
            metaOgImage.setAttribute("content", `https://backoffice.innerpece.com/${apiData.cover_img}` || '');
          }

      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    <div className="ms-5 me-5 mt-8 md:ms-20 md:mt-10 md:me-20 w-90vw md:w-[55%] ">
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
