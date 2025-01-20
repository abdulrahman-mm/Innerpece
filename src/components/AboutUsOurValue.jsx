import React from "react";
import ourvalueimg1 from "../assets/ourvalueimg1.png";
import ourvalueimg2 from "../assets/ourvalueimg2.png";
import ourvalueimg3 from "../assets/ourvalueimg3.png";

function OurValue() {
  return (
    <div className="ms-3 me-3 mt-8 md:mt-16 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 ">
      <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">OUR VALUE</p>
     

      <div className="flex flex-col mt-5 md:mt-14 items-center ">
        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-5 md:gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-sky-800 w-12" />
            <p className="text-2xl font-semibold text-sky-900">Individual Impact</p>
          </div>

          <img src={ourvalueimg1} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-gray-600 text-xl">
            At Innerpece, your well-being is our passion. We understand the struggles of anxiety and depression, and we're here to help you embrace peace, clarity, and joy, guiding you to your happiest self.
            </p>
          </div>
        </div>

        <hr className="w-full mt-5 mb-5  md:mt-14 md:mb-14 border-sky-800/20" />

        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-sky-800 w-12" />
            <p className="text-2xl font-semibold text-sky-900">
            Social Impact
            </p>
          </div>

          <img src={ourvalueimg2} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-gray-600 text-xl">
            Our vision is a world where kindness and compassion lead. Through unity in communities, we create a society where love and empathy flourish, one peaceful heart at a time.
            </p>
          </div>
        </div>

        <hr className="w-full mt-5 mb-5 md:mt-14 md:mb-14 border-sky-800/20" />

        <div className="flex flex-col lg:flex-row flex-wrap items-center gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-sky-800 w-12" />
            <p className="text-2xl font-semibold text-sky-900">
            Industry Impact
            </p>
          </div>

          <img src={ourvalueimg3} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-gray-600 text-xl">
            We don’t stop at individual well-being; our passion extends to workplaces. By fostering a positive environment, we help businesses unlock their potential, driving innovation, productivity, and a wave of positivity across the industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurValue;
