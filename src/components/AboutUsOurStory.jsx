import React from "react";
import VideoBox1 from "../assets/VideoBox1.png";
import VideoBox2 from "../assets/VideoBox2.png";
import VideoBox3 from "../assets/VideoBox3.png";
import { useNavigate } from "react-router-dom";

function OurStory() {
  let navigate = useNavigate();

  function handleBtnClick() {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  return (
    <div className="bg-gradient-to-b mt-8 md:mt-16 pb-5 md:pb-20 px-5 md:px-12  lg:px-24  xl:px-32 from-sky-800 to-black ">
      <div className="flex pt-8 md:pt-16 items-center gap-8 w-full md:w-2/3">
        <hr className="w-80 border-white" />

        <div className="flex flex-col gap-3 text-white">
          <p className="tracking-widest text-2xl">OUR STORY</p>
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
          The Journey to Innerpece
          </p>
        </div>
      </div>

      <div className="flex flex-wrap flex-shrink gap-5 items-center justify-center mt-5 md:mt-14">
        <img src={VideoBox1} alt="" className="flex-wrap flex-shrink hover:brightness-125 cursor-pointer" />
        <img src={VideoBox2} alt="" className="flex-wrap flex-shrink hover:brightness-125 cursor-pointer" />
        <img src={VideoBox3} alt="" className="flex-wrap flex-shrink hover:brightness-125 cursor-pointer" />
      </div>

      <div className="flex items-center justify-between mt-14">
        <p className="w-1/2 text-white/50">
        At Innerpece, we understand the struggles of anxiety, depression, and life’s challenges. Our journey began with a desire to help others find peace, not as a destination, but as a transformative journey. 
        </p>
        <button
          onClick={handleBtnClick}
          className=" bg-white hover:bg-blue-300 px-6 py-3 rounded-full"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default OurStory;
