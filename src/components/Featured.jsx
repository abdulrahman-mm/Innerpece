import guests from "../assets/guests.png";
import locationimg from "../assets/location.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";


function Featured() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, title } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const currentUrl = window.location.href;
  const metaDescription = apiData?.program_desc || "";
  const [userName, setUserName] = useState("");

  const handleWishlistClick = async () => {
    const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
    const token = localStorage.getItem("loginid");

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
        // console.log(
        //   `${isWishlisted ? "Removed from" : "Added to"} wishlist successfully.`
        // );
        setIsWishlisted(!isWishlisted);
      } else {
        console.error("Failed to update wishlist.", response);
      }
    } catch (error) {
      console.error("An error occurred while updating wishlist:", error);
    }
  };

  const slicedPathName = window.location.pathname.split("/")[1];
  const slicedUserId = window.location.href.split("#")[1];

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = localStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload1 = {
          program_id: id ? id : slicedPathName,
          user_id: userDetails?.id || null,
        };

        const payload2 = {
          program_id: slicedUserId,
        };

        const response = slicedUserId
          ? await axios.post(
              "https://backoffice.innerpece.com/api/v1/specific-program-details",
              payload2
            )
          : await axios.post(
              "https://backoffice.innerpece.com/api/v1/get-program-details",
              payload1
            );

        setApiData(response.data.data);
        setUserName(response.data.data.name);

        setApiData(response.data.data);
        setIsWishlisted(response.data.data.wishlists);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, []);

  return (
    <div className="mt-20 md:mt-28  mx-3 md:mx-10   xl:mx-20 ">
      <div className="flex flex-wrap flex-col items-start justify-between gap-2">
        {userName && (
          <p className="font-medium text-lg font-jakarta bg-gradient-to-r from-[#0E598F] to-[#041A29] text-transparent bg-clip-text ">{`Welcome, ${userName}`}</p>
        )}

        <p className="font-semibold text-2xl md:text-4xl">{apiData.title}</p>

        <div className="flex flex-wrap gap-5">
          {apiData.member_capacity && (
            <div className="flex items-center flex-wrap gap-1">
              <img src={guests} alt="" className="object-contain" />
              <p className="text-gray-600">
                {apiData.member_capacity}{" "}
                {apiData.member_capacity === "1" ? "member" : "members"}
              </p>
            </div>
          )}

          {apiData.current_location && (
            <div className="flex items-center  gap-1">
              <img src={locationimg} alt="" className="object-contain" />
              {/* <p className="text-gray-600">{apiData.current_location}</p> */}

              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: apiData.current_location,
                }}
              />
            </div>
          )}

          {/* {apiData.start_date && apiData.end_date && (
            <div className="flex items-center flex-wrap gap-1">
              <MdDateRange className="inline-block  text-red-600 text-lg md:text-xl" />
              {apiData.start_date} - {apiData.end_date}
            </div>
          )} */}

          <div className="flex flex-row  flex-wrap md:flex-col gap-5 ">
            <div className="flex flex-wrap items-center gap-2 md:gap-5">
              <FacebookShareButton
                url={currentUrl}
                quote={metaDescription}
                hashtag="#innerpece"
              >
                <div className="flex items-center cursor-pointer border-2 hover:bg-[#0965FE]  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full p-2 gap-2 px-3">
                  <FacebookIcon size={22} round={true} />
                  <p>Share</p>
                </div>
              </FacebookShareButton>

              <LinkedinShareButton
                url={currentUrl}
                quote={metaDescription}
                hashtag="#innerpece"
              >
                <div className="flex items-center cursor-pointer border-2 hover:bg-[#0077B5]  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full p-2 gap-2 px-3">
                  <LinkedinIcon size={22} round={true} />
                  <p>Share</p>
                </div>
              </LinkedinShareButton>

              <WhatsappShareButton
                url={currentUrl}
                quote={metaDescription}
                hashtag="#innerpece"
              >
                <div className="flex items-center cursor-pointer border-2 hover:bg-[#25D366]  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200 rounded-full p-2 gap-2 px-3">
                  <WhatsappIcon size={22} round={true} />
                  <p>Share</p>
                </div>
              </WhatsappShareButton>

              {/* wishlist */}
              <div
                className="flex items-center cursor-pointer border-2 hover:bg-red-500  hover:border-white border-gray-700 text-gray-700 hover:text-white transition-all ease-in duration-200  rounded-full p-2 gap-2 px-3"
                onClick={() => handleWishlistClick(id)}
              >
                {isWishlisted ? (
                  <IoHeartSharp className="text-red-300" />
                ) : (
                  <IoHeartOutline />
                )}
                <p>WishList</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
