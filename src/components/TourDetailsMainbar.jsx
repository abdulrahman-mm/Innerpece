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
import ReCAPTCHA from "react-google-recaptcha";
import default_user_image from "../assets/default_user_image.png";
import default_user_image2 from "../assets/default_user_image_2.jpg";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";

function Mainbar({
  highlightsRef,
  informationRef,
  TourPlanningRef,
  reviewRef,
}) {
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
  const [yearMonthDate, setYearMonthDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState();
  const [loginCliked, setLoginClicked] = useState(false);

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

        // const response = await axios.post(
        //   "https://backoffice.innerpece.com/api/v1/get-program-details",
        //   payload
        // );

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

        const cleanedText = response.data.data.important_info
          .split("·") // Split by bullet point
          .map((line) => line.replace(/\s+/g, " ").trim()) // Remove extra spaces and trim
          .filter(Boolean) // Remove empty lines
          .map((line) => `· ${line}`) // Re-add clean bullets
          .join("\n");

        // setIsWishlisted(response.data.data.wishlists);
        setLoading(false);
        // console.log(apiData.reviews);

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
      // setYearMonthDate(new Date());
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setYearMonthDate(formattedDate);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickPostReview = async () => {
    try {
      const payload = {
        user_id: userDetails?.id,
        package_id: id ? id : slicedPathName,
        comment: userReview,
        rating: rating,
        created_at: date,
        review_dt: yearMonthDate,
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

  const handleLoginClick = () => {
    setLoginClicked(true);
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginCheckboxChecked, setLoginCheckBoxChecked] = useState("");
  const [loginError, setLoginError] = useState({});

  function onClickBtn() {
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "loginEmail") {
      setLoginEmail(value);
    }

    if (name === "loginPassword") {
      setLoginPassword(value);
    }

    if (name === "checkbox") {
      setLoginCheckBoxChecked(loginCheckboxChecked ? "" : "checkbox checked");
    }
  }

  async function onClickSignIn() {
    try {
      let response = await axios.post(
        // `https://backoffice.innerpece.com/api/login`,
        `https://backoffice.innerpece.com/api/v1/login`,
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      const loginid = response.data.token;
      const loginDetails = response.data.user_details;

      localStorage.setItem("loginid", loginid);
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setLoginClicked(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);

      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
    }
  }

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalReviews = apiData?.reviews?.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = apiData?.reviews?.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const cleanHTML = (htmlString) => {
    const sanitizedHTML = DOMPurify.sanitize(htmlString);

    const cleaned = sanitizedHTML
      .replace(/<span[^>]*>|<\/span>/gi, "")
      .replace(/<o:p>|<\/o:p>/gi, "")
      .replace(/style="[^"]*"/gi, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/<p[^>]*>/gi, "")
      .replace(/<\/p>/gi, "")
      .replace(/·\s*/g, "<li>") // convert bullets to list items
      .trim();

    return cleaned;
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  
  return (
    <div className="w-full md:basis-[45%] bg-[#FEFEFE] xl:basis-[55%] overflow-x-hidden font-mulish  flex-grow ">
      {apiData && apiData.gallery_img && (
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
          containerClass="carousel-container mx-auto z-0 w-full object-cover rounded-xl mt-5"
          itemClass="carousel-item-padding-40-px block shadow-lg   object-cover shadow-black/10 "
        >
          {apiData.gallery_img.map((item, index) => (
            <div key={item.id || index} className="overflow-hidden">
              <img
                src={
                  item
                    ? `https://backoffice.innerpece.com/${item}`
                    : defaultimage
                }
                alt={`Gallery Image ${index + 1}`}
                className="h-[30vh]  lg:h-[440px] w-full object-cover "
              />
            </div>
          ))}
        </Carousel>
      )}

      {apiData.program_desc && (
        <>
          <div
            ref={highlightsRef}
            className="flex gap-2 mt-8 md:mt-10 items-center"
          >
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Highlights
            </p>
          </div>

          <p
            className=" mt-3 md:mt-5  "
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          ></p>
        </>
      )}

      {apiData.tour_planning && (
        <div ref={TourPlanningRef} className="mt-8 md:mt-10">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Tour Planning
            </p>
          </div>

          <div className="mt-3 md:mt-5 flex flex-col gap-2">
            {apiData.tour_planning.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className=" pb-2">
                  <button
                    onClick={() => toggleIndex(index)}
                    className="w-full flex justify-between items-center text-left font-mulish text-[#0E598F] font-semibold focus:outline-none"
                  >
                    <div className="flex gap-2 items-center">
                      <span>{item.title}</span>
                      {/* <p className="border-black font-semibold border-2 h-4"></p> */}
                      <p className="text-black font-medium">{item.subtitle}</p>
                    </div>
                    <FaChevronDown
                      className={`transition-transform text-black duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden mt-2 transition-all duration-700 ease-out ${
                      isOpen ? " opacity-100 min-h-20" : "max-h-0 opacity-0"
                    }`}
                  >
                    {/* <p className="text-[#0D3756] font-normal">{item.description}</p> */}
                    <p  dangerouslySetInnerHTML={{
                              __html: item.description ?? "",
                            }}/>
                  </div>
                </div>
              );
            })}

           
            {/* {Object.keys(apiData.tour_planning).map((key, index) => {
              const item = apiData.tour_planning[key];
              const isOpen = openIndex === index;

              return (
                <div key={key} className="pb-2">
                  <button
                    onClick={() => toggleIndex(index)}
                    className="w-full flex justify-between items-center text-left font-mulish text-[#0E598F] font-semibold focus:outline-none"
                  >
                    <div className="flex gap-2 items-center flex-wrap">
                      <span>{item.title}</span>
                      <p className="border-black font-semibold border-2 h-4"></p>
                      <p className="text-black font-medium">{item.subtitle}</p>
                    </div>
                    <FaChevronDown
                      className={`transition-transform text-black duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isOpen ? " opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[#0D3756] font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      )}

      {apiData.amenity_details &&
        Object.keys(apiData.amenity_details).length > 0 && (
          <div className="mt-8 md:mt-10">
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Amenities
              </p>
            </div>

            <div className="flex flex-wrap flex-col  mt-3 md:mt-5">
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
                      <p className="">{amenity.amenity_name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {apiData.foodBeverages &&
        Object.keys(apiData.foodBeverages).length > 0 && (
          <div className="    mt-8 md:mt-10 ">
            {/* <p className="font-semibold text-2xl">
              <span className="border-l-8 border-[#0E598F] me-4"></span> Food
              and Beverages{" "}
            </p> */}
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Food and Beverages
              </p>
            </div>

            <div className="flex  flex-wrap flex-col gap-5 mt-3 md:mt-5">
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
                      <p className=" ">{foodBeverage.food_beverage}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      {apiData.safety_features &&
        Object.keys(apiData.safety_features).length > 0 && (
          <div className="w-50vw  mt-8 md:mt-10 ">
            {/* <p className="font-semibold text-2xl">
              <span className="border-l-8 border-[#0E598F] me-4"></span> Safety
              Features
            </p> */}
            <div className="flex gap-2 items-center">
              <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
              <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
                Safety Features
              </p>
            </div>

            <div className="flex flex-wrap flex-col gap-5 mt-3 md:mt-5">
              <div className="flex flex-wrap gap-3 md:gap-5">
                {Object.keys(apiData.safety_features).map((key, index) => {
                  const safety_features = apiData.safety_features[key];

                  return (
                    <div className="flex gap-2 " key={index}>
                      <img
                        src={`https://backoffice.innerpece.com/${safety_features.safety_features_pic}`}
                        className="w-6 h-6 bg-cover md:w-7 md:h-7"
                      />
                      <p className=" ">{safety_features.safety_features}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {apiData.activities && Object.keys(apiData.activities).length > 0 && (
        <div className="mt-8 md:mt-10">
          {/* <p className="font-semibold text-2xl ">
            <span className="border-l-8 border-[#0E598F] me-4"></span>{" "}
            Activities
          </p> */}
          <div className="flex gap-2 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Activities
            </p>
          </div>

          <div className="flex flex-wrap justify-start mt-3 md:mt-5 gap-4">
            {Object.keys(apiData.activities).map((key, index) => {
              const activities = apiData.activities[key];

              return (
                <div
                  className="flex flex-col justify-start  items-start border-[1px] gap-3 w-32 md:w-40  border-black/40 p-3 rounded-xl py-3  "
                  key={index}
                >
                  <img
                    src={`https://backoffice.innerpece.com/${activities.activities_pic}`}
                    className="w-6 h-6 bg-cover md:w-7 md:h-7"
                  />
                  <p className="">{activities.activities}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {apiData.payment_policy && (
        <div className="mt-8 md:mt-10  ">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Payment Policy
            </p>
          </div>

          {apiData.payment_policy.length > 0 && (
            <div className="flex flex-col mt-3 md:mt-5">
              {apiData.payment_policy.map((item, index) => (
                <p key={index} className=" ">
                  <p className="inline font-bold text-xl h-fit pe-3">&bull;</p>
                  <p className="inline   "> {item}</p>
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {apiData.important_info && apiData.important_info !== "<p><br></p>" && (
        <div ref={informationRef} className="mt-8 md:mt-10   ">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Notes
            </p>
          </div>

          <div>
            <div className="mt-3 md:mt-5 md:leading-7  ">
              {/* <p>{cleanBulletText(apiData.important_info)}</p> */}

              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(apiData.important_info),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {apiData.program_inclusion && apiData.program_inclusion !== "<p><br></p>" &&(
        <div className="mt-8 md:mt-10   ">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Package Inclusion
            </p>
          </div>

          <div className="mt-3 md:mt-5 md:leading-7  ">
            {/* <p>{cleanBulletText(apiData.program_inclusion)}</p> */}
            <p
              className=""
              dangerouslySetInnerHTML={{
                __html: cleanHTML(apiData.program_inclusion),
              }}
            />
          </div>
        </div>
      )}

      {apiData.program_exclusion && apiData.program_exclusion !== "<p><br></p>" &&(
        <div className="mt-8 md:mt-10   ">
          <div className="flex gap-2 mt-8 items-center">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-xl md:text-2xl  text-[#11142D]">
              Package Exclusion
            </p>
          </div>

          <div className="mt-3 md:mt-5 md:leading-7  ">
            {/* <p>{cleanBulletText(apiData.program_exclusion)}</p> */}
            <p
              className=""
              dangerouslySetInnerHTML={{
                __html: cleanHTML(apiData.program_exclusion),
              }}
            />
          </div>
        </div>
      )}

      <div ref={reviewRef} className="mt-8 md:mt-10 max-lg:hidden">
        <div className="flex flex-wrap flex-col justify-start ">
          <div className="flex gap-2 ">
            <p className="border-l-[7px] h-8  border-[#0E598F] "></p>
            <p className="font-semibold text-2xl  text-[#11142D]">
              Client's Review
            </p>
          </div>

          <div className="border max-lg:hidden border-gray-500 flex  flex-col gap-2 rounded-xl ps-5 pe-3 py-3 mt-3 md:mt-5">
            <div className="flex ">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  disabled={!userDetails}
                  key={star}
                  type="button"
                  className={`w-8 text-2xl h-8 flex  rounded-full ${
                    star <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
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
              name="Review"
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
            <p className="text-red-500 mt-1 max-lg:hidden">
              Please{" "}
              <button
                onClick={handleLoginClick}
                className="cursor-pointer underline"
              >
                Login{" "}
              </button>
              {"  "} to add review
            </p>
          )}

          {/* <div className="mt-5 border-4 h-36 w-36 flex flex-col justify-center items-center border-sky-800 rounded-full">
              <p className="text-sm">Overall Ratings</p>
              <p className="text-sm">
                {apiData.average_rating}
                <span className="ms-1">Out of 5</span>{" "}
              </p>
            </div> */}

          {/* {apiData.reviews.length > 0 && (
              <div className="mt-5  overflow-y-auto">
                <div className="flex  flex-col-reverse  gap-5 ">
                  {apiData.reviews.map((item, index) => (
                    <div
                      key={index}
                      className="mx-3 bg-gray-100 p-4 rounded-lg "
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

                        <div className="flex items-center gap-3">
                          <img
                            src={`https://backoffice.innerpece.com/${item.profile_image}`}
                            alt="Profile"
                            className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                          />
                          <p className="font-medium text-lg md:text-xl text-gray-800">
                            {item.first_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            )} */}

          {apiData?.reviews?.length > 0 && (
            <div className="mt-5 overflow-y-auto">
              <div className="flex flex-col-reverse gap-5">
                {currentReviews.map((item, index) => (
                  <div key={index} className=" bg-gray-100 p-4 rounded-xl">
                    <div className="flex flex-col gap-1">
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

                      <div className="flex items-center gap-3">
                        <img
                          src={`${
                            item.profile_image
                              ? `https://backoffice.innerpece.com/${item.profile_image}`
                              : default_user_image2
                          }`}
                          alt="Profile"
                          className="w-[40px] h-[40px] object-cover rounded-full border-2 border-gray-300"
                        />
                        <p className="font-medium text-gray-800">
                          {item.first_name} {item.last_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-5 gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {loginCliked && (
        <div className="fixed inset-0 z-10 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center  bg-white">
            <div className="w-screen   md:w-[70vw] py-3  lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
              <button
                onClick={() => setLoginClicked(false)}
                className="text-gray-500 w-full pe-5  font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
              >
                ✕
              </button>
              <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
                <div className=' bg-[url("././assets/login_image.png")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

                <div className="w-full md:w-2/5 flex-grow flex-shrink">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                      Log In To Get Started
                    </p>

                    <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                      <div className="flex flex-col flex-grow gap-2">
                        <label htmlFor="loginEmail" className="font-semibold">
                          Email
                        </label>
                        <input
                          type="text"
                          name="loginEmail"
                          id="loginEmail"
                          value={loginEmail}
                          autoComplete="off"
                          onChange={onChangeInput}
                          className="border-2 border-gray-300 outline-none p-2 rounded-md"
                          placeholder="Enter your Email"
                        />
                        {loginError.email && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.email}
                          </p>
                        )}

                        {loginError.error === "Unauthorized User " && (
                          <p className="text-red-500 text-xs sm:text-sm ">
                            {loginError.error}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col mt-5 gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="font-semibold">
                          Your Password
                        </label>
                        {/* <p className="text-red-400 cursor-pointer text-xs md:text-sm font-semibold">
                    Forgot Password?
                  </p> */}
                      </div>
                      <input
                        onFocus={(e) => (e.target.type = "text")}
                        onBlur={(e) => (e.target.type = "password")}
                        type="loginPassword"
                        id="loginPassword"
                        name="loginPassword"
                        value={loginPassword}
                        onChange={onChangeInput}
                        autoComplete="off"
                        placeholder="Enter your Password"
                        className="border-2  border-gray-300 outline-none p-2 rounded-md"
                      />
                      {loginError.password && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.password}
                        </p>
                      )}

                      {loginError.error === "Incorrect password" && (
                        <p className="text-red-500 text-xs sm:text-sm ">
                          {loginError.error}
                        </p>
                      )}
                    </div>

                    <div className="recaptacha-login  mt-5 ">
                      <ReCAPTCHA
                        sitekey="6LfDSrsqAAAAAI2jP2tOdr2l4VkiztyX2S2H0Fxg"
                        onChange={handleCaptchaChange}
                      />
                    </div>

                    <button
                      disabled={!captchaValue}
                      onClick={onClickSignIn}
                      className={`${
                        !captchaValue ? "bg-gray-400" : "bg-sky-800"
                      } transition-all duration-300  p-3 mt-2 rounded-md text-white`}
                    >
                      Log In
                    </button>

                    <div className="flex items-center flex-wrap mt-5 mb-5 gap-2 ">
                      <p>Don't you have an account?</p>
                      <button
                        onClick={onClickBtn}
                        className="bg-sky-800 px-3 py-1 cursor-pointer  text-white rounded"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainbar;
