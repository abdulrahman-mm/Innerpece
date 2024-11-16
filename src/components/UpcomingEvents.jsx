import React, { useEffect, useState } from "react";
import ue1 from "../assets/ue1.jpg";
import ue2 from "../assets/ue2.jpg";
import ue3 from "../assets/ue3.jpg";
import ue4 from "../assets/ue4.jpg";
import ue5 from "../assets/ue5.jpg";
import ue6 from "../assets/ue6.jpg";
import ue7 from "../assets/ue7.jpg";
import ue8 from "../assets/ue8.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

function UpcomingEvents() {
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);

  const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let navigate = useNavigate();

  const handleCardClick = (id, title) => {
    const formattedTitleName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`${id}/${formattedTitleName}`, {
      state: { id, title },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    async function getApiData() {
      try {
        let apiData = await axios.post(
          `https://backoffice.innerpece.com/api/get-program`,
          {
            program_type: "upcoming_program",
            view_type: "",
          }
        );

        setUpcomingEventsData(apiData.data.data);
      } catch (error) {
        console.error("error", error);
      }
    }

    getApiData();
  }, []);

  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-10 md:mt-16 ">
        <p className="text-xl  md:text-3xl font-semibold">
          Explore <span className="text-blue-500">Upcoming Events</span>
        </p>

      

      <Carousel
        swipeable={true}
        draggable={true}
        pauseOnHover={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        arrows={true}
        keyBoardControl={true}
        transitionDuration={1000}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px block sm:hidden shadow-lg shadow-black/10 mt-12"
      >
        {upcomingEventsData.map((items, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(items.id, items.title)}
            className="cursor-pointer flex flex-col w-screen  bg-white "
          >
            <img
              src={`https://backoffice.innerpece.com/${items.cover_img}`}
              className=" object-cover h-48 "
              alt=""
            />
            <div className="p-3">
              <p className="font-semibold text-lg md:text-xl">{items.title}</p>
              <p className="text-gray-400 text-sm md:text-base">
                <IoLocationSharp className="inline-block me-2 text-blue-900" />
                {items.location}
              </p>
              <hr className="w-32 mt-1 mb-1" />
              <p className="text-gray-500 text-sm md:text-base flex items-center">
                <MdDateRange className="inline-block me-2 text-red-600 text-lg md:text-xl" />
                {items.start_date}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="max-sm:hidden flex flex-wrap items-center gap-x-5 gap-y-14 justify-start mt-14">
        {upcomingEventsData.map((items, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(items.id, items.title)}
            className="cursor-pointer w-72 transform transition duration-300 ease-in-out hover:-translate-y-1 border-gray-200 border-2  rounded-lg shadow-lg shadow-black/20 hover:shadow-2xl"
          >
            <img
              src={`https://backoffice.innerpece.com/${items.cover_img}`}
              className="w-full  h-32 object-cover rounded-t-lg"
              alt=""
            />
            <div className="p-3">
              <p className="font-semibold text-lg md:text-xl">{items.title}</p>
              <p className="text-gray-400 text-sm md:text-base">
                <IoLocationSharp className="inline-block me-2 text-blue-900" />
                {items.location}
              </p>
              <hr className="w-32 mt-1 mb-1" />
              <p className="text-gray-500 text-sm md:text-base flex items-center">
                <MdDateRange className="inline-block me-2 text-red-600 text-lg md:text-xl" />
                {items.start_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;
