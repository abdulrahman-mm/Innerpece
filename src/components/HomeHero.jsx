import React, { useEffect, useState } from "react";
import { IoCompassSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Hero() {
  const [homeImage, setHomeImage] = useState([]);

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

        .get(`https://backoffice.innerpece.com/api/slider`)
        .then((response) => {
          setHomeImage(response.data.sliders);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getApiData();
  }, []);

  return (
    <div className="hero-container">
      {homeImage.length > 0 && (
        <Carousel
          responsive={responsive}
          pauseOnHover={false}
          arrows={false}
          infinite={true} // Enable infinite looping
          autoPlay={true} // Start autoplay on load
          autoPlaySpeed={5000} // Set autoplay speed in milliseconds
          draggable={false} // Disable manual dragging (optional)
          swipeable={true} // Enable swiping (optional)
          // showDots={true} // Display navigation dots
          customTransition="all 0.5s ease-in-out" // Set a smooth transition animation
          // removeArrowOnDeviceType={["mobile"]} // Hide arrows on mobile devices (optional)
        >
          {homeImage.map((image) => (
            <div key={image.id} className="carousel-item h-screen w-screen">
              <img
                className="h-screen absolute w-screen object-cover"
                src={`https://backoffice.innerpece.com/${image.slider_image}`}
                alt={image.slider_name}
              />
              {/* <p className="absolute top-12 text-center font-serif text-gray-800 text-3xl lg:text-3xl xl:text-4xl text-red font-bold inset-0">
                {image.slider_name}
              </p>
              <p className="absolute top-48 md:top-36 font-serif left-[10%] right-[10%] text-center text-xl lg:text-2xl xl:text-3xl text-white font-bold inset-0">
                {image.subtitle}
              </p> */}
              <p
            className="text-white tracking-widest  absolute top-40 left-7 md:top-40 md:left-28 text-2xl md:text-4xl "
            style={{ "text-shadow": "2px 2px 3px #000000" }}
          >
            {image.slider_name}
          </p>
          <p
            className="text-white font-bold absolute left-7 top-72 md:top-72 lg:top-64 xl:top-56 md:left-28 text-3xl md:text-5xl lg:text-4xl"
            style={{ "text-shadow": "2px 2px 8px #000000" }}
          >
            {image.subtitle}
          </p>
          {/* <p
            className="text-white font-bold absolute top-56 left-7 md:top-60 md:left-28 text-2xl  md:text-3xl lg:text-4xl"
            style={{ "text-shadow": "2px 2px 8px #000000" }}
          >
            Boundaries...
          </p> */}
            </div>
          ))}
        </Carousel>
      )}

      <div className="w-100% max-md:hidden flex  absolute bottom-3 left-[2%] right-[2%] md:left-[10%] md:right-[10%]   justify-center ">
        <div className="   justify-center  bg-white flex  flex-shrink flex-row flex-wrap md:flex-nowrap gap-2 rounded-2xl lg:rounded-full shadow-2xl shadow-white/40">
          <div
            className="flex ps-5 flex-grow basis-[5%] lg:basis-[7%]   flex-shrink  items-center gap-3 border-gray-400 border-2 rounded-3xl py-3 
         lg:mx-2 my-1 sm:my-2 md:my-4 "
          >
            <IoCompassSharp className="text-2xl text-blue-900" />
            <input
              type="text"
              placeholder="Where to?"
              className="border-none w-fit me-5 outline-none  flex-shrink"
            />
          </div>

          <div className="flex flex-grow  basis-[5%] lg:basis-[7%]  flex-shrink   items-center gap-3 border-gray-400 border-2 rounded-3xl lg:px-8 py-3 lg:mx-2 my-1 dm:my-2 md:my-4">
            <MdCalendarMonth className="text-2xl text-blue-900" />
            <select className="border-none w-20 me-5 outline-none appearance-none flex-grow">
              <option
                disabled
                selected
                value="Select Month"
                className="text-gray-400"
              >
                Select Month
              </option>
              <option value="b">January</option>
              <option value="c">February</option>
              <option value="d">March</option>
              <option value="e">April</option>
              <option value="e">May</option>
              <option value="e">June</option>
              <option value="e">July</option>
              <option value="e">August</option>
              <option value="e">September</option>
              <option value="e">October</option>
              <option value="e">November</option>
              <option value="e">December</option>
            </select>
            {/* <IoIosArrowDown className="text-xl md:text-2xl" /> */}
          </div>

          <div className="flex flex-grow  basis-[5%] lg:basis-[7%]  flex-shrink    items-center gap-3 border-gray-400 border-2 rounded-3xl lg:px-8 py-3 lg:mx-2 my-1 sm:my-2 md:my-4">
            <HiMiniUsers className="text-2xl text-blue-900" />
            <select className="border-none me-5 outline-none w-20 appearance-none flex-grow">
              <option disabled selected value="">
                Guests
              </option>
              <option value="b">Type 1</option>
              <option value="c">Type 2</option>
              <option value="d">Type 3</option>
            </select>
            {/* <IoIosArrowDown className="text-xl md:text-2xl" /> */}
          </div>

          <div className="cursor-pointer   basis-[5%] lg:basis-[7%] flex-grow  bg-gradient-to-b from-sky-800 to-sky-950 rounded-2xl md:px-7 lg:px-14 py-1 md:py-4 lg:rounded-e-full flex items-center justify-center  ">
            <p className="text-lg  md:text-xl lg:text-2xl font-semibold text-white">
              Find Now
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Hero;

{
  /* <div className="w-100%  absolute bottom-5 left-[2%] right-[2%] md:left-[10%] md:right-[10%]  flex justify-center ">
            <div className="  px-2  md:px-0 justify-center  bg-white flex  flex-shrink flex-row flex-wrap md:flex-nowrap gap-2 rounded-2xl lg:rounded-full shadow-2xl shadow-white/40">
              <div
                className="flex  flex-grow basis-[5%] lg:basis-[7%]   flex-shrink  items-center gap-3 border-gray-400 border-2 rounded-3xl py-1 md:py-3 
         lg:mx-2 my-1 sm:my-2 md:my-4 "
              >
                <IoCompassSharp className="text-2xl text-blue-900" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="border-none outline-none  flex-shrink"
                />
              </div>

              <div className="flex flex-grow  basis-[5%] lg:basis-[7%]  flex-shrink   items-center gap-3 border-gray-400 border-2 rounded-3xl lg:px-8 py-1 md:py-3 lg:mx-2 my-1 dm:my-2 md:my-4">
                <MdCalendarMonth className="text-2xl text-blue-900" />
                <select className="border-none w-20 outline-none appearance-none flex-grow">
                  <option value="" className="text-gray-400">
                    Select Month
                  </option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                  <option value="e">e</option>
                </select>
                <IoIosArrowDown className="text-xl md:text-2xl" />
              </div>

              <div className="flex flex-grow  basis-[5%] lg:basis-[7%]  flex-shrink    items-center gap-3 border-gray-400 border-2 rounded-3xl lg:px-8 py-1 md:py-3 lg:mx-2 my-1 sm:my-2 md:my-4">
                <HiMiniUsers className="text-2xl text-blue-900" />
                <select className="border-none outline-none w-20 appearance-none flex-grow">
                  <option value="">Guests</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                  <option value="e">e</option>
                </select>
                <IoIosArrowDown className="text-xl md:text-2xl" />
              </div>

              <div className="cursor-pointer   basis-[5%] lg:basis-[7%] flex-grow  bg-gradient-to-b from-sky-800 to-sky-950 rounded-2xl md:px-7 lg:px-14 py-1 md:py-4 lg:rounded-e-full flex items-center justify-center  ">
                <p className="text-lg  md:text-xl lg:text-2xl font-semibold text-white">
                  Find Now
                </p>
              </div>
            </div>
          </div> */
}

// <div key={index} className={`h-screen bg-[url('./assets/HomeHero.png')] relative  bg-cover bg-center bg-no-repeat`}>

{
  /* <p
            className="text-white tracking-widest  absolute top-40 left-7 md:top-40 md:left-28 "
            style={{ "text-shadow": "2px 2px 3px #000000" }}
          >
            CHOOSE THE BEST DESTINATION
          </p>
          <p
            className="text-white font-bold absolute top-48 left-7 md:top-48 md:left-28 text-2xl  md:text-3xl lg:text-4xl"
            style={{ "text-shadow": "2px 2px 8px #000000" }}
          >
            Adventure Without
          </p>
          <p
            className="text-white font-bold absolute top-56 left-7 md:top-60 md:left-28 text-2xl  md:text-3xl lg:text-4xl"
            style={{ "text-shadow": "2px 2px 8px #000000" }}
          >
            Boundaries...
          </p> */
}
