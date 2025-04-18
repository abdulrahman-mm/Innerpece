import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Blogs = () => {
  let [apiData, setApiDate] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      let response = await axios.get(
        "https://blogs.innerpece.com/wp-json/wp/v2/posts?per_page=5&_embed=true"
      );
      setApiDate(response.data);
    };

    fetchDate();
  }, []);

  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 4000, min: 1536 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 1536, min: 1024 },
  //     items: 4,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 640 },
  //     items: 3,
  //   },
  //   mobile: {
  //     breakpoint: { max: 640, min: 0 },
  //     items: 1,
  //   },
  // };


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 1536, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    smallLaptop: {
      breakpoint: { max: 1024, min: 820 },
      items: 2.5,
    },
    largeTablet: {
      breakpoint: { max: 820, min: 640 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 640, min: 480 },
      items: 1.5,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
    },
  };
  

  return (
    <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
      <p className="text-2xl md:text-3xl  lg:text-4xl  leading-loose text-[#141414]">
        <span className="font-jost font-medium ">Our </span>{" "}
        <span className="font-jost font-bold">Blogs</span>
      </p>

      {/* <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="px-2"
      >
        {apiData.map((post, index) => (
          <div
            key={index}
            className="bg-white group overflow-hidden transition-all duration-300 w-[350px] lg:w-[390px] mt-10"
          >
            <div className="relative group overflow-hidden rounded-2xl">
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <div className="overflow-hidden  group rounded-2xl">
                    <img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt={post.title.rendered}
                      className="w-full h-48 2xl:h-[230px] object-cover transition-all duration-500 ease-in-out transform group-hover:scale-[1.1] hover:scale-[1.15] rounded-2xl"
                    />
                  </div>
                </a>
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-md">
                  No Image
                </div>
              )}
            </div>
            <div className="p-2">
              <h3 className="text-sm font-[500] text-[#333333]">
                {post.title.rendered}
              </h3>
            </div>
          </div>
        ))}
      </Carousel> */}

      <Carousel
        responsive={responsive}
        swipeable
        draggable
        showDots={false}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="flex gap-5 justify-center pb-2 px-2 mt-8 md:mt-10 rounded-2xl "
      >
        {apiData.map((post, index) => (
          <div
            key={index}
            className="flex flex-col bg-white group overflow-hidden transition-all duration-300 w-full rounded-2xl shadow-md"
          >
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 overflow-hidden"
              >
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  className="w-full h-48  object-cover overflow-hidden transition-transform duration-500 ease-in-out transform group-hover:scale-105 rounded-t-2xl"
                />
              </a>
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 rounded-t-2xl">
                No Image
              </div>
            )}

            <div className="flex flex-col justify-between h-full p-4">
              <h3
                className="text-[#000000] text-sm md:text-lg font-jost"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Blogs;

