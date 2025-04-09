import React from "react";
import image1 from "../assets/Image1.png";
import image2 from "../assets/Image2.png";
import image3 from "../assets/Image3.png";

function Hero() {
  return (
    <div className="ms-3 me-3 md:ms-6 md:me-6 lg:ms-12 lg:me-12 xl:ms-28 xl:me-28">
      <p className="text-center font-mulish font-bold text-2xl md:text-4xl lg:text-5xl mt-8 md:mt-20 tracking-wide">
        ABOUT US
      </p>

      <div className="flex mt-5 md:mt-14 flex-col lg:flex-row items-start justify-start md:gap-10 lg:gap-28 ">
        <div className=" grid grid-cols-2 items-start justify-center mx-auto gap-3 basis-[40%]">
          <img src={image2} alt="" className="row-span-2  bg-cover w-full " />

          <img src={image1} alt="" className=" bg-cover  w-full" />
          <img src={image3} alt="" className=" bg-cover w-full" />
        </div>

        <div className="basis-[60%] font-raleway">
          <p className="mt-3 text-gray-600 ">
          At Innerpece, we create transformative programs that lead you to peace avenue. Our carefully curated offerings help you reconnect with your inner peace, focusing on mental well-being and personal growth. For entrepreneurs, creators, and freelancers, our workcations in serene environments like the Himalayas provide the perfect escape from the hustle, allowing you to work in peace, recharge, and reignite your creativity.

          </p>

          <p className="mt-3 text-gray-600 ">
          We also offer offbeat car and bike rides to explore new horizons, blending productivity with tranquility. Additionally, we provide travel programs for families, designed to create unforgettable moments and strengthen family bonds. Explore India’s cultural richness through our private itineraries, making lasting memories.
          </p>

          <p className="mt-3 text-gray-600 ">
          We believe in the transformative power of travel. Our programs are crafted to help you find happiness, fulfillment, and deeper connections. Join us, and let us guide you on a journey that refreshes your mind and enriches your life.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
