import React from "react";
import VideoBox1 from "../assets/VideoBox1.png";
import VideoBox2 from "../assets/VideoBox2.png";
import VideoBox3 from "../assets/VideoBox3.png";

function OurStory() {
  return (
    <div className="bg-gradient-to-b mt-24 pb-20 px-5 md:px-12  lg:px-24  xl:px-32 from-sky-800 to-black ">
      
      <div className="flex pt-16 items-center gap-8 w-full md:w-2/3">
        <hr className="w-80 border-white" />

        <div className="flex flex-col gap-3 text-white">
          <p className="tracking-widest text-2xl">OUR STORY</p>
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            Vel malesuada odio id lectus viverra
          </p>
        </div>
      </div>

      <div className="flex flex-wrap flex-shrink gap-2 items-center justify-center mt-14">
        <img src={VideoBox1} alt="" className="flex-wrap flex-shrink" />
        <img src={VideoBox2} alt="" className="flex-wrap flex-shrink" />
        <img src={VideoBox3} alt="" className="flex-wrap flex-shrink" />
      </div>

      <div className="flex items-center justify-between mt-14">
          <p className="w-1/2 text-white/50">Velit ultrices sed lobortis tristique. Quam cras sollicitudin cum amet eget praesent. Semper mollis posuere tincidunt lorem sit adipiscing tincidunt ut amet. Malesuada tincidunt risus in aliquet platea sapien. Netus amet.</p>
          <button className=" bg-white px-6 py-3 rounded-full">Get Started</button>
      </div>
    </div>
  );
}

export default OurStory;
