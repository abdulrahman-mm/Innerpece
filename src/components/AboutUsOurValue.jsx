import React from "react";
import ourvalueimg1 from "../assets/ourvalueimg1.png";
import ourvalueimg2 from "../assets/ourvalueimg2.png";
import ourvalueimg3 from "../assets/ourvalueimg3.png";

function OurValue() {
  return (
    <div className="ms-3 me-3 mt-8 md:mt-16 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20 ">
      <p className="text-xl text-gray-700">OUR VALUE</p>
      <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold w-full md:w-1/3">
        Ac gravida at arcu vitae ut nulla. Sed
      </p>

      <div className="flex flex-col mt-5 md:mt-14 items-center ">
        <div className="flex flex-col md:flex-row flex-wrap items-center gap-5 md:gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-sky-800 w-12" />
            <p className="text-2xl font-semibold text-sky-900">Tellus est et</p>
          </div>

          <img src={ourvalueimg1} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-gray-600 text-xl">
              Nisi venenatis eu nunc sem. Turpis aenean tortor rhoncus eget quam
              laoreet turpis viverra justo. Massa dignissim enim diam in. Diam
              imperdiet ornare elit rhoncus diam gravida pharetra. Turpis
              integer lectus et.
            </p>
          </div>
        </div>

        <hr className="w-full mt-5 mb-5  md:mt-14 md:mb-14 border-sky-800/20" />

        <div className="flex flex-col md:flex-row flex-wrap items-center gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-sky-800 w-12" />
            <p className="text-2xl font-semibold text-sky-900">
              Turpis non lorem
            </p>
          </div>

          <img src={ourvalueimg2} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-gray-600 text-xl">
              At integer nibh lacus tortor. Aenean enim mi ipsum aenean
              adipiscing eu faucibus. Nibh pharetra nulla arcu faucibus proin
              elit. Ante convallis felis scelerisque et arcu blandit. Elementum
              elit viverra cras blandit convallis.
            </p>
          </div>
        </div>

        <hr className="w-full mt-5 mb-5 md:mt-14 md:mb-14 border-sky-800/20" />

        <div className="flex flex-col md:flex-row flex-wrap items-center gap-8 justify-between">
          <div className="flex items-center  gap-5 basis-[20%]">
            <hr className="border-sky-800 w-12" />
            <p className="text-2xl font-semibold text-sky-900">
              Enim sit dignissim
            </p>
          </div>

          <img src={ourvalueimg3} alt="" className="basis-[30%] flex-wrap" />

          <div className="flex flex-col basis-[30%] gap-8 flex-wrap">
            <p className="text-gray-600 text-xl">
              Eget convallis mattis vel ligula amet nulla lacinia quam
              malesuada. A pharetra massa pulvinar nulla. Eget nec nunc
              tristique sed non gravida. Ut auctor tellus suscipit ultrices est
              pretium. Mus odio et turpis lacinia sit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurValue;
