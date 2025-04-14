import React, { useEffect, useState, useCallback } from "react";
import { IoCompassSharp } from "react-icons/io5";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import common_rooms_zostel from "../assets/mountain.png";
import { IoStarSharp } from "react-icons/io5";
import call_icon from "../assets/call-white.svg";
import map_white from "../assets/map-white.svg";
import group from "../assets/Group.svg";

function Hero() {
  const [homeImage, setHomeImage] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [homeImage.length]);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Update date state on change
  };

  const handleSearch = () => {
    if (cityName.trim()) {
      const formattedCityName = cityName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replace special characters with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single one
        .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

      navigate(`/home-filter/${formattedCityName}`, {
        state: { city_name: cityName, date: selectedDate },
      });
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    async function getApiData() {
      await axios

        .get(`https://backoffice.innerpece.com/api/v1/get-combined-data`)
        .then((response) => {
          setHomeImage(response.data.data.sliders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    getApiData();
  }, []);

  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-container relative overflow-hidden">
      {loading ? (
        <div className="relative h-[40vh] md:h-screen  bg-gray-300 rounded animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-200 rounded"></div>
        </div>
      ) : (
        // <Carousel
        //   responsive={responsive}
        //   pauseOnHover={false}
        //   arrows={false}
        //   infinite={true}
        //   autoPlay={true}
        //   autoPlaySpeed={5000}
        //   draggable={false}
        //   swipeable={true}
        //   customTransition="all 0.5s ease-in-out"
        // >
        //   {homeImage.map((image) => (
        //     <div
        //       key={image.id}
        //       className="carousel-item relative h-[40vh] md:h-[60vh] w-screen"
        //     >
        //       {/* Black gradient overlay */}
        //       <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>

        //       {/* Image */}
        //       <img
        //         className="absolute inset-0 h-full w-full object-cover  "
        //         src={`https://backoffice.innerpece.com/${image.slider_image}`}
        //         alt={image.slider_name}
        //         loading="lazy"
        //       />

        //       <div className="flex w-full px-5 md:px-20 mt-5 md:mt-20 items-center absolute justify-center">
        //         <p className="text-white flex uppercase font-semibold text-center  z-10   top-5 sm:top-20 text-lg md:text-3xl lg:text-4xl xl:text-5xl ">
        //           {image.slider_name}
        //         </p>
        //       </div>
        //     </div>
        //   ))}
        // </Carousel>

        //       <div className="relative overflow-hidden w-full h-[40vh] md:h-[60vh]">
        //   <div className="relative w-full h-full" ref={emblaRef}>
        //     <div className="relative w-full h-full">
        //       {homeImage.map((image, index) => (
        //         <div
        //           key={image.id}
        //           className={`absolute inset-0 transition-opacity duration-1000 ${
        //             index === selectedIndex ? "opacity-100" : "opacity-0"
        //           }`}
        //         >
        //           {/* Black Gradient Overlay */}
        //           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>

        //           {/* Image */}
        //           <img
        //             className="absolute inset-0 w-full h-full object-cover"
        //             src={`https://backoffice.innerpece.com/${image.slider_image}`}
        //             alt={image.slider_name}
        //             loading="lazy"
        //           />

        //           {/* Text Overlay */}
        //           <div className="absolute inset-0 flex items-center justify-center px-5 md:px-20 mt-5 md:mt-20">
        //             <p className="text-white uppercase font-semibold text-center z-10 text-lg md:text-3xl lg:text-4xl xl:text-5xl">
        //               {image.slider_name}
        //             </p>
        //           </div>
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // </div>
        // <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        //   {homeImage.map((image, index) => (
        //     <div
        //       key={image.id}
        //       className={`absolute inset-0 transition-opacity duration-1000 ${
        //         index === currentIndex ? "opacity-100" : "opacity-0"
        //       }`}
        //     >
        //       {/* <p className="text-white absolute  z-30  text-sm mt-10 sm:mt-20 md:mt-24 lg:mt-32 px-5 md:px-20">
        //         CHOOSE THE BEST DESTINATION
        //       </p> */}

        //       {/* Black Gradient Overlay */}
        //       {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div> */}

        //       {/* Image */}
        //       <img
        //         className="absolute inset-0 w-full h-full object-cover"
        //         src={`https://backoffice.innerpece.com/${image.slider_image}`}
        //         alt={image.slider_name}
        //         loading="lazy"
        //       />

        //       <div className="flex flex-col h-full w-full px-5 md:px-20  justify-center absolute ">
        //         <p
        //           style={{ "text-shadow": "4px 4px 3px rgba(0,0,0,0.7)" }}
        //           className="text-white flex font-jost  md:w-2/3     sm:top-20 text-lg md:text-3xl lg:text-4xl "
        //         >
        //           {image.slider_name}
        //         </p>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        // <div className="relative w-full h-[40vh] md:h-[90vh] overflow-hidden">
        //   <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent from- to-black"></div>
        //   <img
        //     src={common_rooms_zostel}
        //     alt=""
        //     className="absolute inset-0 w-full h-full object-cover"
        //   />
        //   <div className="absolute inset-0 flex items-center z-10 justify-center px-5 md:px-20">
        //     <p
        //       style={{ textShadow: "3px 3px 3px rgba(0, 0, 0, 0.8)" }}
        //       className="text-white uppercase font-semibold text-center  text-lg md:text-3xl font-jost lg:text-4xl xl:text-5xl"
        //     >
        //       More Travel More Peace
        //     </p>
        //   </div>
        //   <div className="flex absolute w-full z-10 bottom-8 font-jost text-white items-center justify-between px-5 md:px-36">
        //     <div className="flex gap-3 justify-center items-center">
        //       <p className="font-semibold text-3xl">4.8</p>
        //       <div className="flex flex-col gap-1 ">
        //         <p className="font-semibold text-xl">Google Rating</p>
        //         <div className="flex ">
        //           <IoStarSharp className="text-yellow-400" />
        //           <IoStarSharp className="text-yellow-400" />
        //           <IoStarSharp className="text-yellow-400" />
        //           <IoStarSharp className="text-yellow-400" />
        //           <IoStarSharp className="text-yellow-400" />
        //         </div>
        //       </div>
        //     </div>

        //     <div className="flex gap-3 justify-center items-center">
        //       <img src={group} alt="" />
        //       <div className="flex flex-col gap-1 ">
        //         <p className="font-semibold text-xl">Trusted by</p>
        //         <p className="text-sm">100k+ Travellers</p>
        //       </div>
        //     </div>

        //     <div className="flex gap-3 justify-center items-center">
        //       <img src={map_white} alt="" />
        //       <div className="flex flex-col gap-1 ">
        //         <p className="font-semibold text-xl">Customized Trips</p>
        //         <p className="text-sm">200+ Iteneraries</p>
        //       </div>
        //     </div>

        //     <div className="flex gap-3 justify-center items-center">
        //       <img src={call_icon} alt="" />
        //       <div className="flex flex-col gap-1 ">
        //         <p className="font-semibold text-xl">24/7 Support</p>
        //         <p className="text-sm">Let us help</p>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden">
          {/* Parallax Image */}
          <img
            src={common_rooms_zostel}
            alt=""
            className="absolute inset-0 w-full h-full object-cover overflow-hidden"
            style={{ transform: `translateY(${offsetY * 0.3}px)` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute w-full h-full z-10 bg-gradient-to-b from-transparent to-black"></div>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center z-10 justify-center px-5 md:px-20">
            <p
              style={{ textShadow: "3px 3px 3px rgba(0, 0, 0, 0.8)" }}
              className="text-white uppercase font-semibold text-center text-2xl md:text-3xl font-jost lg:text-4xl xl:text-5xl"
            >
              <span className="max-md:hidden">More Travel More Peace</span>
              <p className="md:hidden">More Travel</p>
              <p className="md:hidden">More Peace </p>
            </p>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8  absolute w-full z-10 bottom-8 font-jost text-white items-center justify-between px-5 md:px-14 lg:px-16">
            {/* Google Rating */}
            <div className="flex gap-2 md:gap-3  items-center justify-center  ">
              <p className="font-semibold text-lg md:text-3xl">5.0</p>
              <div className="flex flex-col gap-1">
                <p className="font-medium md:font-semibold text-sm md:text-xl">
                  Google Rating
                </p>
                <div className="flex">
                  <IoStarSharp className="text-yellow-400" />
                  <IoStarSharp className="text-yellow-400" />
                  <IoStarSharp className="text-yellow-400" />
                  <IoStarSharp className="text-yellow-400" />
                  <IoStarSharp className="text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Trusted By */}
            <div className="flex gap-2 md:gap-3  items-center justify-center">
              <img src={group} alt="" className="h-6 w-6 md:h-8 md:w-8" />
              <div className="flex flex-col gap-1">
                <p className="font-medium md:font-semibold text-sm md:text-xl">
                  Trusted by
                </p>
                <p className="text-xs md:text-sm">10k+ Travellers</p>
              </div>
            </div>

            {/* Customized Trips */}
            <div className="flex gap-2 md:gap-3  items-center justify-center">
              <img src={map_white} alt="" className="h-6 w-6 md:h-8 md:w-8" />
              <div className="flex flex-col gap-1">
                <p className="font-medium md:font-semibold text-sm md:text-xl">
                  Customized Trips
                </p>
                <p className="text-xs md:text-sm">200+ Iteneraries</p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex gap-2 md:gap-3  items-center justify-center">
              <img src={call_icon} alt="" className="h-6 w-6 md:h-8 md:w-8" />
              <div className="flex flex-col gap-1">
                <p className="font-medium md:font-semibold text-sm md:text-xl">
                  24/7 Support
                </p>
                <p className="text-xs md:text-sm">Tamil, Hindi & English</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {homeImage.length > 0 && (
        <div className="w-100%  flex  absolute bottom-1  left-[2%] right-[2%] md:left-[10%] md:right-[10%]   justify-center ">
         <div className="   justify-center  bg-white flex  flex-shrink flex-row flex-wrap md:flex-nowrap sm:gap-2 gap-1 rounded mx-1 px-2 sm:px-0 sm:ps-1 py-1 sm:py-0   md:rounded-3xl shadow-2xl shadow-white/40">
            <div
              className="flex  flex-grow basis-[5%] lg:basis-[7%]   flex-shrink  items-center gap-3 border-gray-400 border-2 rounded md:rounded-3xl  
         lg:mx-2 my-2  "
            >
              <IoCompassSharp className="text-2xl ms-2 " />
              <input
                type="text"
                placeholder="Where to?"
                className="border-none w-20 placeholder-black  lg:w-36 me-5 outline-none  flex-shrink"
                value={cityName}
                name="where to"
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-grow  basis-[5%] lg:basis-[7%]  flex-shrink   items-center gap-3 border-gray-400 border-2 rounded md:rounded-3xl lg:px-8 md:py-3 lg:mx-2 my-2">
              <FaRegCalendarAlt className="inline-block md:hidden ms-2" />
              <input
                type="date"
                name="date"
                value={selectedDate}
                autoComplete="off"
                onChange={handleDateChange}
                className="border-none mx-2 rounded outline-none bg-white"
              />
            </div>

            <div className="cursor-pointer  lg:mx-0   my-1 md:my-0  basis-[5%] lg:basis-[7%] flex-grow  bg-gradient-to-b from-sky-800 to-sky-950 px-2 lg:px-14 py-2 md:py-4 rounded-e  md:rounded-e-3xl flex items-center justify-center  ">
              <p
                className="  md:text-xl lg:text-2xl text-center font-semibold text-white"
                onClick={handleSearch}
              >
                Find Now
              </p>
            </div>
          </div> 

           {/* <div className="flex flex-wrap md:flex-nowrap bg-white shadow-2xl shadow-white/40 rounded-lg md:rounded-3xl  px-2 py-2 sm:px-3 sm:py-2 gap-2 sm:gap-3">
            
            <div className="flex flex-grow md:flex-grow-0 gap-1">
              <div className="flex basis-full flex-grow items-center gap-3 border-2 border-gray-400 rounded-lg md:rounded-3xl   md:basis-[25%] lg:basis-[20%] px-2 py-1">
                <IoCompassSharp className="text-xl sm:text-2xl" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="flex-grow border-none placeholder-black outline-none bg-transparent w-full"
                  value={cityName}
                  name="where to"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-grow items-center gap-3 border-2 border-gray-400 rounded-lg md:rounded-3xl  basis-full md:basis-[25%] lg:basis-[20%] px-2 py-1">
                <input
                  type="date"
                  name="date"
                  value={selectedDate}
                  autoComplete="off"
                  onChange={handleDateChange}
                  className="flex-grow border-none outline-none bg-transparent w-full"
                />
              </div>
            </div>

            <div className="cursor-pointer bg-gradient-to-b from-sky-800 to-sky-950 text-white font-semibold rounded-lg md:rounded-3xl flex-grow flex items-center justify-center basis-full sm:basis-[100%] md:basis-[20%] lg:basis-[15%] px-3 py-2">
              <p
                className="text-center text-sm sm:text-sm md:text-lg lg:text-xl"
                onClick={handleSearch}
              >
                Find Now
              </p>
            </div>
          </div>  */}
      {/* </div> */}
      {/* )}  */}
    </div>
  );
}

export default Hero;
