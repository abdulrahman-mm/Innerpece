import React from "react";
import { useState, useEffect } from "react";
import pe1 from "../assets/pe1.jpg";
import pe2 from "../assets/pe2.jpg";
import pe3 from "../assets/pe3.jpg";
import pe4 from "../assets/pe4.jpg";
import pe5 from "../assets/pe5.jpg";
import pe6 from "../assets/pe6.jpg";
import pe7 from "../assets/pe7.jpg";
import pe8 from "../assets/pe8.jpg";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import defaultimage from "../assets/defaultimg.png";

function ExplorePopularEvents() {
  const [popularEventsData, setPopularEventsData] = useState([]);

 

  let navigate = useNavigate();

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

  function onClickCard() {
    navigate("/tourdetails");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  useEffect(() => {
    async function getApiData() {
      try {
        let apiData = await axios.post(
          `https://backoffice.innerpece.com/api/get-program`,
          {
            program_type: "popular_program",
            view_type: "",
          }
        );

        setPopularEventsData(apiData.data.data);
      } catch (error) {
        console.error("error", error);
      }
    }

    getApiData();
  }, []);

  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-16">
      <div className="flex items-center justify-between flex-wrap">
        <p className="text-xl md:text-4xl font-semibold">
          Explore <span className="text-blue-500">Popular Events</span>
        </p>

        <p className="underline text-sky-800  text-end cursor-pointer font-semibold">
          View all
        </p>
      </div>

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
        itemClass="carousel-item-padding-40-px block sm:hidden  mt-12"
      >
        {popularEventsData.map((items, index) => (
          <div
            onClick={onClickCard}
            key={index}
            className="cursor-pointer  flex flex-col w-screen  bg-white "
          >
            <img
              src={
                items.cover_img
                  ? `https://backoffice.innerpece.com/${items.cover_img}`
                  : defaultimage
              }
              className="w-full h-48  object-cover"
            />
            <div className="p-3">
              <p className="font-semibold text-lg md:text-xl">{items.title}</p>
              <p className="text-gray-400 text-sm md:text-base">
                {items.location}
              </p>
              <p className="text-gray-500 flex items-center mt-2 text-sm md:text-base">
                <FaStar className="text-yellow-500 me-2" />

                <span className="me-4">{items.ratings}</span>
                <span className="text-gray-400 text-sm">{`(${items.totalReviews})`}</span>
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      {popularEventsData.length > 0 ? (
        <div className="max-sm:hidden flex flex-wrap items-center justify-start mt-14 gap-x-5 gap-y-14">
          {popularEventsData.map((items, index) => (
            <div
              onClick={onClickCard}
              key={index}
              className="w-72 h-64 border-gray-200  cursor-pointer transform transition duration-300 ease-in-out hover:-translate-y-1 border-2  rounded-lg shadow-lg shadow-black/20 hover:shadow-2xl"
            >
              <img
                src={
                  items.cover_img
                    ? `https://backoffice.innerpece.com/${items.cover_img}`
                    : defaultimage
                }
                className="w-full h-32 object-cover rounded-t-lg "
                alt=""
              />
              <div className="p-3">
                <p className="font-semibold text-lg md:text-xl">
                  {items.title}
                </p>
                <p className="text-gray-400 text-sm md:text-base">
                  {items.location}
                </p>
                <p className="text-gray-500 flex items-center mt-2 text-sm md:text-base">
                  <FaStar className="text-yellow-500 me-2" />

                  <span className="me-4">{items.average_rating}</span>
                  <span className="text-gray-400 text-sm">{`(${items.totalReviews})`}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center my-20">
          <p className="md:text-3xl">No popular events found </p>
        </div>
      )}
    </div>
  );
}

export default ExplorePopularEvents;
