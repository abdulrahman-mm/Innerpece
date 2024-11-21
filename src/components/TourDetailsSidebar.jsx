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
  const [comments, setCommends] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [map, setMap] = useState("");

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
        // console.log(response.data.data.google_map);
        let modifiedMapHtml = response.data.data.google_map;

        // Remove width and height attributes from the iframe
        modifiedMapHtml = modifiedMapHtml.replace(/width="[^"]*"/g, "");
        modifiedMapHtml = modifiedMapHtml.replace(/height="[^"]*"/g, "");
        modifiedMapHtml = modifiedMapHtml.replace(/style="[^"]*"/g, "");

        setMap(modifiedMapHtml);
        // setIsWishlisted(response.data.data.wishlists);

        document.title = apiData.title || "Default Title";

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
          name: name,
          email,
          phone,
          comments,
        }
      );

      // Successful submission
      console.log(response.data.message);
      setSuccess(response.data.message);

      // Clear form values
      setName("");
      setPhone("");
      setEmail("");
      setCommends("");

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
    <div className=" w-full lg:basis-[22%] xl:basis-[25%] flex-grow mt-3 md:mt-7">
      <div className="flex flex-col p-3 shadow-md bg-white shadow-black/10 rounded-lg items-center gap-y-4 gap-2">
        <span className="text-gray-600 ">
          Starting Form{" "}
          <del>
            INR{` ${apiData.actual_price ? apiData.actual_price : "INR 25000"}`}
          </del>{" "}
        </span>
        <p className="text-green-800 font-semibold text-2xl">
          INR
          {` ${apiData.discount_price ? apiData.discount_price : "INR 25000"}`}
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
          {show && (
            <div className="fixed inset-0 px-2 z-10 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-lg shadow-lg max-w-lg h-fit w-full ">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-bold text-gray-900">
                    Inner Peace
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>✕
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-2 md:p-6">
                  <div className="flex gap-5 flex-row">
                    <div className="flex basis-[50%] flex-col items-center">
                      {/* Image */}
                      <img
                        className="img_123456 w-full h-48 object-cover rounded-lg"
                        src={
                          apiData.gallery_img && apiData.gallery_img[0]
                            ? `https://backoffice.innerpece.com/${apiData.gallery_img[0]}`
                            : defaultimg
                        }
                        alt="Pink Palace"
                      />
                      <h1 className="mt-3 md:text-xl font-semibold">
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
                    <div>
                      {/* {errors.server && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {errors.server}
              </div>
            )} */}
                      {success && (
                        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
                          {success}
                        </div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <IoIosContact />
                          </span>
                          <input
                            type="text"
                            className="w-full p-2 border-l focus:outline-none"
                            placeholder="Name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-xs ">
                            {errors.name[0]}
                          </p>
                        )}

                        {/* Email Input */}
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

                        {/* Phone Input */}
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

                        {/* Comments Input */}
                        <div className="flex items-center border rounded-md">
                          <span className="p-2">
                            <BiMessageRoundedDots />
                          </span>
                          <textarea
                            className="w-full p-2 border-l focus:outline-none"
                            id="message"
                            placeholder="Comments"
                            rows="2"
                            value={comments}
                            onChange={(e) => setCommends(e.target.value)}
                          ></textarea>
                        </div>
                        {errors.comments && (
                          <p className="text-red-500 text-xs ">
                            {errors.comments[0]}
                          </p>
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
        </div>
      </div>

      <div className="shadow-md mt-10 shadow-black/10 rounded-lg">
        <div className="flex gap-4 mt-3 ms-3">
          <p className="text-sky-800">|</p>
          <p className="font-semibold">Book With Confidence</p>
        </div>

        <div className="flex flex-wrap  items-start mt-10 justify-between md:flex-col p-5   gap-y-4 gap-2">
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

      <p ref={LocationShareRef} className="font-semibold mt-10">
        Where you'll be
      </p>
      <div>
        <div className="mt-5 text-xs" dangerouslySetInnerHTML={{ __html: map }} />
      </div>
    </div>
  );
}

export default Sidebar;
