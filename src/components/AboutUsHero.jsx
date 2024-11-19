import React from "react";
import image1 from "../assets/Image1.png";
import image2 from "../assets/Image2.png";
import image3 from "../assets/Image3.png";

function Hero() {
  return (
    <div className="ms-3 me-3 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-20 xl:me-20">
      <p className="text-center font-bold text-2xl md:text-4xl mt-8 md:mt-16 tracking-wide">
        ABOUT US
      </p>

      <div className="flex mt-5 md:mt-14 flex-col md:flex-row items-start justify-start md:gap-10 ">
        <div className=" grid grid-cols-2 items-start justify-center gap-3 basis-[40%]">
          <img src={image2} alt="" className="row-span-2  bg-cover" />

          <img src={image1} alt="" className=" bg-cover" />
          <img src={image3} alt="" className=" bg-cover" />
        </div>

        <div className="basis-[60%]">
          <p className="text-gray-600 tracking-widest font-semibold mt-5 md:mt-0">
            ABOUT US
          </p>
          <p className="font-semibold text-2xl md:text-3xl lg:text-5xl mt-3">
            Tincidunt eu aliquam
          </p>

          <p className="text-xl font-semibold mt-5 md:mt-8 text-blue-950">
            Our Vision
          </p>
          <p className="mt-3 text-gray-600">
            Massa ut egestas mattis lectus suscipit. Malesuada nibh gravida enim
            ac dapibus tincidunt. At varius non integer purus at gravida
            accumsan volutpat. Nisl senectus malesuada lacus erat proin maecenas
            sapien sit.Massa ut egestas mattis lectus suscipit. Malesuada nibh
            gravida enim ac dapibus tincidunt. At varius non integer purus at
            gravida accumsan volutpat. Nisl senectus malesuada lacus erat proin
            maecenas sapien sit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
