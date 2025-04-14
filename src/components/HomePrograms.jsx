// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { EffectCards } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import { Swiper, SwiperSlide } from "swiper/react";
// import defaultimg from "../assets/defaultimg.png";

// function Programs() {
//   const [programsData, setProgramsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`https://backoffice.innerpece.com/api/v1/theme`)
//       // .get(`https://backoffice.innerpece.com/api/get-combined-data`)
//       .then((response) => {
//         setProgramsData(response.data.themes);
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false); // Set loading to false even if there’s an error
//       });
//   }, []);

//   // navigate to program details page
//   const handleThemeClick = (id, themes_name) => {
//     const formattedThemeName = themes_name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/-+/g, "-")
//       .replace(/^-+|-+$/g, "");

//     navigate(`/programsdetails/${formattedThemeName}`, {
//       state: { id, themes_name },
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "instant",
//     });
//   };

//   const SkeletonCard = () => (
//     <div className=" max-md:hidden h-60 bg-gray-500 rounded-3xl animate-pulse"></div>
//   );

//   const SkeletonCarouselCard = () => (
//     <div className="w-full h-60 block md:hidden bg-gray-500 rounded-3xl animate-pulse"></div>
//   );

//   return (
//     <div className="overflow-hidden">
//       {programsData.length > 0 && (
//         <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
//           <p className="text-xl md:text-3xl font-semibold font-mulish leading-loose text-[#3E3E3E]">
//             Programs
//           </p>

//           {loading ? ( // Show skeleton loaders while fetching data
//             <div className="flex items-center flex-1 flex-grow flex-wrap justify-start gap-7 mt-8 md:mt-10">
//               {Array(3)
//                 .fill(0)
//                 .map((_, index) => (
//                   <div className="flex-grow">
//                     <SkeletonCard key={index} />
//                   </div>
//                 ))}
//               <SkeletonCarouselCard />
//             </div>
//           ) : programsData && programsData.length > 0 ? ( // Show programs if data exists
//             <div className="">
//               <div className="max-md:hidden mt-8 md:mt-10 flex items-center flex-grow flex-wrap justify-start gap-7">
//                 {programsData.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleThemeClick(item.id, item.themes_name)}
//                     className="mt-5 flex-1 relative lg:w-72 h-60 cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1  rounded-3xl overflow-hidden flex items-center justify-center"
//                   >
//                     <div className="absolute -z-20 bg-gradient-to-t from-black/95 to-transparent h-full w-full"></div>
//                     <img
//                       src={
//                         item.theme_pic
//                           ? `https://backoffice.innerpece.com/${item.theme_pic}`
//                           : defaultimg
//                       }
//                       alt={item.themes_name}
//                       className="w-full h-60  -z-40 bg-gradient  shadow-black object-cover bg-center  absolute inset-0"
//                     />
//                     <p className="absolute   font-mulish text-lg xl:text-xl text-white font-semibold text-center">
//                       {/* Entrepreneurs */}
//                       {item.themes_name}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="md:hidden h-60  relative w-full flex mt-5">
//                 <Swiper
//                   effect="cards"
//                   grabCursor={true}
//                   loop={true}
//                   modules={[EffectCards]}
//                   className="w-[70vw]"
//                 >
//                   {programsData.map((item, index) => (
//                     <SwiperSlide
//                       key={index}
//                       onClick={() =>
//                         handleThemeClick(item.id, item.themes_name)
//                       }
//                       className="relative flex items-center justify-center rounded-3xl w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
//                     >
//                       <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
//                       <img
//                         src={
//                           item.theme_pic
//                             ? `https://backoffice.innerpece.com/${item.theme_pic}`
//                             : defaultimg
//                         }
//                         alt=""
//                         className="w-full rounded-3xl h-full -z-40 bg-gradient shadow-black object-cover absolute inset-0"
//                       />

