import React from "react";
import telegram from "../assets/telegram.png";
import customerservice from "../assets/customerservice.png";
import approve from "../assets/approve.png";
import insurance from "../assets/insurance.png";
import pricetag from "../assets/pricetag.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import defaultimg from "../assets/defaultimg.png";
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

function Sidebar({ LocationShareRef }) {
  const location = useLocation();
  const { id } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [yourResidenceLocation, setYourResidenceLocation] = useState("");
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
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [map, setMap] = useState("");
  const [loading, setLoading] = useState(true);

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
        // console.log(response.data.data.google_map);
        let modifiedMapHtml = response.data.data.google_map;

        // Remove width and height attributes from the iframe
        modifiedMapHtml = modifiedMapHtml.replace(/width="[^"]*"/g, "");
        modifiedMapHtml = modifiedMapHtml.replace(/height="[^"]*"/g, "");
        modifiedMapHtml = modifiedMapHtml.replace(/style="[^"]*"/g, "");

        setMap(modifiedMapHtml);
        // setIsWishlisted(response.data.data.wishlists);

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
        setLoading(false);

      } catch (err) {
        console.log(err);
        setLoading(false);

      }
    };
    fetchProgramData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({}); // Reset errors on submit

    try {

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
          travel_destination: travelDestination,
          male_count: maleCount,
          female_count: femaleCount,
        }
      );

      // Successful submission
      setSuccess(response.data.message);


      // Clear form values
      setName("");
      setPhone("");
      setEmail("");
      setCommends("");
      setBudgetPerHead("");
      setIsCabNeed("");
      setHowManyDays("");
      setYourResidenceLocation("");
      setHowManyRoomsYouNeed("");
      setTotalCount("");
      setTravelDate("");
      setTravelDestination("");
      setMaleCount("");
      setFemaleCount("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000); // 5000 ms = 5 seconds

    } catch (error) {
      // Handle validation errors if any
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

  // this will stop scroll when modal is open
  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the <body> based on modal state
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  return (
    <div
      className={` w-full md:basis-[32%] xl:basis-[25%] flex-grow mt-8 md:mt-7 ${
        show ? "fixed" : ""
      }`}
    >
      {loading ? (
        <div className="h-60 w-full bg-gray-500 animate-pulse"></div>
      ) : (
        <div className="flex flex-col p-3 shadow-md bg-white shadow-black/10 rounded-lg items-center gap-y-4 gap-2">
          <span className="text-gray-600 ">
            Starting From{" "}
            <del>INR{` ${apiData.actual_price && apiData.actual_price}`}</del>{" "}
          </span>
          <p className="text-green-800 font-semibold text-2xl">
            INR
            {` ${apiData.discount_price && apiData.discount_price}`}
          </p>

          <div className="border-t-2 border-dotted w-full border-sky-800"></div>

          <span className="bg-sky-800 -mt-8 px-16 py-1  text-sm rounded-full text-white font-bold">
            Per Person
          </span>

          <div className="flex flex-wrap justify-center gap-4 pb-4">
            <div
              style={{ backgroundColor: "#EC3B63" }}
              onClick={handleShow}
              className="flex flex-wrap cursor-pointer flex-grow md:flex-grow-0 px-4 py-2 items-center rounded-lg gap-2"
            >
              <img src={telegram} alt="" />
              <p className="text-white font-semibold">Send Enquiry</p>
            </div>
          </div>
        </div>
      )}

      {show && (
        <div className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center backdrop-blur overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-full w-[90%] sm:w-[80%]  max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                {apiData.title}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="sr-only">Close</span>✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-5">
                {/* Image Section */}
                <div className="flex flex-col items-center md:basis-1/2">
                  <img
                    className="w-full h-auto object-cover rounded-lg"
                    src={
                      apiData.gallery_img && apiData.gallery_img[0]
                        ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
                        : defaultimg
                    }
                    alt="Pink Palace"
                  />
                  <h1 className="mt-3 text-lg md:text-xl font-semibold">
                    {apiData.title}
                  </h1>
                  <div className="text-center mt-3">
                    <span className="block text-sm text-gray-500">
                      Starting From
                    </span>
                    <span className="block text-gray-500 line-through">
                      INR {apiData.actual_price}
                    </span>
                    <h2 className="text-green-600 text-lg font-semibold">
                      INR {apiData.discount_price}
                    </h2>
                  </div>
                </div>

                {/* Form Section */}
                <div className="md:basis-1/2">
                  {success && (
                    <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                      {success}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                      {/* Name Input */}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <IoIosContact />
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none"
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
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <AiOutlineMail />
                          </span>
                          <input
                            type="email"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Email"
                            id="email"
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

                      {/* Phone Input */}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <MdOutlinePhone />
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Phone"
                            id="phone"
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
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <FaLocationDot />
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Your Residence Location"
                            id="Your Residence Location"
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

                      {/*how many days*/}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <FaCalendarDays />
                          </span>
                          <input
                            type="number"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="How Many Days"
                            id="How Many Days"
                            value={howManyDays}
                            onChange={(e) => setHowManyDays(e.target.value)}
                          />
                        </div>
                        {errors.days && (
                          <p className="text-red-500 text-xs">
                            {errors.days[0]}
                          </p>
                        )}
                      </div>

                      {/*travel destination*/}

                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <LiaPlaceOfWorshipSolid />
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Travel Destination"
                            id="Travel Destination"
                            value={travelDestination}
                            onChange={(e) =>
                              setTravelDestination(e.target.value)
                            }
                          />
                        </div>
                        {errors.travel_destination && (
                          <p className="text-red-500 text-xs">
                            {errors.travel_destination[0]}
                          </p>
                        )}
                      </div>

                      {/*Budget Per Head */}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <RiMoneyRupeeCircleFill />
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Budget Per Head"
                            id="Budget Per Head"
                            value={budgetPerHead}
                            onChange={(e) => setBudgetPerHead(e.target.value)}
                          />
                        </div>
                        {errors.budget_per_head && (
                          <p className="text-red-500 text-xs">
                            {errors.budget_per_head[0]}
                          </p>
                        )}
                      </div>

                      {/*total count*/}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <FaPeopleLine />
                          </span>
                          <input
                            type="number"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Total Count"
                            id="Total Count"
                            value={totalCount}
                            onChange={(e) => setTotalCount(e.target.value)}
                          />
                        </div>
                        {errors.total_count && (
                          <p className="text-red-500 text-xs">
                            {errors.total_count[0]}
                          </p>
                        )}
                      </div>

                      {/*male &  count*/}
                      <div className="flex flex-col">
                        <div className="flex gap-5">
                          <div className="flex flex-col">
                            <div className="flex items-center border rounded-md">
                              <span className="p-2">
                                <FaMale />
                              </span>
                              <input
                                type="number"
                                className="w-full p-2 border-l focus:outline-none"
                                placeholder="Male Count"
                                id="Male Count"
                                value={maleCount}
                                onChange={(e) => setMaleCount(e.target.value)}
                              />
                            </div>
                            {errors.male_count && (
                              <p className="text-red-500 text-xs">
                                {errors.male_count[0]}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col ">
                            <div className="flex items-center border rounded-md">
                              <span className="p-2">
                                <FaFemale />
                              </span>
                              <input
                                type="number"
                                className="w-full p-2 border-l focus:outline-none"
                                placeholder="Female Count"
                                id="Female Count"
                                value={femaleCount}
                                onChange={(e) => setFemaleCount(e.target.value)}
                              />
                            </div>
                            {errors.female_count && (
                              <p className="text-red-500 text-xs">
                                {errors.female_count[0]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/*travel date*/}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <MdOutlineCalendarMonth />
                          </span>
                          <input
                            type="date"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Travel Date"
                            id="Travel Date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                          />
                        </div>
                        {errors.travel_date && (
                          <p className="text-red-500 text-xs">
                            {errors.travel_date[0]}
                          </p>
                        )}
                      </div>

                      {/*how many rooms you need*/}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <FaHouse />
                          </span>
                          <input
                            type="number"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="How Many Rooms You Need"
                            id="How Many Rooms You Need"
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

                      {/*Cab Need*/}
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2 border-r">
                            <FaCar />
                          </span>
                          <label className="ms-2">Cab Needed</label>

                          <div className="flex gap-1 p-2 ms-3">
                            <input
                              type="radio"
                              name="cab_need"
                              id="yes"
                              value="yes"
                              checked={isCabNeed === "yes"}
                              onChange={(e) => setIsCabNeed(e.target.value)}
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
                              onChange={(e) => setIsCabNeed(e.target.value)}
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
                      <div className="flex flex-col">
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <BiMessageRoundedDots />
                          </span>
                          <textarea
                            className="w-full p-2 border-l focus:outline-none"
                            id="message"
                            placeholder="Comments"
                            value={comments}
                            onChange={(e) => setCommends(e.target.value)}
                          ></textarea>
                        </div>
                        {errors.comments && (
                          <p className="text-red-500 text-xs ">
                            {errors.comments[0]}
                          </p>
                        )}
                      </div>
                    </div>

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

      <div className="shadow-md mt-10 shadow-black/10 rounded-lg">
        <div className="flex gap-4 mt-8 ms-3 text-2xl">
          <p className="text-sky-800">|</p>
          <p className="font-semibold">Book With Confidence</p>
        </div>

        <div className="flex flex-wrap  items-start  justify-between md:flex-col p-5   gap-y-4 gap-2">
          <div className="flex gap-4 items-center">
            <img src={customerservice} alt="" />
            <p>Customer care available 24/7</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={approve} alt="" />
            <p>Hand-picked Tours & Activities</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={insurance} alt="" />
            <p>Free Travel Insurance</p>
          </div>

          <div className="flex gap-4 items-center">
            <img src={pricetag} alt="" />
            <p>No-hassle best price guarantee</p>
          </div>
        </div>
      </div>

      <p ref={LocationShareRef} className="font-semibold mt-8">
        Where you'll be
      </p>
      <div>
        <div
          className="mt-5  object-cover"
          dangerouslySetInnerHTML={{ __html: map }}
        />

        <div></div>
      </div>
    </div>
  );
}

export default Sidebar;
