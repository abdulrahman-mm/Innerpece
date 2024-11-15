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
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { FacebookShareButton } from 'react-share';

function Featured() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
        setIsWishlisted(response.data.data.wishlists);

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
            metaOgImage.setAttribute("content", `https://backoffice.innerpece.com/${programData.cover_img}` || '');
          }

      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  const currentUrl = window.location.href;
  const metaDescription = apiData?.program_desc || '';

  const handleWishlistClick = async () => {
    const loginDetails = JSON.parse(sessionStorage.getItem("loginDetails"));
    const token = sessionStorage.getItem("loginid");

    if (!loginDetails || !loginDetails.id) {
      console.error("User is not logged in");
      navigate("/login");
      return;
    }

    const { id: user_id } = loginDetails;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("program_id", id);
    formData.append("action", isWishlisted ? "remove" : "add");

    try {
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/add-remove-wishlist",
        formData,
        { headers }
      );

      if (response.status === 201 || response.status === 200) {
        console.log(
          `${isWishlisted ? "Removed from" : "Added to"} wishlist successfully.`
        );
        setIsWishlisted(!isWishlisted);
      } else {
        console.error("Failed to update wishlist.", response);
      }
    } catch (error) {
      console.error("An error occurred while updating wishlist:", error);
    }
  };


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
          <FacebookShareButton
          url={currentUrl}
          quote={metaDescription}
          hashtag="#innerpece"
          >
            <div className="flex items-center cursor-pointer border-2 border-gray-700 rounded-full p-2 gap-2 px-3">
              <img src={share} alt="" />
              <p className="text-gray-700">Share</p>
              
            </div>
            </FacebookShareButton>

            {/* wishlist */}
            <div 
             className="flex items-center cursor-pointer border-2  border-gray-700 rounded-full p-2 gap-2 px-3" 
             onClick={() => handleWishlistClick(id)}
             >
               {isWishlisted ? (
                      <IoHeartSharp />
                    ) : (
                      <IoHeartOutline />
                    )}
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
