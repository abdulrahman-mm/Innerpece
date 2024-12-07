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
          <p className="mt-3 text-gray-600 md:text-lg">
            We are excited to introduce Innerpece, a platform dedicated to
            providing meaningful travel experiences that focus on nurturing
            mental well-being and personal growth. Our carefully curated travel
            programs offer a much-needed mental break while allowing you to
            connect with innovative entrepreneurs and inspiring creators. Our
            main objective is to assist you in finding deeper happiness and
            inner pece through these experiences.
          </p>

          <p className="mt-3 text-gray-600 md:text-lg">
            In addition, we understand the importance of family time and offer
            tailored travel programs designed for families. Explore the beauty
            and cultural richness of India with our private itineraries, aimed
            at creating unforgettable moments and strengthening family bonds.
          </p>

          <p className="mt-3 text-gray-600 md:text-lg">
            At Innerpece, we are deeply committed to the transformative power of
            travel. Let us guide you on a journey that not only refreshes your
            mind but also enriches your life. Discover how our unique travel
            experiences can lead you to a path of greater fulfillment and
            connection.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
