// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { EffectCards } from "swiper/modules"; // Updated import path
// import "swiper/css";
// import "swiper/css/effect-cards";
// import { Swiper, SwiperSlide } from "swiper/react";

// function Programs() {
//   const navigate = useNavigate();
//   const [programsData, setProgramsData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`https://backoffice.innerpece.com/api/theme`)
//       .then((response) => {
//         setProgramsData(response.data.themes);
//       })
//       .catch((error) => {
//         console.log(error);
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
//     <div className="ms-5 me-5 md:ms-16 md:me-16 mt-16">
//       <p className="mt-12 text-2xl md:text-3xl font-semibold">Programs</p>
//       {/* {programsData.length > 0 ? (
//         <div className="max-md:hidden flex items-center flex-wrap justify-start mt-14 gap-4">
//           {programsData.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => handleThemeClick(item.id, item.themes_name)}
//               className="relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
//             >
//               <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
//               <img
//                 src={`https://backoffice.innerpece.com/${item.theme_pic}`}
//                 alt=""
//                 className="w-56 h-60 -z-40 bg-gradient  shadow-black object-cover rounded absolute inset-0"
//               />
//               <p className="absolute z-10  flex justify-center text-lg w-full top-4 text-white font-semibold">
//                 {item.themes_name}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex items-center justify-center my-20">
//           <p className="md:text-3xl">No Programs Found </p>
//         </div>
//       )} */}

//       {programsData.map((item, index) => (
//         <div className=" sm:hidden relative w-full h-80 flex items-center justify-center mt-14">
//           <Swiper
//             effect="cards"
//             grabCursor={true}
//             // loop={true} // Enable looping
//             modules={[EffectCards]}
//             className="w-[80vw] h-52 mt-10"
//           >

//               <SwiperSlide
//                 key={index}
//                 onClick={() => handleThemeClick(item.id, item.themes_name)}
//                 className="relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
//               >
//                 <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
//                 <img
//                   src={`https://backoffice.innerpece.com/${item.theme_pic}`}
//                   alt=""
//                   className="w-56 h-60 -z-40 bg-gradient  shadow-black object-cover rounded absolute inset-0"
//                 />
//                 <p className="absolute z-10  flex justify-center text-lg w-full top-4 text-white font-semibold">
//                   {item.themes_name}
//                 </p>
//             </SwiperSlide>
//           </Swiper>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Programs;
// Programs.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EffectCards } from "swiper/modules"; // Updated import path
import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";

function Programs() {
  const navigate = useNavigate();
  const [programsData, setProgramsData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/theme`)
      .then((response) => {
        setProgramsData(response.data.themes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-10">
      <p className="mt-12 text-2xl md:text-3xl font-semibold">Programs</p>

      {programsData.length > 0 ? (
        <div className="max-md:hidden flex items-center flex-wrap justify-start mt-14 gap-4">
          {programsData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleThemeClick(item.id, item.themes_name)}
              className="relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
            >
              <div className="absolute -z-20 bg-gradient-to-b  from-black/70 to-transparent h-full w-full"></div>
              <img
                src={`https://backoffice.innerpece.com/${item.theme_pic}`}
                alt=""
                className="w-56 h-60 transition duration-300 ease-in-out brightness-100 hover:brightness-150 -z-40 bg-gradient  shadow-black object-cover rounded absolute inset-0"
              />
              <p className="absolute z-10  flex justify-center  w-full top-4 text-white font-semibold">
                {item.themes_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center my-20">
          <p className="md:text-3xl">No Programs Found </p>
        </div>
      )}

      {programsData.length > 0 ? (
        <div className="sm:hidden relative w-full h-80 flex items-center justify-center ">
          <Swiper
            effect="cards"
            grabCursor={true}
            loop={true} // Enable looping if desired
            modules={[EffectCards]}
            className="w-[70vw] h-52 "
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
                  className="w-full rounded-3xl h-60 -z-40 bg-gradient shadow-black object-cover absolute inset-0"
                />
                <p className="absolute z-10 flex justify-center text-lg w-full top-4 text-white font-semibold">
                  {item.themes_name}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex items-center justify-center my-20">
          <p className="md:text-3xl">No Programs Found</p>
        </div>
      )}
    </div>
  );
}

export default Programs;
