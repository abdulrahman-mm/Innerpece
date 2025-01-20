import React, { useEffect, useState } from "react";
import { IoCompassSharp } from "react-icons/io5";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

function Hero() {
  const [homeImage, setHomeImage] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
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
    
  return (
    <div className="hero-container relative">
      {loading ? (
        <div className="relative h-[40vh] md:h-screen  bg-gray-300 rounded animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-200 rounded"></div>
        </div>
      ) : (
        homeImage.length > 0 && (
          <Carousel
            responsive={responsive}
            pauseOnHover={false}
            arrows={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            draggable={false}
            swipeable={true}
            customTransition="all 0.5s ease-in-out"
          >
            {homeImage.map((image) => (
              <div
                key={image.id}
                className="carousel-item relative h-[40vh] md:h-[60vh] w-screen"
              >
                {/* Black gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>

                {/* Image */}
                <img
                  className="absolute inset-0 h-full w-full object-cover  "
                  src={`https://backoffice.innerpece.com/${image.slider_image}`}
                  alt={image.slider_name}
                  loading="lazy"
                />

                {/* <p className="text-white uppercase [text-shadow:2px_2px_3px_#000000]  z-10  absolute top-5 sm:top-20  left-5 md:left-14 text-lg md:text-5xl ">
                  {image.slider_name}
                </p> */}

                <div className="flex w-full px-5 md:px-20 mt-5 md:mt-20 items-center absolute justify-center">
                  <p className="text-white flex uppercase font-semibold text-center  z-10   top-5 sm:top-20 text-lg md:text-3xl lg:text-4xl xl:text-5xl ">
                    {image.slider_name}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )
      )}
      {homeImage.length > 0 && (
        <div className="w-100%  flex  absolute bottom-1  left-[2%] right-[2%] md:left-[10%] md:right-[10%]   justify-center ">
          {/* <div className="   justify-center  bg-white flex  flex-shrink flex-row flex-wrap md:flex-nowrap sm:gap-2 gap-1 rounded mx-1 px-2 sm:px-0 sm:ps-1 py-1 sm:py-0   md:rounded-3xl shadow-2xl shadow-white/40">
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
          </div> */}

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
                className="text-center text-sm sm:text-base md:text-lg lg:text-xl"
                onClick={handleSearch}
              >
                Find Now
              </p>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Hero;
