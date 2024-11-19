// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { EffectCards } from "swiper/modules"; // Updated import path
// // import "swiper/css";
// // import "swiper/css/effect-cards";
// // import { Swiper, SwiperSlide } from "swiper/react";

// // function Programs() {
// //   useEffect(() => {
// //     axios
// //       .get(`https://backoffice.innerpece.com/api/theme`)
// //       .then((response) => {
// //         setProgramsData(response.data.themes);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   }, []);

// //   const navigate = useNavigate();
// //   const [programsData, setProgramsData] = useState([]);

// //   const handleThemeClick = (id, themes_name) => {
// //     const formattedThemeName = themes_name
// //       .toLowerCase()
// //       .replace(/[^a-z0-9]+/g, "-")
// //       .replace(/-+/g, "-")
// //       .replace(/^-+|-+$/g, "");

// //     navigate(`/programsdetails/${formattedThemeName}`, {
// //       state: { id, themes_name },
// //     });

// //     window.scrollTo({
// //       top: 0,
// //       behavior: "instant",
// //     });
// //   };

// //   return (
// //     <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16 ">
// //       <p className="text-2xl md:text-3xl font-semibold">Programs</p>

// //       {programsData && programsData.length > 0 ? (
// //         <div className="max-md:hidden flex items-center flex-wrap justify-start  gap-4">
// //           {programsData.map((item, index) => (
// //             <div
// //               key={index}
// //               onClick={() => handleThemeClick(item.id, item.themes_name)}
// //               className="mt-14 relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
// //             >
// //               <div className="absolute -z-20 bg-gradient-to-b  from-black/70 to-transparent h-full w-full"></div>
// //               <img
// //                 src={`https://backoffice.innerpece.com/${item.theme_pic}`}
// //                 alt=""
// //                 className="w-56 h-60 transition duration-300 ease-in-out brightness-100 hover:brightness-150 -z-40 bg-gradient  shadow-black object-cover rounded absolute inset-0"
// //               />
// //               <p className="absolute z-10  flex justify-center  w-full top-4 text-white font-semibold">
// //                 {item.themes_name}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="flex items-center justify-center my-20">
// //           <p className="md:text-3xl">No Programs Found </p>
// //         </div>
// //       )}

// //       {programsData.length > 0 ? (
// //         <div className="sm:hidden relative w-full  flex mt-5 ">
// //           <Swiper
// //             effect="cards"
// //             grabCursor={true}
// //             loop={true} // Enable looping if desired
// //             modules={[EffectCards]}
// //             className="w-[70vw]  "
// //           >
// //             {programsData.map((item, index) => (
// //               <SwiperSlide
// //                 key={index}
// //                 onClick={() => handleThemeClick(item.id, item.themes_name)}
// //                 className="relative rounded-3xl w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
// //               >
// //                 <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
// //                 <img
// //                   src={`https://backoffice.innerpece.com/${item.theme_pic}`}
// //                   alt=""
// //                   className="w-full rounded-3xl h-full  -z-40 bg-gradient shadow-black object-cover absolute inset-0"
// //                 />
// //                 <p className="absolute z-10 flex justify-center text-lg w-full top-4 text-white font-semibold">
// //                   {item.themes_name}
// //                 </p>
// //               </SwiperSlide>
// //             ))}
// //           </Swiper>
// //         </div>
// //       ) : (
// //         <div className="flex items-center justify-center my-20">
// //           <p className="md:text-3xl">No Programs Found</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Programs;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { EffectCards } from "swiper/modules"; // Updated import path
// import "swiper/css";
// import "swiper/css/effect-cards";
// import { Swiper, SwiperSlide } from "swiper/react";

// function Programs() {
//   const [programsData, setProgramsData] = useState([]);
//   const [loading, setLoading] = useState(true); // Add a loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`https://backoffice.innerpece.com/api/theme`)
//       .then((response) => {
//         setProgramsData(response.data.themes);
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false); // Set loading to false even if there’s an error
//       });
//   }, []);

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

//   return (
//     <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16 ">
//       <p className="text-2xl md:text-3xl font-semibold">Programs</p>

