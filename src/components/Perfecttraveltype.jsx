import React from "react";
import dummy1 from "../assets/dummy1.png";
import dummy2 from "../assets/dummy2.png";
import dummy3 from "../assets/dummy3.png";
import dummy4 from "../assets/dummy4.jpeg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Perfecttraveltype = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  return (
    // <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16 flex gap-10  justify-between">

    //   <div className="flex flex-col w-1/2">
    //     <p className="text-[#000000] text-4xl">Choose Your</p>
    //     <p className="text-[#0E598F] font-extrabold text-4xl">
    //       Perfect Travel Type
    //     </p>
    //     <p className="text-[#000000] text-lg">
    //       We Have Abundance Of Destinations And Activities List For You To
    //       Explore.
    //     </p>
    //   </div>

    //   <div className="flex gap-5  flex-grow">

    //     <img
    //       src={dummy1}
    //       alt=""
    //       className="w-52 h-56 object-cover rounded-2xl"
    //     />
    //     <img
    //       src={dummy2}
    //       alt=""
    //       className="w-52 h-56 object-cover rounded-2xl"
    //     />
    //     <img
    //       src={dummy3}
    //       alt=""
    //       className="w-52 h-56 object-cover rounded-2xl"
    //     />
    //   </div>

    //   <div></div>
    // </div>

    // <div className="mx-5 mt-10 md:mx-16 md:mt-16 flex flex-col md:flex-row flex-wrap justify-between gap-5 md:gap-10">
    //   {/* Text Section */}
    //   <div className="flex flex-col lg:w-1/3 ">
    //     <p className="text-[#000000] text-2xl md:text-3xl  lg:text-4xl">
    //       Choose Your
    //     </p>
    //     <p className="text-[#0E598F] font-extrabold text-2xl md:text-3xl  lg:text-4xl">
    //       Perfect Travel Type
    //     </p>
    //     <p className="text-[#000000] text-sm md:text-lg mt-3">
    //       We Have Abundance Of Destinations And Activities List For You To
    //       Explore.
    //     </p>
    //   </div>

    //   {/* Image Section */}
    //   <Carousel
    //   responsive={responsive}
    //   infinite
    //   autoPlay
    //   autoPlaySpeed={3000}
    //   arrows
    //   keyBoardControl
    //   itemClass="px-2"
    // >
    //   {/* Card 1 */}
    //   <div className="relative  flex-grow rounded-xl overflow-hidden">
    //     <img
    //       src={dummy1}
    //       alt=""
    //       className="absolute w-full h-full object-cover "
    //     />
    //     <div className="absolute w-full h-full z-10 bg-gradient-to-b from-[#4392D0] from-5% to-transparent"></div>
    //     <div className="absolute top-5 w-full z-10 font-rancho text-3xl text-white text-center p-2 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
    //       Trips for Beaches & Water Activities
    //     </div>
    //   </div>

    //   {/* Card 2 */}
    //   <div className="relative w-40 md:w-52 h-44 md:h-56 flex-grow rounded-xl overflow-hidden">
    //     <img
    //       src={dummy4}
    //       alt=""
    //       className="absolute w-full h-full object-cover"
    //     />
    //     <div className="absolute w-full h-full z-10 bg-gradient-to-b from-black/40 from-5% to-transparent"></div>
    //     <div className="absolute top-5 w-full z-10 font-rancho text-3xl text-white text-center p-2 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
    //       Trips for Beaches & Water Activities
    //     </div>
    //   </div>

    //   {/* Card 3 */}
    //   <div className="relative w-40 md:w-52 h-44 md:h-56 flex-grow rounded-xl overflow-hidden">
    //     <img
    //       src={dummy3}
    //       alt=""
    //       className="absolute w-full h-full object-cover"
    //     />
    //     <div className="absolute w-full h-full z-10 bg-gradient-to-b from-yellow-500/40 from-5% to-transparent"></div>
    //     <div className="absolute top-5 w-full z-10 font-rancho text-3xl text-white text-center p-2 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
    //       Trips For Trekking & Hiking
    //     </div>
    //   </div>
    // </Carousel>
    // </div>
    <div className="mx-5 mt-10 md:mx-16 md:mt-16 flex flex-col md:flex-row gap-5 md:gap-10">
      
      {/* Text Section */}
      <div className="w-full md:w-[30%]">
        <p className="text-[#000000] text-2xl md:text-3xl lg:text-4xl">
          Choose Your
        </p>
        <p className="text-[#0E598F] font-extrabold text-2xl md:text-3xl lg:text-4xl">
          Perfect Travel Type
        </p>
        <p className="text-[#000000] text-sm md:text-lg mt-3">
          We Have Abundance Of Destinations And Activities List For You To
          Explore.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="w-full md:w-2/3 rounded-xl">
        <Carousel
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 1280 },
              items: 3,
            },
            desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
            mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
          }}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          arrows={false}
          keyBoardControl
          itemClass="px-2"
          
        >
          {[dummy1, dummy4, dummy3].map((img, index) => (
            <div
              key={index}
              className="relative w-full h-44 sm:h-52 md:h-60 lg:h-64 rounded-xl overflow-hidden"
            >
              <img
                src={img}
                alt="travel type"
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute w-full h-full z-10 bg-gradient-to-b from-black/40 from-5% to-transparent"></div>
              <div className="absolute top-5 w-full z-10 font-rancho text-xl md:text-2xl lg:text-3xl text-white text-center p-2 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                {index === 2
                  ? "Trips For Trekking & Hiking"
                  : "Trips for Beaches & Water Activities"}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Perfecttraveltype;
