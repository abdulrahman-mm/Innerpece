import React from "react";
import guests from "../assets/guests.png";
import locationimg from "../assets/location.png";
import share from "../assets/share.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { FacebookShareButton } from "react-share";
import { MdDateRange } from "react-icons/md";


function Featured() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentUrl = window.location.href;
  const metaDescription = apiData?.program_desc || "";
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0); // Default to the first image

  const handleWishlistClick = async () => {
    const loginDetails = JSON.parse(sessionStorage.getItem("loginDetails"));
    const token = sessionStorage.getItem("loginid");

    if (!loginDetails || !loginDetails.id) {
      console.error("User is not logged in");
      navigate("/login");
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
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
          "https://backoffice.innerpece.com/api/v1/get-program-details",
          payload
        );

        setApiData(response.data.data);
        setIsWishlisted(response.data.data.wishlists);
        setLoading(false);

        // document.title = apiData.title || "Default Title";

        const metaOgTitle = document.querySelector("meta[property='og:title']");
        if (metaOgTitle) {
          metaOgTitle.setAttribute("content", apiData.title || "Default Title");
        }

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
            `https://backoffice.innerpece.com/${apiData.cover_img}` || ""
          );
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, [id]);

  console.log(apiData);
  

  return (
    <div className="mt-20 md:mt-28 ms-5 me-5 md:ms-10 md:me-10  lg:ms-20 lg:me-20">
      <div className="flex flex-col gap-2 md:flex-row flex-wrap justify-between">
        <div className="flex flex-wrap flex-col items-start justify-between gap-4">
          <span className="bg-red-500  text-white px-2">Featured</span>
          <p className="font-semibold text-2xl md:text-4xl">{apiData.title}</p>

          <div className="flex flex-wrap gap-3">
            {/* <div className="flex flex-wrap gap-2">
              <img src={hours} alt="" className="object-contain" />
              <p className="text-gray-600">5 Hours</p>
            </div> */}

            {apiData.member_capacity && (
              <div className="flex items-center flex-wrap gap-2">
                <img src={guests} alt="" className="object-contain" />
                <p className="text-gray-600">
                  {apiData.member_capacity}{" "}
                  {apiData.member_capacity === "1" ? "member" : "members"}
                </p>
              </div>
            )}

            {apiData.state && apiData.city && apiData.country && (
              <div className="flex items-center flex-wrap gap-2">
                <img src={locationimg} alt="" className="object-contain" />
                <p className="text-gray-600">
                  {apiData.city}, {apiData.state}, {apiData.country}
                </p>
              </div>
            )}

            {apiData.start_date && (
              <div className="flex items-center flex-wrap gap-2">
                      <MdDateRange className="inline-block  text-red-600 text-lg md:text-xl" />
                      {apiData.start_date}

              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row  flex-wrap md:flex-col gap-5 ">
          <div className="flex flex-wrap items-center gap-2 md:gap-5">
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
              {isWishlisted ? <IoHeartSharp /> : <IoHeartOutline />}
              <p className="text-gray-700">WishList</p>
            </div>

            {apiData.total_reviews >= 1 && apiData.total_reviews && (
              <p className="font-semibold flex items-center md:justify-end">
                {`${apiData.total_reviews} ${
                  apiData.total_reviews > 2 ? "Reviews" : "Review"
                }`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* {loading ? (
        <div className="object-cover mt-3 flex-shrink h-96  md:w-52 lg:w-64 xl:w-80 bg-gray-400 animate-pulse"></div>
      ) : (
        <div className="mt-5">
          {apiData && apiData.gallery_img && (
            <div className="flex max-md:hidden flex-wrap overflow-hidden">
              {apiData.gallery_img.map((item, index) => (
                <img
                  key={index}
                  src={
                    apiData.gallery_img
                      ? `https://backoffice.innerpece.com/${item}`
                      : defaultimage
                  }
                  alt=""
                  className={`object-cover cursor-pointer h-96 transition-all ease-in-out duration-700 ${
                    activeImage === index ? "w-[30%] scale-105" : "w-[5%]"
                  } hover:w-[30%] hover:scale-105`}
                  onMouseEnter={() => setActiveImage(index)} // Set the hovered image as active
                />
              ))}
            </div>
          )}
        </div>
      )}

      {apiData && apiData.gallery_img && (
        <Carousel
          swipeable={true}
          draggable={true}
          pauseOnHover={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          arrows={true}
          keyBoardControl={true}
          transitionDuration={1000}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px   block md:hidden shadow-lg shadow-black/10 mt-5"
        >
          {apiData.gallery_img.map((item, index) => (
            <img
              key={index}
              src={
                item ? `https://backoffice.innerpece.com/${item}` : defaultimage
              }
              alt={`Gallery Image ${index + 1}`}
              className="h-72  w-full object-cover"
            />
          ))}
        </Carousel>
      )} */}
    </div>
  );
}

export default Featured;

// className={`object-cover flex-shrink h-96  md:w-52 lg:w-64 xl:w-80`}