//       {loading ? ( // Show a loading state while fetching data
//         <div className="flex items-center justify-start gap-4">
//           {/* <p className="md:text-3xl">Loading...</p> */}
//           <div className="w-56 h-60 bg-gray-500"></div>
//           <div className="w-56 h-60 bg-gray-500"></div>
//           <div className="w-56 h-60 bg-gray-500"></div>
//           <div className="w-56 h-60 bg-gray-500"></div>

//         </div>
//       ) : programsData && programsData.length > 0 ? ( // Show programs if data exists
//         <div>
//           <div className="max-md:hidden flex items-center flex-wrap justify-start gap-4">
//             {programsData.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleThemeClick(item.id, item.themes_name)}
//                 className="mt-14 relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
//               >
//                 <div className="absolute -z-20 bg-gradient-to-b  from-black/70 to-transparent h-full w-full"></div>
//                 <img
//                   src={`https://backoffice.innerpece.com/${item.theme_pic}`}
//                   alt=""
//                   className="w-56 h-60 transition duration-300 ease-in-out brightness-100  -z-40 bg-gradient shadow-black object-cover rounded absolute inset-0"
//                 />
//                 <p className="absolute z-10 flex justify-center w-full top-4 text-white font-semibold">
//                   {item.themes_name}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="sm:hidden relative w-full flex mt-5">
//             <Swiper
//               effect="cards"
//               grabCursor={true}
//               loop={true}
//               modules={[EffectCards]}
//               className="w-[70vw]"
//             >
//               {programsData.map((item, index) => (
//                 <SwiperSlide
//                   key={index}
//                   onClick={() => handleThemeClick(item.id, item.themes_name)}
//                   className="relative rounded-3xl w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
//                 >
//                   <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
//                   <img
//                     src={`https://backoffice.innerpece.com/${item.theme_pic}`}
//                     alt=""
//                     className="w-full rounded-3xl h-full -z-40 bg-gradient shadow-black object-cover absolute inset-0"
//                   />
//                   <p className="absolute z-10 flex justify-center text-lg w-full top-4 text-white font-semibold">
//                     {item.themes_name}
//                   </p>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       ) : (
//         // Show fallback message if no data is found
//         <div className="flex items-center justify-center my-20">
//           <p className="md:text-3xl">No Programs Found</p>
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

function Programs() {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/theme`)
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
    <div className="relative w-56 max-md:hidden h-60 bg-gray-300 rounded animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-200 rounded"></div>
    </div>
  );

  const SkeletonCarouselCard = () => (
    <div className="relative w-56 h-60 block md:hidden bg-gray-300 rounded animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16 ">
      <p className="text-2xl md:text-3xl font-semibold">Programs</p>

      {loading ? ( // Show skeleton loaders while fetching data
        <div className="flex items-center flex-wrap justify-start gap-4 mt-14">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          <SkeletonCarouselCard />
        </div>
      ) : programsData && programsData.length > 0 ? ( // Show programs if data exists
        <div>
          <div className="max-md:hidden flex items-center flex-wrap justify-start gap-4">
            {programsData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleThemeClick(item.id, item.themes_name)}
                className="mt-14 relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
              >
                <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
                <img
                  src={`https://backoffice.innerpece.com/${item.theme_pic}`}
                  alt=""
                  className="w-56 h-60 transition duration-300 ease-in-out brightness-100 hover:brightness-150 -z-40 bg-gradient shadow-black object-cover rounded absolute inset-0"
                />
                <p className="absolute z-10 flex justify-center w-full top-4 text-white font-semibold">
                  {item.themes_name}
                </p>
              </div>
            ))}
          </div>

          <div className="md:hidden relative w-full flex mt-5">
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
                  onClick={() => handleThemeClick(item.id, item.themes_name)}
                  className="relative rounded-3xl w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
                >
                  <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
                  <img
                    src={`https://backoffice.innerpece.com/${item.theme_pic}`}
                    alt=""
                    className="w-full rounded-3xl h-full -z-40 bg-gradient shadow-black object-cover absolute inset-0"
                  />
                  <p className="absolute z-10 flex justify-center text-lg w-full top-4 text-white font-semibold">
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
  );
}

export default Programs;
