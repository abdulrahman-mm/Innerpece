import React from "react";
import star from "../assets/star.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import defaultimage from "../assets/defaultimg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Swal from "sweetalert2";

function Mainbar({ informationRef, TourPlanningRef, reviewRef }) {
  const location = useLocation();
  let navigate = useNavigate();
  const { id } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const sanitizedHTML = DOMPurify.sanitize(apiData.program_desc);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUrl = window.location.href;
  const metaDescription = apiData?.program_desc || "";
  const [rating, setRating] = useState(""); // Current rating
  const [hover, setHover] = useState(""); // Hovered rating
  const [userReview, setUserReview] = useState("");
  const [date, setDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState();

  const onCLickLoginButton = () => {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

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
          // "https://backoffice.innerpece.com/api/v1/get-program",
          payload
        );

        setApiData(response.data.data);
        // setIsWishlisted(response.data.data.wishlists);
        setLoading(false);

        // document.title = apiData.title || "Default Title";

        // const metaOgTitle = document.querySelector("meta[property='og:title']");
        // if (metaOgTitle) {
        //   metaOgTitle.setAttribute("content", apiData.title || "Default Title");
        // }

        // const metaOgDescription = document.querySelector(
        //   "meta[property='og:description']"
        // );
        // if (metaOgDescription) {
        //   metaOgDescription.setAttribute(
        //     "content",
        //     apiData.program_desc || "Default description"
        //   );
        // }

        // const metaOgImage = document.querySelector("meta[property='og:image']");
        // if (metaOgImage) {
        //   metaOgImage.setAttribute(
        //     "content",
        //     `https://backoffice.innerpece.com/${apiData.cover_img}` || ""
        //   );
        // }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProgramData();
  }, []);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    const storedUserId = localStorage.getItem("loginid");
    setUserId(storedUserId);

    let interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickPostReview = async () => {
    try {
      const payload = {
        user_id: userDetails?.id,
        package_id: id,
        comment: userReview,
        rating: rating,
        created_at: date,
      };

      const authToken = userId;
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/add_review",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

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
            // "https://backoffice.innerpece.com/api/v1/get-program",
            payload
          );

          console.log(response.data.data);

          setApiData(response.data.data);
          setLoading(false);

          const metaOgTitle = document.querySelector(
            "meta[property='og:title']"
          );
          if (metaOgTitle) {
            metaOgTitle.setAttribute(
              "content",
              apiData.title || "Default Title"
            );
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

          const metaOgImage = document.querySelector(
            "meta[property='og:image']"
          );
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
      if (response.data) {
        fetchProgramData();
      }

      setRating("");
      setHover("");
      setUserReview("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Posted",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "w-72 p-4 text-sm", // Tailwind classes
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Write a Review",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "w-72  p-4 text-sm", // Tailwind classes
        },
      });
    }
  };

  return (
    <div className="w-full md:basis-[45%]  xl:basis-[55%] overflow-x-hidden   flex-grow ">
      {loading ? (
        <div className="object-cover mt-3 flex-shrink h-96  w-full bg-gray-500 animate-pulse"></div>
      ) : (
        apiData &&
        apiData.gallery_img && (
          <Carousel
            swipeable={true}
            draggable={true}
            pauseOnHover={false}
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 1441 },
                items: 1,
              },
              desktop: {
                breakpoint: { max: 1440, min: 1024 },
                items: 1,
              },
              tablet: {
                breakpoint: { max: 1024, min: 640 },
                items: 1,
              },
              mobile: {
                breakpoint: { max: 640, min: 0 },
                items: 1,
              },
            }}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={true}
            keyBoardControl={true}
            transitionDuration={1000}
            containerClass="carousel-container mx-auto z-0 w-full"
            itemClass="carousel-item-padding-40-px block shadow-lg shadow-black/10 mt-5"
          >
            {apiData.gallery_img.map((item, index) => (
              <div className=" overflow-x-hidden ">
                <img
                  key={index}
                  src={
                    item
                      ? `https://backoffice.innerpece.com/${item}`
                      : defaultimage
                  }
                  alt={`Gallery Image ${index + 1}`}
                  className="h-[30vh] md:h-[40vh] lg:h-[50vh] w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        )
      )}

      <p className="font-semibold text-2xl mt-8">Highlights</p>
      <p
        className="mt-3 md:leading-7 font-sans"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      ></p>

      {apiData.tour_planning && (
        <div ref={TourPlanningRef} className="mt-8 md:mt-10">
          <p className="font-semibold text-2xl  ">Tour Planning</p>

          {apiData.tour_planning.plan_title.length > 0 && ( // Check for presence and length
            <div>
              {apiData.tour_planning.plan_title.map((title, index) => (
                <div key={index} className="mt-5">
                  <p className="font-semibold text-xl">{title}</p>
                  <p className="font-semibold mt-1 text-xl">
                    {apiData.tour_planning.plan_subtitle[index]}
                  </p>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: apiData.tour_planning.plan_description[index],
                    }}
                    className="font-sans  md:leading-7 "
                  >
                    {/* {apiData.tour_planning.plan_description[index].replace(/<\/?[^>]+(>|$)/g, "")} */}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {apiData.amenity_details &&
        Object.keys(apiData.amenity_details).length > 0 && (
          <div className="border-[1px] px-4 py-3 border-black/40 mt-8 md:mt-10 rounded-3xl">
            <p className="font-semibold text-2xl">Amenities</p>

            <div className="flex flex-wrap flex-col  mt-5">
              <div className="flex  flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.amenity_details).map((key, index) => {
                  const amenity = apiData.amenity_details[key];

                  return (
                    <div className="flex gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${amenity.amenity_pic}`}
                        // alt={amenity.amenity_name}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
                      />
                      <p className="text-lg text-gray-700">
                        {amenity.amenity_name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      {apiData.foodBeverages &&
        Object.keys(apiData.foodBeverages).length > 0 && (
          <div className="border-[1px] px-4 py-3   border-black/40 mt-8 md:mt-10 rounded-3xl">
            <p className="font-semibold text-2xl">Food and Beverages </p>

            <div className="flex  flex-wrap flex-col gap-5 mt-5">
              <div className="flex  flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.foodBeverages).map((key, index) => {
                  const foodBeverage = apiData.foodBeverages[key];

                  return (
                    <div className="flex items-center gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${foodBeverage.food_beverage_pic}`}
                        // alt={foodBeverage.food_beverage_pic}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
                      />
                      <p className="text-lg text-gray-700">
                        {foodBeverage.food_beverage}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      {apiData.activities && Object.keys(apiData.activities).length > 0 && (
        <div className="mt-8 md:mt-10">
          <p className="font-semibold text-2xl ">Activities</p>

          <div className="flex flex-wrap justify-start mt-5 gap-4">
            {Object.keys(apiData.activities).map((key, index) => {
              const activities = apiData.activities[key];

              return (
                <div
                  className="flex flex-col justify-start  items-start border-[1px] gap-3 w-32 md:w-40  border-black/40 p-3 rounded-lg py-3  "
                  key={index}
                >
                  <img
                    src={`https://backoffice.innerpece.com/${activities.activities_pic}`}
                    className="w-6 h-6 bg-cover md:w-7 md:h-7"
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
          <div className="border-[1px] px-4 py-3 w-50vw  border-black/40 mt-8 md:mt-10 rounded-3xl">
            <p className="font-semibold text-2xl">Safety Features</p>

            <div className="flex flex-wrap flex-col gap-5 mt-5">
              <div className="flex flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.safety_features).map((key, index) => {
                  const safety_features = apiData.safety_features[key];

                  return (
                    <div className="flex gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${safety_features.safety_features_pic}`}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
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
      {apiData.payment_policy && (
        <div className="mt-8 md:mt-10  ">
          <p className="font-semibold text-2xl ">Payment Policy</p>

          {apiData.payment_policy.length > 0 && (
            <div className="flex flex-col mt-5 gap-2">
              {apiData.payment_policy.map((item, index) => (
                <p key={index}>
                  <span className="pe-2">{index + 1}.</span>
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
      {apiData.important_info && (
        <div ref={informationRef} className="mt-8 md:mt-10   ">
          <p className="font-semibold text-2xl ">Important Info</p>

          <div>
            <div
              className="mt-5 md:leading-7 font-sans"
              dangerouslySetInnerHTML={{ __html: apiData.important_info }}
            />
          </div>
        </div>
      )}

      <div className="border border-gray-700 flex  flex-col gap-2 rounded-xl ps-5 pe-3 py-3 mt-5">
        <div className="flex ">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              disabled={!userDetails}
              key={star}
              type="button"
              className={`w-8 text-2xl h-8 flex  rounded-full ${
                star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)} // Set rating on click
              onMouseEnter={() => setHover(star)} // Highlight stars on hover
              onMouseLeave={() => setHover(0)} // Reset hover effect
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          disabled={!userDetails}
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          placeholder="Write a Review"
          className="w-full resize-none bg-white h-fit mt-3 placeholder-black text-wrap border-none outline-none"
        />
        <button
          disabled={!userDetails}
          onClick={onClickPostReview}
          className="bg-sky-800 transition-all duration-500 hover:bg-sky-900 text-white rounded-full w-fit h-fit py-1 px-8 "
        >
          Post
        </button>
      </div>

      {!userDetails && (
        <p className="text-red-500 mt-1">
          Please{" "}
          <button
            onClick={onCLickLoginButton}
            className="cursor-pointer hover:underline"
          >
            Login{" "}
          </button>
          {"  "} to add review
        </p>
      )}

      {apiData.reviews && apiData.reviews.length > 0 && (
        <div ref={reviewRef} className="mt-8 md:mt-10">
          <div className="flex flex-wrap flex-col justify-start ">
            <p className="font-semibold text-xl md:text-2xl">
              <span className="me-3">|</span>Client's Review
            </p>

            {/* <div className="mt-5 border-4 h-36 w-36 flex flex-col justify-center items-center border-sky-800 rounded-full">
              <p className="text-sm">Overall Ratings</p>
              <p className="text-sm">
                {apiData.average_rating}
                <span className="ms-1">Out of 5</span>{" "}
              </p>
            </div> */}

            {apiData.reviews.length > 0 && (
              <div className="mt-8  h-96 overflow-y-auto">
                <div className="flex  flex-col-reverse mt-5 gap-5 ">
                  {apiData.reviews.map((item, index) => (
                    <div
                      key={index}
                      className="mx-3 bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <div className="flex  flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          {Array(item.rating)
                            .fill(null)
                            .map((_, i) => (
                              <img
                                key={i}
                                src={star}
                                alt="Star"
                                className="w-4 md:w-5"
                              />
                            ))}
                        </div>

                        <p
                          className="text-gray-600 text-sm md:text-base"
                          dangerouslySetInnerHTML={{
                            __html: item.comment,
                          }}
                        />

                        <p className="text-gray-500 text-xs md:text-sm">
                          {item.date}
                        </p>

                        <hr className="border-black/20 w-full" />

                        <div className="flex gap-3">
                          <img
                            src={`https://backoffice.innerpece.com/${item.profile_image}`}
                            alt="Profile"
                            className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                          />
                          <p className="font-semibold text-lg md:text-xl text-gray-800">
                            {item.first_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* {apiData.client_reviews.map((item, index) => (
                    <div
                      key={index}
                      className="mx-3 bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <div className="flex   flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          {Array(item.rating)
                            .fill(null)
                            .map((_, i) => (
                              <img
                                key={i}
                                src={star}
                                alt="Star"
                                className="w-4 md:w-5"
                              />
                            ))}
                        </div>

                        <p
                          className="text-gray-600 text-sm md:text-base"
                          dangerouslySetInnerHTML={{
                            __html: item.client_review,
                          }}
                        />

                        <p className="text-gray-500 text-xs md:text-sm">
                          {item.review_dt}
                        </p>

                        <hr className="border-black/20 w-full" />

                        <div className="flex gap-3">
                          <img
                            src={`https://backoffice.innerpece.com/${item.client_pic}`}
                            alt="Profile"
                            className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                          />
                          <p className="font-semibold text-lg md:text-xl text-gray-800">
                            {item.client_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainbar;
