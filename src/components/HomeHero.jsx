import React, { useEffect, useState } from "react";
import { IoCompassSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [homeImage, setHomeImage] = useState([]);
  const [cityName, setCityName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

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
        .replace(/-+/g, "-")          // Replace multiple hyphens with a single one
        .replace(/^-+|-+$/g, "");     // Trim hyphens from the start and end

      navigate(`/home-filter/${formattedCityName}`, {
        state: { city_name: cityName, date: selectedDate  },
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
                className="h-[90vh] md:h-screen absolute w-screen object-cover"
                src={`https://backoffice.innerpece.com/${image.slider_image}`}
                alt={image.slider_name}
              />
              
              <p
                className="text-white tracking-widest  absolute top-40 left-7 md:top-40 md:left-28 text-xl md:text-4xl "
                style={{ "text-shadow": "2px 2px 3px #000000" }}
              >
                {image.slider_name}
              </p>
              <p
                className="text-white font-bold absolute left-7 top-72 md:top-72 lg:top-64 xl:top-56 md:left-28 text-lg md:text-5xl lg:text-4xl"
                style={{ "text-shadow": "2px 2px 8px #000000" }}
              >
                {image.subtitle}
              </p>
           
            </div>
          ))}
        </Carousel>
      )}

      <div className="w-100%  flex  absolute bottom-3 left-[2%] right-[2%] md:left-[10%] md:right-[10%]   justify-center ">
        <div className="   justify-center  bg-white flex  flex-shrink flex-row flex-wrap md:flex-nowrap gap-2 rounded px-2 sm:px-0 sm:ps-2 py-1 sm:py-0  lg:rounded-full shadow-2xl shadow-white/40">
          <div
            className="flex ps-5 flex-grow basis-[5%] lg:basis-[7%]   flex-shrink  items-center gap-3 border-gray-400 border-2 rounded md:rounded-3xl py-3 
         lg:mx-2 my-1 sm:my-2 md:my-4 "
          >
            <IoCompassSharp className="text-2xl text-blue-900" />
            <input
              type="text"
              placeholder="Where to?"
              className="border-none w-20  lg:w-36 me-5 outline-none  flex-shrink"
              value={cityName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-grow  basis-[5%] lg:basis-[7%]  flex-shrink   items-center gap-3 border-gray-400 border-2 rounded md:rounded-3xl lg:px-8 py-3 lg:mx-2 my-1 sm:my-2 md:my-4">

            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange} 
              className="border-2 p-2 rounded"
            />
          </div>

          <div className="cursor-pointer mx-2 lg:mx-0   my-1 lg:my-0  basis-[5%] lg:basis-[7%] flex-grow  bg-gradient-to-b from-sky-800 to-sky-950 px-7 lg:px-14 py-2 md:py-4 rounded-e  lg:rounded-e-full flex items-center justify-center  ">
            <p 
            className="  md:text-xl lg:text-2xl text-center font-semibold text-white"
            onClick={handleSearch} 
            >
              Find Now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
