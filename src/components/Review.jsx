import React from "react";
import star from "../assets/star.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Review({reviewRef}) {
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

        // document.title = apiData.title || "Default Title";

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
    // <div ref={reviewRef} className="ms-5 me-5 mt-16 md:ms-20 md:me-20 md:mt-12">
    //   {apiData.client_reviews &&
    //     apiData.client_reviews.length > 0 &&
    //     apiData.client_reviews.map((item, index) => (
    //       <div key={index} className="flex flex-wrap gap-16">
    //         <div className="flex w-90vw md:basis-[60%] flex-wrap flex-grow flex-col justify-start gap-16">
    //           <div className="flex flex-col gap-4 mb-5 md:flex-row justify-between">
    //             <p className="font-semibold text-xl md:text-2xl">
    //               <span className="me-3">|</span>Client's Review
    //             </p>

    //             <div className="flex gap-5 items-center">
    //               <p className=" text-lg">{` ${apiData.total_reviews} ${
    //                 apiData.total_reviews > 2 ? "Reviews" : "Review"
    //               }`}</p>
    //               <div className="flex flex-col">
    //                 <div className="flex gap-2 text-lg font-semibold justify-between">
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div key={index} className="flex gap-5 w-90vw md:w-3/4 pb-12">
    //             <img
    //               src={`https://backoffice.innerpece.com/${item.client_pic}`}
    //               alt=""
    //               className="w-[60px] h-[60px] md:w-[76px] md:h-[76px] rounded-full"
    //             />

    //             <div className="flex flex-col gap-4">
    //               <p className="font-semibold text-lg">{item.client_name}</p>
    //               <p className="text-gray-500 ">{item.client_review}</p>
    //               <div className="flex gap-x-5">
    //                 <div className="flex gap-1">
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                   <img src={star} alt="" className="object-contain w-4" />
    //                 </div>

    //                 <p className="font-semibold">{item.rating}</p>
    //               </div>

    //               <div>
    //                 <p className="text-gray-500">{item.review_dt}</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className=" flex-grow md:basis-[30%] flex flex-col justify-start gap-16">
    //           <p className="font-semibold">
    //             {apiData.average_rating} <span className="ms-1">Out of 5</span>{" "}
    //           </p>

    //           <div className="mx-auto border-8 h-48 w-48 flex flex-col justify-center items-center border-sky-800 rounded-full">
    //             <p>Overall Ratings</p>
    //             <p className="font-semibold text-2xl text-sky-800">4.8</p>
    //             <p>
    //               {apiData.average_rating}{" "}
    //               <span className="ms-1">Out of 5</span>{" "}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    // </div>

    <div>

    </div>
  );
}

export default Review;