//                       <p className="absolute z-10 w-full h-full flex items-center justify-center text-lg text-white font-semibold text-center">
//                         {item.themes_name}
//                       </p>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>
//             </div>
//           ) : (
//             // Show fallback message if no data is found
//             <div className="flex items-center justify-center my-20">
//               <p className="md:text-3xl">No Programs Found</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Programs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultimg from "../assets/defaultimg.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Programs() {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/v1/theme`)
      // .get(`https://backoffice.innerpece.com/api/get-combined-data`)
      .then((response) => {
        setProgramsData(response.data.themes);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false even if there’s an error
      });
  }, []);

  // navigate to program details page
  const handleThemeClick = (id, themes_name) => {
    const formattedThemeName = themes_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    navigate(`/programsdetails/${formattedThemeName}`, {
      state: { id, themes_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const SkeletonCard = () => (
    <div className=" max-md:hidden h-60 bg-gray-500 rounded-3xl animate-pulse"></div>
  );

  const SkeletonCarouselCard = () => (
    <div className="w-full h-60 block md:hidden bg-gray-500 rounded-3xl animate-pulse"></div>
  );
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
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
        <ChevronLeft size={24} />
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
        <ChevronRight size={24} />
      </button>
    );
  };

  return (
    <>
      {programsData.length > 0 && (
        <div className="ms-5 me-5 mt-10 md:ms-16 md:me-16  md:mt-16">
          <p className="text-2xl md:text-3xl  lg:text-4xl leading-loose text-[#141414]">
            <span className="font-jost font-medium ">Trip </span>{" "}
            <span className="font-jost font-bold">Categories</span>
          </p>

          {loading ? ( // Show skeleton loaders while fetching data
            <div className="flex items-center flex-1 flex-grow flex-wrap justify-start gap-7 mt-8 md:mt-10">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div className="flex-grow">
                    <SkeletonCard key={index} />
                  </div>
                ))}
              <SkeletonCarouselCard />
            </div>
          ) : programsData && programsData.length > 0 ? ( // Show programs if data exists
            <div className="">
              {/* <div className="max-md:hidden mt-8 md:mt-10 flex items-center flex-grow flex-wrap justify-start gap-7">
                {programsData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleThemeClick(item.id, item.themes_name)}
                    className=" flex-1 relative lg:w-72 h-[362px] cursor-pointer group rounded-2xl overflow-hidden flex items-center justify-center"
                  >
                    <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                    <img
                      src={
                        item.theme_pic
                          ? `https://backoffice.innerpece.com/${item.theme_pic}`
                          : defaultimg
                      }
                      alt={item.themes_name}
                      className="w-full h-[362px]   transform transition-transform duration-500 group-hover:scale-125  -z-40 bg-gradient  shadow-black object-cover bg-center  absolute inset-0 "
                    />
                    <p className="absolute   font-rancho text-lg xl:text-5xl text-white  text-center bottom-5">
                      {item.themes_name}
                    </p>
                  </div>
                ))}
              </div> */}

              <div className="relative w-full mt-10 max-md:hidden">
                <Carousel
                  responsive={responsive}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  arrows={true}
                  autoPlay={false}
                  infinite={true}
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                  containerClass="carousel-container"
                  itemClass="px-3"
                >
                  {programsData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleThemeClick(item.id, item.themes_name)
                      }
                      className="relative h-[362px] cursor-pointer group w-full rounded-2xl overflow-hidden flex items-center justify-center flex-grow"
                    >
                      <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                      <img
                        src={
                          item.theme_pic
                            ? `https://backoffice.innerpece.com/${item.theme_pic}`
                            : defaultimg
                        }
                        alt={item.themes_name}
                        className="w-full h-[362px] flex-grow transform transition-transform duration-500 group-hover:scale-125 -z-40 object-cover bg-center absolute inset-0"
                      />
                      <p className="absolute font-rancho  text-3xl lg:text-4xl  text-white text-center bottom-5">
                        {item.themes_name}
                      </p>
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="md:hidden h-60 overflow-hidden  relative w-full flex mt-5">
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  loop={true}
                  modules={[EffectCards]}
                  className="w-[70vw]"
                >
                  {programsData.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() =>
                        handleThemeClick(item.id, item.themes_name)
                      }
                      className="relative flex items-center justify-center rounded-3xl w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
                    >
                      <div className="absolute -z-20 bg-gradient-to-b from-transparent from-60% to-black h-full w-full"></div>
                      <img
                        src={
                          item.theme_pic
                            ? `https://backoffice.innerpece.com/${item.theme_pic}`
                            : defaultimg
                        }
                        alt=""
                        className="w-full rounded-3xl h-full -z-40 bg-gradient shadow-black object-cover absolute inset-0"
                      />

                      <p className="absolute z-10 w-full h-full flex items-end font-rancho text-2xl sm:text-3xl justify-center  text-white font-semibold text-center bottom-5">
                        {item.themes_name}
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            // Show fallback message if no data is found
            <div className="flex items-center justify-center my-20">
              <p className="md:text-3xl">No Programs Found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Programs;
