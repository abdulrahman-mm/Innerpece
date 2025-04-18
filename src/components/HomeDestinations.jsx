import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultimg from "../assets/defaultimg.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Destinations() {
  let navigate = useNavigate();
  const [destinationData, setDestinationsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/v1/destination`)
      // .get(`https://backoffice.innerpece.com/api/get-combined-data`)
      .then((response) => {
        setDestinationsData(response.data.destination_list);
        setLoading(false); // Set loading to false even if there’s an error
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id, city_name) => {
    const formattedCityName = city_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`/destinationsdetails/${id}/${formattedCityName}`, {
      state: { id, city_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // Skeleton Loader for Destination Cards
  const SkeletonCard = () => (
    <div className="flex items-center gap-5 border-2 px-5 border-gray-400 py-1 w-80 rounded-2xl bg-gray-400 animate-pulse">
      <div className="w-14 h-14 rounded-full bg-gray-500 animate-pulse"></div>
      <div className="flex-1 h-6 bg-gray-500 rounded animate-pulse"></div>
    </div>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        {/* <img src="/left-arrow.png" alt="Left" className="w-6 h-6" />
         */}
        <ChevronLeft size={20} />
      </button>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        {/* <img src="/right-arrow.png" alt="Right" className="w-6 h-6" /> */}
        <ChevronRight size={20} />
      </button>
    );
  };

  return (
    <div>
      {destinationData.length > 0 && (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
            <span className="font-jost font-medium">Popular </span>
            <span className="font-jost font-bold">Destinations</span>
          </p>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-7 mt-8 md:mt-10">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
            </div>
          ) : destinationData && destinationData.length > 0 ? (
            <div className="mt-8 md:mt-10">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={false}
                swipeable={true}
                draggable={true}
                showDots={false}
                keyBoardControl={true}
                containerClass="carousel-container"
                itemClass="px-2"
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
              >
                {destinationData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(item.id, item.city_name)}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-80 md:h-96  shrink-0 rounded-2xl overflow-hidden  group  cursor-pointer">
                      <img
                        src={
                          item.cities_pic
                            ? `https://backoffice.innerpece.com/${item.cities_pic}`
                            : defaultimg
                        }
                        alt={`trip-${index}`}
                        className="h-full w-full -z-30 absolute object-cover transform transition-transform duration-500 group-hover:scale-125"
                      />
                      <div className="absolute -z-10 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                      <div className="absolute bottom-5 z-20 left-0 w-full text-white text-center py-2 px-3">
                        <p className="font-rancho text-2xl md:text-3xl xl:text-4xl">
                          {item.city_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center my-20">
              <p className="md:text-3xl">No Destinations Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Destinations;
