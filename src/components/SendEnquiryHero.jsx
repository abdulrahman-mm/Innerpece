import React from "react";
import { useNavigate } from "react-router-dom";

const SendEnquiryHero = () => {
  let navigate = useNavigate();
  return (
    <div className="bg-[url('././assets/sendenquiry_coverimage_2.jpeg')]  h-[30vh] md:h-[50vh]  w-full bg-no-repeat bg-cover bg-center">
      <div className="flex flex-col h-full items-center justify-center gap-5">
        <p className="text-white text-xl px-5 text-center sm:text-2xl md:text-3xl lg:text-4xl font-medium md:font-bold">
          We take people on road trips in search of peace
        </p>
        <div className="flex gap-5">
          <p
            className="text-sky-200 cursor-pointer hover:text-white"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p className="text-white">Enquiry</p>
        </div>
      </div>
    </div>
  );
};

export default SendEnquiryHero;
