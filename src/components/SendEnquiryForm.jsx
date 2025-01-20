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
import { MdEmojiPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SendEnquiryForm = () => {
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
  const [reference_id, setReferenceId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedReferenceId = sessionStorage.getItem("reference_id");

    setReferenceId(storedReferenceId);
    console.log(storedReferenceId);

    setUserId(localStorage.getItem("loginid"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({}); // Reset errors on submit

    try {
      const authToken = userId; // Replace with the actual token

      const response = await axios.post(
        "https://backoffice.innerpece.com/api/v1/home-enquiry-form",
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
          reference_id: reference_id,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the token here
          },
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

  return (
    <div className="flex items-center justify-center mt-8 md:mt-14">
      <div className="80vw md:w-[70vw] lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
        <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
          <div className=' bg-[url("././assets/send_enquiry_image.jpg")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

          <div className="md:basis-1/2">
           
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
                    <p className="text-red-500 text-xs">{errors.name[0]}</p>
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
                    <p className="text-red-500 text-xs ">{errors.email[0]}</p>
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
                    <p className="text-red-500 text-xs">{errors.phone[0]}</p>
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
                      onChange={(e) => setYourResidenceLocation(e.target.value)}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-500 text-xs">{errors.location[0]}</p>
                  )}
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
                        className="w-full text-gray-800 p-2 border-l focus:outline-none"
                        id="How Many Days"
                        value={reference_id}
                      />
                    </div>
                  </div>
                )}
                

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
                    <p className="text-red-500 text-xs">{errors.days[0]}</p>
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
                      onChange={(e) => setTravelDestination(e.target.value)}
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
                      type="number"
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
                      className="w-full p-2 border-l text-gray-400 focus:outline-none"
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
                      onChange={(e) => setHowManyRoomsYouNeed(e.target.value)}
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
                    <label className="ms-2 text-gray-400">Cab Needed</label>

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
                    <p className="text-red-500 text-xs">{errors.cab_need[0]}</p>
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
              {success && (
              <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                {success}
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
  );
};

export default SendEnquiryForm;
