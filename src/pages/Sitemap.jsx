import React from "react";
import { useNavigate } from "react-router-dom";

const Sitemap = () => {
  let navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center bg-gray-100">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Home
      </button>

      <button
        onClick={() => navigate("/programsdetails/workations-in-the-himalayas")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Programs Details
      </button>

      <button
        onClick={() => navigate("/destinationsdetails/tamilnadu")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Destination Details
      </button>

      <button
        onClick={() => navigate("/sendenquiry")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Send Enquiry
      </button>
      <button
        onClick={() => navigate("/aboutus")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        About{" "}
      </button>
      <button
        onClick={() => navigate("/contactus")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Contact Us
      </button>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/privacypolicy")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Privacy Policy
      </button>
      <button
        onClick={() => navigate("/termsofservice")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Terms of Service
      </button>
    </div>
  );
};

export default Sitemap;
