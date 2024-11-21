import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import defaultimage from "../assets/defaultimg.png";

function ExplorePopularEvents() {
  const [popularEventsData, setPopularEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // navigate to tour details page
  const handleCardClick = (id, title) => {
    const formattedTitleName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

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
        const apiData = await axios.post(
          `https://backoffice.innerpece.com/api/get-program`,
          {
            program_type: "popular_program",
            view_type: "",
          }
        );
        setPopularEventsData(apiData.data.data);
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    }

    getApiData();
  }, []);

  const SkeletonCard = () => (
    <div className="cursor-pointer w-72 max-md:hidden border-gray-200 border-2 rounded-lg shadow-lg shadow-black/20">
      <div className="w-full h-32 bg-gray-300 rounded-t-lg animate-pulse"></div>
      <div className="p-3">
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="w-1/2 h-5 bg-gray-300 rounded mb-1 animate-pulse"></div>
        <hr className="w-32 mt-1 mb-1" />
        <div className="w-1/3 h-5 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const SkeletonCarousel = () => (
    <div className="flex gap-5  md:hidden">
      {Array(1)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="cursor-pointer w-72 border-gray-200 border-2 rounded-lg shadow-lg shadow-black/20">
            <div className="w-full h-32 bg-gray-300 rounded-t-lg animate-pulse"></div>
            <div className="p-3">
              <div className="w-3/4 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
              <div className="w-1/2 h-5 bg-gray-300 rounded mb-1 animate-pulse"></div>
              <hr className="w-32 mt-1 mb-1" />
              <div className="w-1/3 h-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16  md:mt-16">
      <p className="text-xl md:text-3xl font-semibold">
        Explore <span className="text-blue-500">Popular Events</span>
      </p>

      {isLoading ? (
        <div>
          <SkeletonCarousel />
        </div>
      ) : (
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
          itemClass="carousel-item-padding-40-px block md:hidden mt-5"
        >
          {popularEventsData.map((items, index) => (
            <div
              onClick={() => handleCardClick(items.id, items.title)}
              key={index}
              className="cursor-pointer flex flex-col w-screen bg-white "
            >
              <img
                src={
                  items.cover_img
                    ? `https://backoffice.innerpece.com/${items.cover_img}`
                    : defaultimage
                }
                className="w-full h-48 object-cover"
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
        </Carousel>
      )}

      {isLoading ? (
        <div className="max-md:hidden flex flex-wrap items-center justify-start mt-5 gap-x-5 gap-y-14">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : popularEventsData.length > 0 ? (
        <div className="max-sm:hidden flex flex-wrap items-center justify-start mt-5 gap-x-5 gap-y-14">
          {popularEventsData.map((items, index) => (
            <div
              onClick={() => handleCardClick(items.id, items.title)}
              key={index}
              className="w-72 h-64 border-gray-200 cursor-pointer transform transition duration-500 ease-in-out hover:-translate-y-1 border-2 rounded-lg shadow-lg shadow-black/20 hover:shadow-2xl"
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
