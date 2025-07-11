import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Featuredhero = lazy(() => import("../components/FeaturedHero"));
let Featured = lazy(() => import("../components/Featured"));
let TourDetailsTwoComponents = lazy(() =>
  import("../components/TourDetailsTwoComponents")
);
let Footer = lazy(() => import("../components/Footer"));
import { useRef, useEffect, useState } from "react";
import whatsapp from "../assets/whatsapp.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import telegram from "../assets/telegram.png";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { FaChildReaching } from "react-icons/fa6";
import { FaChild } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

function TourDetails() {
  useEffect(() => {
    document.title = "Tour Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount

  let highlightsRef = useRef(null);
  let informationRef = useRef(null);
  let TourPlanningRef = useRef(null);
  let LocationShareRef = useRef(null);
  let reviewRef = useRef(null);
  let dummyRef = useRef(null);

  const handlehighlightsScroll = () => {
    highlightsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleInformationScroll = () => {
    informationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleTourPlanningScroll = () => {
    TourPlanningRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocationShareScroll = () => {
    LocationShareRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const reviewRefScroll = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const pathName = window.location.pathname;
  const slicedPathName = window.location.pathname.split("/")[1];
  const [signInLoader, setSignInLoader] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [userId, setUserId] = useState("");
  const [priceSelected, setPriceSelected] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [loginCliked, setLoginClicked] = useState(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [failure, setFailure] = useState("");
  const [homeImage, setHomeImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [yourResidenceLocation, setYourResidenceLocation] = useState("");
  const [dob, setDob] = useState("");
  const [engagementDate, setEngagementDate] = useState("");
  const [howManyDays, setHowManyDays] = useState("");
  const [travelDestination, setTravelDestination] = useState("");
  const [budgetPerHead, setBudgetPerHead] = useState("");
  const [isCabNeed, setIsCabNeed] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [maleCount, setMaleCount] = useState("");
  const [femaleCount, setFemaleCount] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [howManyRoomsYouNeed, setHowManyRoomsYouNeed] = useState("");
  const [comments, setCommends] = useState("");
  const [map, setMap] = useState("");
  const [loadingform, setLoadingform] = useState("");
  const [reference_id, setReferenceId] = useState("");
  const [childCount, setChildCount] = useState("");
  const [childAge, setChildAge] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [homeImage.length]);

  const handleClose = () => {
    setFailure(false);
    setSuccess(false);
    setLoading(false);
    setShow(false);
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("loginDetails");
    const userDetails = storedUserDetails
      ? JSON.parse(storedUserDetails)
      : null;
    setUserDetails(userDetails);

    setUserId(localStorage.getItem("loginid"));
  }, [loginCliked]);

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
        setHomeImage(response.data.data.gallery_img);
        setSelectedPackage(response.data.data.price_title[0]);
        setPriceSelected(response.data.data.price_amount[0]);
      } catch (err) {
        console.log(err.response.data.message);
        if ((err.status = 404)) {
          setApiError(err.response.data.message);
        }
      }
    };
    fetchProgramData();
  }, []);

  const [bookNowClicked, setBookNowClicked] = useState(false);

  const handleLoginClick = () => {
    setLoginClicked(true);
    setBookNowClicked(false);
  };

  const onChangePrice = (item, index) => {
    setSelectedPackage(item);
    setPriceSelected(apiData.price_amount[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({}); // Reset errors on submit

    setFailure("");
    setSuccess("");

    try {
      setLoadingform("Sending...");

      const authToken = userId; // Replace with the actual token

      const response = await axios.post(
        "https://backoffice.innerpece.com/api/enquiry-form",
        {
          name,
          email,
          phone,
          comments,
          budget_per_head: budgetPerHead,
          cab_need: isCabNeed,
          days: howManyDays,
          location: yourResidenceLocation,
          rooms_count: howManyRoomsYouNeed,
          total_count: totalCount,
          travel_date: travelDate,
          travel_destination: apiData.title,
          male_count: maleCount,
          female_count: femaleCount,
          reference_id: reference_id,
          program_title: apiData.title,
          child_count: childCount,
          child_age: childAge,
          engagement_date: engagementDate,
          birth_date: dob,
          pricing: priceSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
        }
      );

      // Successful submission
      setLoadingform("");
      setFailure("");
      setSuccess(response.data.message);

      // Clear form values
      // setName("");
      // setPhone("");
      // setEmail("");
      setCommends("");
      setBudgetPerHead("");
      setIsCabNeed("");
      setHowManyDays("");
      // setYourResidenceLocation("");
      setHowManyRoomsYouNeed("");
      setTotalCount("");
      setTravelDate("");
      setTravelDestination("");
      setMaleCount("");
      setFemaleCount("");
      setChildCount("");
      setChildAge([]);
      setDob("");
      setEngagementDate("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
        setShow(false);
      }, 3000); // 5000 ms = 5 seconds

      setBookNowClicked(false);
    } catch (error) {
      // Handle validation errors if any
      setLoadingform("");
      setFailure("Please Fill all the fields");
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        console.log("error", error.response.data.errors);
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const loggedUserDetails = localStorage.getItem("loginDetails")
      ? JSON.parse(localStorage.getItem("loginDetails"))
      : null;

    if (loggedUserDetails) {
      const {
        first_name: loggedUser_fistName,
        last_name: loggedUser_lastName,
        email: loggedUser_email,
        phone: loggedUser_phone,
        city: loggedUser_city,
        dob: loggedUser_dob,
      } = loggedUserDetails;

      setName(loggedUser_fistName + " " + loggedUser_lastName);
      setEmail(loggedUser_email);
      setPhone(loggedUser_phone);
      setYourResidenceLocation(loggedUser_city);
      setDob(loggedUser_dob);
    }
  }, []);

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
    setSignInLoader(true);
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
      setSignInLoader(false);
    } catch (err) {
      console.log(err);

      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
      setSignInLoader(false);
    }
  }

  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // this will stop scroll when modal is open
  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (bookNowClicked || loginCliked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [bookNowClicked, loginCliked]);

  return (
    <div className="bg-[#FEFEFE]">
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        {!apiError ? (
          <>
            {/* Floating Button */}
            <div
              onClick={() => setBookNowClicked(!bookNowClicked)}
              className="fixed md:hidden flex items-center justify-center px-5 py-4 shadow-2xl shadow-black bottom-0 w-full bg-white z-20"
            >
              <button className="w-full font-semibold text-white rounded-lg text-base py-3 bg-gradient-to-r from-sky-600 to-sky-800 transition-transform hover:scale-105 duration-300">
                Book Now
              </button>
            </div>

            {/* Slide-Up Panel */}
            <div
              className={`fixed bottom-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out transform ${
                bookNowClicked
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <div className="md:hidden px-4 py-5 bg-white border-t shadow-lg w-full">
                {/* Close Icon */}
                <div className="flex justify-end">
                  <IoClose
                    onClick={() => setBookNowClicked(false)}
                    className="text-2xl cursor-pointer text-gray-700 hover:text-black"
                  />
                </div>

                {/* Price Options */}
                {apiData?.price_amount?.length > 0 && (
                  <div className="flex flex-col items-start sm:items-center gap-2 mb-4">
                    {apiData.price_title.map(
                      (item, index) =>
                        item && (
                          <label
                            htmlFor={item}
                            className="flex items-center gap-2 cursor-pointer"
                            key={index}
                          >
                            <input
                              type="radio"
                              id={item}
                              value={item}
                              checked={selectedPackage === item}
                              onChange={() => onChangePrice(item, index)}
                            />
                            <span className="text-sm">
                              {item} :{" "}
                              <span className="font-semibold text-green-800">
                                ₹
                                {Number(
                                  apiData.price_amount[index]
                                ).toLocaleString("en-IN")}
                              </span>
                            </span>
                          </label>
                        )
                    )}
                  </div>
                )}

                {/* Book Button */}
                <div className="text-center">
                  <button
                    onClick={handleShow}
                    disabled={!userDetails}
                    className="w-full font-semibold text-white rounded-lg text-base py-3 bg-gradient-to-r from-sky-600 to-sky-800 transition-transform hover:scale-105 duration-300"
                  >
                    Book Now
                  </button>

                  {!userDetails && (
                    <p className="text-sm text-red-500 mt-2">
                      Please{" "}
                      <span
                        onClick={handleLoginClick}
                        className="underline cursor-pointer"
                      >
                        login
                      </span>{" "}
                      to book now
                    </p>
                  )}
                </div>
              </div>
            </div>

            {show && (
              <div className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto">
                <div className="bg-white rounded-lg shadow-lg max-w-full w-[100%] sm:w-[80%] h-screen  sm:max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={handleClose}
                    className="text-gray-500 w-full pe-5 pt-3 font-extrabold text-xl hover:text-gray-700 focus:outline-none placeholder:text-gray-600 placeholder:text-sm flex justify-end"
                  >
                    ✕
                  </button>
                  {/* Modal Header */}
                  <div className="flex  p-6 border-b">
                    {/* Image Section */}
                    <div className="flex flex-col-reverse md:flex-row w-full gap-8  ">
                      {/* <img
                          className="md:w-1/2 h-40  object-cover rounded-lg"
                          src={
                            apiData.gallery_img && apiData.gallery_img[0]
                              ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
                              : defaultimg
                          }
                          alt=""
                        /> */}

                      <div className="relative w-full h-52 md:w-1/2 overflow-hidden">
                        {homeImage.map((image, index) => (
                          <div
                            key={image.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                              index === currentIndex
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            <img
                              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                              src={`https://backoffice.innerpece.com/${image}`}
                              alt={image.slider_name}
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="h-fit flex gap-3 flex-col">
                        <h1 className=" text-lg md:text-xl font-semibold">
                          {apiData.title}
                        </h1>
                        <div className="  flex items-center gap-3 flex-wrap">
                          {/* <span className="block  text-gray-500">Starting From</span>
                            
                            <span className="text-green-800 font-semibold text-xl ms-1">
                              ₹{`${apiData.price_amount && apiData.price_amount[0]}`}
                            </span> */}
                          <p>
                            {selectedPackage} :{" "}
                            <span className="font-semibold text-xl lg:text-2xl text-green-800">
                              ₹ {Number(priceSelected).toLocaleString("en-IN")}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Form Section */}
                      <div className="w-full">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="flex flex-col gap-4">
                            {/* name and email */}
                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/* Name Input */}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <IoIosContact />
                                  </span>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>
                                {errors.name && (
                                  <p className="text-red-500 text-xs">
                                    {errors.name[0]}
                                  </p>
                                )}
                              </div>

                              {/* Email Input */}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <AiOutlineMail />
                                  </span>
                                  <input
                                    type="email"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                                {errors.email && (
                                  <p className="text-red-500 text-xs ">
                                    {errors.email[0]}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* phone and residence location */}
                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/* Phone Input */}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <MdOutlinePhone />
                                  </span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Phone"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                  />
                                </div>
                                {errors.phone && (
                                  <p className="text-red-500 text-xs">
                                    {errors.phone[0]}
                                  </p>
                                )}
                              </div>

                              {/* your residence location */}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaLocationDot />
                                  </span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Your Residence Location"
                                    id="Your Residence Location"
                                    name="Your Residence Location"
                                    value={yourResidenceLocation}
                                    onChange={(e) =>
                                      setYourResidenceLocation(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.location && (
                                  <p className="text-red-500 text-xs">
                                    {errors.location[0]}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/*influencer id*/}
                            {reference_id && (
                              <div className="flex flex-col">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <MdEmojiPeople />
                                  </span>
                                  <input
                                    readOnly
                                    className="w-full text-gray-800 p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    id="How Many Days"
                                    name="How Many Days"
                                    value={reference_id}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/*travel destination*/}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <LiaPlaceOfWorshipSolid />
                                  </span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Travel Destination"
                                    id="Travel Destination"
                                    name="Travel Destination"
                                    value={apiData.title}
                                  />
                                </div>
                                {errors.travel_destination && (
                                  <p className="text-red-500 text-xs">
                                    {errors.travel_destination[0]}
                                  </p>
                                )}
                              </div>

                              {/* DOB Input */}
                              <div className="flex flex-col sm:w-1/2 ">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaBirthdayCake />
                                  </span>
                                  <input
                                    autoComplete="on"
                                    type="text"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Select DOB"
                                    id="dob"
                                    name="dob"
                                    value={dob}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    onChange={(e) => setDob(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/* engagement date */}
                              <div className="flex flex-col sm:w-1/2 ">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <GiLovers />
                                  </span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Select Engagement Date"
                                    id="engagement date"
                                    name="engagement date"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    value={engagementDate}
                                    onChange={(e) =>
                                      setEngagementDate(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              {/*how many days*/}
                              <div className="flex flex-col sm:w-1/2 ">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaCalendarDays />
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Number of days you would like to travel"
                                    id="Number of days you would like to travel"
                                    name="Number of days you would like to travel"
                                    value={howManyDays}
                                    onChange={(e) =>
                                      setHowManyDays(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.days && (
                                  <p className="text-red-500 text-xs">
                                    {errors.days[0]}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/*Budget Per Head */}
                              {/* <div className="flex flex-col sm:w-1/2">
                                  <div className="flex items-center border rounded-md">
                                    <span className="p-2">
                                      <RiMoneyRupeeCircleFill />
                                    </span>
                                    <input
                                      type="number"
                                      className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                      placeholder="Budget Per Head"
                                      id="Budget Per Head"
                                      name="Budget Per Head"
                                      value={budgetPerHead}
                                      onChange={(e) => setBudgetPerHead(e.target.value)}
                                    />
                                  </div>
                                  <p className="text-gray-500 text-xs">
                                    Note : Excluding flight/train cost
                                  </p>
                                  {errors.budget_per_head && (
                                    <p className="text-red-500 text-xs">
                                      {errors.budget_per_head[0]}
                                    </p>
                                  )}
                                </div> */}

                              {/*total count*/}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaPeopleLine />
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Total Count"
                                    id="Total Count"
                                    name="Total Count"
                                    value={totalCount}
                                    onChange={(e) =>
                                      setTotalCount(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.total_count && (
                                  <p className="text-red-500 text-xs">
                                    {errors.total_count[0]}
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaMale />
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full p-2 border-l focus:outline-none me-2 placeholder:text-gray-600 placeholder:text-sm "
                                    placeholder="Male Count"
                                    id="Male Count"
                                    name="Male Count"
                                    value={maleCount}
                                    onChange={(e) =>
                                      setMaleCount(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.male_count && (
                                  <p className="text-red-500 text-xs">
                                    {errors.male_count[0]}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-4 w-full flex-col  sm:flex-row">
                              {/*male &  count*/}

                              <div className="flex flex-col sm:w-1/2 ">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaFemale />
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Female Count"
                                    id="Female Count"
                                    name="Female Count"
                                    value={femaleCount}
                                    onChange={(e) =>
                                      setFemaleCount(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.female_count && (
                                  <p className="text-red-500 text-xs">
                                    {errors.female_count[0]}
                                  </p>
                                )}
                              </div>

                              {/*Child count*/}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaChildReaching />
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="Child Count"
                                    id="Child Count"
                                    name="Child Count"
                                    value={childCount}
                                    onChange={(e) =>
                                      setChildCount(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.child_count && (
                                  <p className="text-red-500 text-xs">
                                    {errors.child_count[0]}
                                  </p>
                                )}
                              </div>
                              {/* </div> */}
                              {/* </div> */}
                            </div>

                            {/* child age based on child count */}
                            {childCount > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {Array(Number(childCount))
                                  .fill(null)
                                  .map((item, index) => (
                                    <div className="grid grid-row-1 md:grid-row-3 ">
                                      <div className="flex items-center w-full border rounded-xl">
                                        <span className="p-2">
                                          <FaChild />
                                        </span>
                                        <input
                                          id="number"
                                          name="number"
                                          type="number"
                                          placeholder={` ${
                                            index + 1
                                          }st Child Age`}
                                          className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                          onChange={(e) =>
                                            onChangeChildAge(
                                              e,
                                              ` ${index + 1}st_Child_Age`,
                                              index
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                            {errors.child_age && (
                              <p className="text-red-500 text-xs">
                                {errors.child_age[0]}
                              </p>
                            )}

                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/*travel date*/}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <MdOutlineCalendarMonth />
                                  </span>
                                  <input
                                    type="text"
                                    className="w-full p-2 border-l  focus:outline-none placeholder:text-gray-600 text-black placeholder:text-sm me-2"
                                    id="Travel Date"
                                    name="Travel Date"
                                    value={travelDate}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => (e.target.type = "text")}
                                    placeholder="Select travel date"
                                    onChange={(e) =>
                                      setTravelDate(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.travel_date && (
                                  <p className="text-red-500 text-xs">
                                    {errors.travel_date[0]}
                                  </p>
                                )}
                              </div>

                              {/*how many rooms you need*/}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <FaHouse />
                                  </span>
                                  <input
                                    type="number"
                                    className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                                    placeholder="No of rooms required"
                                    id="No of rooms required"
                                    name="No of rooms required"
                                    value={howManyRoomsYouNeed}
                                    onChange={(e) =>
                                      setHowManyRoomsYouNeed(e.target.value)
                                    }
                                  />
                                </div>
                                {errors.rooms_count && (
                                  <p className="text-red-500 text-xs">
                                    {errors.rooms_count[0]}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-4 w-full flex-col sm:flex-row">
                              {/*Cab Need*/}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2 border-r">
                                    <FaCar />
                                  </span>
                                  <label className="ms-2 text-black">
                                    Cab Needed
                                  </label>

                                  <div className="flex gap-1 p-2 ms-3">
                                    <input
                                      type="radio"
                                      name="cab_need"
                                      id="yes"
                                      value="yes"
                                      checked={isCabNeed === "yes"}
                                      onChange={(e) =>
                                        setIsCabNeed(e.target.value)
                                      }
                                    />
                                    <label htmlFor="yes">Yes</label>
                                  </div>
                                  <div className="flex gap-1 p-2">
                                    <input
                                      type="radio"
                                      name="cab_need"
                                      id="no"
                                      value="no"
                                      checked={isCabNeed === "no"}
                                      onChange={(e) =>
                                        setIsCabNeed(e.target.value)
                                      }
                                    />
                                    <label htmlFor="no">No</label>
                                  </div>
                                </div>
                                {errors?.cab_need && (
                                  <p className="text-red-500 text-xs">
                                    {errors.cab_need[0]}
                                  </p>
                                )}
                              </div>

                              {/* Comments Input */}
                              <div className="flex flex-col sm:w-1/2">
                                <div className="flex items-center border rounded-md">
                                  <span className="p-2">
                                    <BiMessageRoundedDots />
                                  </span>
                                  <textarea
                                    className="w-full p-2 me-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm"
                                    id="message"
                                    name="message"
                                    placeholder="Comments"
                                    value={comments}
                                    rows={1}
                                    onChange={(e) =>
                                      setCommends(e.target.value)
                                    }
                                  ></textarea>
                                </div>
                                {errors.comments && (
                                  <p className="text-red-500 text-xs ">
                                    {errors.comments[0]}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* {apiData.price_amount.length > 0 && (
                                <div className="flex flex-col w-full">
                                  <div className="flex items-center border rounded-md">
                                    <span className="p-2 border-r">
                                      <PiMoneyWavyFill />
                                    </span>
                                    <p className="ms-2 me-3">Price amount </p>
                                    {/* <div className="flex gap-2 flex-wrap">
                                      {apiData.price_amount.map(
                                        (item, index) =>
                                          item && (
                                            <div className="flex gap-2 p-2">
                                              <input
                                                type="radio"
                                                name=""
                                                id={item}
                                                value={item}
                                                checked={priceSelected === item}
                                                onChange={() => setPriceSelected(item)}
                                              />
                                              <label htmlFor={item}>
                                                {apiData.price_title[index]} : ₹{item}
                                              </label>
                                            </div>
                                          )
                                      )}
                                    </div> */}

                            {/* <select
                                      name="price"
                                      id="price"
                                      className="w-fit border-none p-2.5 outline-none"
                                      onChange={() => setPriceSelected(item)}
                                    >
                                      <option value="" disabled selected>
                                        Select a price
                                      </option>
                                      {apiData.price_amount.map(
                                        (item, index) =>
                                          item && (
                                            <option key={index} value={item}>
                                              {apiData.price_title[index]} : ₹{item}
                                            </option>
                                          )
                                      )}
                                    </select> */}

                            {/* <select
                                      name="price"
                                      id="price"
                                      className="w-fit border-none p-2.5 outline-none"
                                      defaultValue=""
                                      onChange={(e) => setPriceSelected(e.target.value)}
                                    >
                                      <option value="" disabled selected>
                                        Select a price
                                      </option>
                                      {apiData.price_amount.map(
                                        (item, index) =>
                                          item && (
                                            <option key={index} value={item}>
                                              {apiData.price_title[index]} : ₹{item}
                                            </option>
                                          )
                                      )}
                                    </select>
                                  </div>
                                  {errors.pricing && (
                                    <p className="text-red-500 text-xs ">
                                      {errors.pricing[0]}
                                    </p>
                                  )}
                                </div> */}
                            {/* )} */}

                            <div className="flex items-center border rounded-md">
                              <span className="p-2">
                                <FaPeopleLine />
                              </span>
                              {/* <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none placeholder:text-gray-600 placeholder:text-sm me-2"
                            id="Total Count"
                            name="Total Count"
                            value={`${selectedPackage} : ${priceSelected}`}
                          /> */}

                              <div className="flex gap-2 p-2 border-l">
                                <p>{selectedPackage} :</p>
                                <p>
                                  ₹{" "}
                                  {Number(priceSelected).toLocaleString(
                                    "en-IN"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {success && (
                            <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                              {success}
                            </div>
                          )}
                          {loadingform && (
                            <div className="bg-orange-100  text-orange-700 p-2 rounded mb-4">
                              {loadingform}
                            </div>
                          )}
                          {failure && (
                            <div className="bg-red-100  text-red-700 p-2 rounded mb-4">
                              {failure}
                            </div>
                          )}

                          {/* Submit Button */}
                          <div className="text-center mt-4">
                            <button
                              type="submit"
                              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                              Send me Details
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {loginCliked && (
              <div className="fixed inset-0 z-40 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto overflow-x-hidden">
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
                              <label
                                htmlFor="loginEmail"
                                className="font-semibold"
                              >
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

                              {loginError.error && (
                                <p className="text-red-500 text-xs sm:text-sm ">
                                  {loginError.error}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col mt-5 gap-2">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor="password"
                                className="font-semibold"
                              >
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
                            disabled={!captchaValue || signInLoader}
                            onClick={onClickSignIn}
                            className={`${
                              !captchaValue ? "bg-gray-400" : "bg-sky-800"
                            } transition-all duration-300 w-full p-3 mt-2 rounded-md text-white`}
                          >
                            {signInLoader ? (
                              <div className="flex justify-center items-center">
                                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              </div>
                            ) : (
                              "Log In"
                            )}
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

            <Header />
            <Featuredhero
              handlehighlightsScroll={handlehighlightsScroll}
              handleInformationScroll={handleInformationScroll}
              handleTourPlanningScroll={handleTourPlanningScroll}
              handleLocationShareScroll={handleLocationShareScroll}
              reviewRefScroll={reviewRefScroll}
            />
            <Featured />
            <TourDetailsTwoComponents
              highlightsRef={highlightsRef}
              LocationShareRef={LocationShareRef}
              informationRef={informationRef}
              TourPlanningRef={TourPlanningRef}
              reviewRef={reviewRef}
              dummyRef={dummyRef}
            />
            <Footer className="pb-20 md:pb-0" />
          </>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <p className="text-xl md:text-2xl lg:text-3xl">Package not found</p>

            <NavLink
              to="/"
              className="bg-blue-600 text-white px-5  py-2 rounded-lg font-semibold"
            >
              Go back
            </NavLink>
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default TourDetails;
