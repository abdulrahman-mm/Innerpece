import React from "react";
import ourmissionimg2 from "../assets/ourmissionimg2.png";
import ourmissionimg1 from "../assets/ourmissionimg1.png";

function OurMission() {
  return (
    <div className="ms-3 me-3 mt-8 md:mt-24 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 ">
      <div className="flex flex-col items-center lg:flex-row justify-start lg:gap-32 xl:gap-48">
      
        <div className="basis-[50%] lg:basis-[30%] gap-8">
          <p className="text-gray-600 tracking-wide font-medium">OUR MISSION</p>
          <p className="text-2xl lg:text-3xl xl:text-5xl font-semibold mt-3">
            Tristique aliquet facilisi massa in
          </p>

          <div className="flex flex-col mt-5 md:mt-14 gap-11 ">
            <div className="flex gap-5">
              <p className="text-blue-900 font-bold">01</p>
              <div className="flex flex-col gap-2">
                <p className="text-blue-900 font-bold">
                  Sed purus dolor fringilla
                </p>
                <p className="text-gray-500">
                  Vitae pharetra dolor convallis non tellus at id. Nisi
                  dignissim dui scelerisque leo aliquam molestie.
                </p>
                <hr className="w-full mt-1 md:mt-6 border-sky-900/20" />
              </div>
            </div>

            <div className="flex gap-5">
              <p className="text-blue-900 font-bold">02</p>
              <div className="flex flex-col gap-2">
                <p className="text-blue-900 font-bold">
                  Enim sit at elit ultrices
                </p>
                <p className="text-gray-500">
                  Proin nibh scelerisque consectetur eget sit. Non arcu amet eu
                  vestibulum id. Leo vitae enim non.
                </p>
                <hr className="w-full mt-1 md:mt-6 border-sky-900/20" />
              </div>
            </div>

            <div className="flex gap-5">
              <p className="text-blue-900 font-bold">03</p>
              <div className="flex flex-col gap-2">
                <p className="text-blue-900 font-bold">
                  Odio ac ullamcorper sed
                </p>
                <p className="text-gray-500">
                  Ullamcorper lacus etiam vitae leo ipsum elementum eget. Id sem
                  iaculis fames risus enim..
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto basis-[20%] mt-8 lg:mt-0 lg:basis-[50%]">
          <img src={ourmissionimg1} alt="" className="  md:w-auto bg-center bg-contain" />
          <img
            src={ourmissionimg2}
            alt=""
            className="max-md:hidden  absolute top-36  sm:top-40 sm:-left-14 md:top-44 md:-left-28  lg:top-44 lg:-left-16 xl:top-44 xl:-left-24 bg-contain bg-center"
          />
        </div>

      </div>
    </div>
  );
}

export default OurMission;
