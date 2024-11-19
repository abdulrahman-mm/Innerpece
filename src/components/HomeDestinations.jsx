// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Destinations() {
//   let navigate = useNavigate();
//   const [destinationData, setDestinationsData] = useState([]);
//   const [loading, setLoading] = useState(true); // Add a loading state

//   useEffect(() => {
//     axios
//       .get(`https://backoffice.innerpece.com/api/destination`)
//       .then((response) => {
//         setDestinationsData(response.data.destination_list);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   const handleCardClick = (id, city_name) => {
//     const formattedCityName = city_name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
//       .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
//       .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

//     navigate(`/destinationsdetails/${formattedCityName}`, {
//       state: { id, city_name },
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "instant",
//     });
//   };

//   const SkeletonCard = () => (
//     <div className="relative w-56 h-60 bg-gray-300 rounded animate-pulse">
//       <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-200 rounded"></div>
//     </div>
//   );

//   return (
//     <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16  md:mt-16">
//       <p className="text-2xl md:text-3xl font-semibold ">Destinations </p>

//       <div className="flex flex-wrap gap-4 justify-start  mt-5 ">
//         {loading ? (
//          <div className="relative w-20 h-14 md:h-screen  bg-gray-300 rounded animate-pulse">
//          <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-200 rounded"></div>
//        </div>
//         ) : destinationData ? (
//           destinationData.map((item, index) => (
//             <div
//               onClick={() => handleCardClick(item.id, item.city_name)}
//               key={index}
//               className="flex items-center gap-5 border-2 border-gray-400/30 p-2 pe-0 w-80  rounded-2xl hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl cursor-pointer"
//             >
//               <img
//                 src={`https://backoffice.innerpece.com/${item.cities_pic}`}
//                 alt=""
//                 className="w-14 h-14 object-cover rounded-full"
//               />
//               <p className="md:font-semibold text-lg md:text-xl">
//                 {item.city_name}
//               </p>
//             </div>
//           ))
//         ) : (
//           <div>No destinations Found</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Destinations;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Destinations() {
  let navigate = useNavigate();
  const [destinationData, setDestinationsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/destination`)
      .then((response) => {
        setDestinationsData(response.data.destination_list);
        setLoading(false);  // Set loading to false even if there’s an error
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

    navigate(`/destinationsdetails/${formattedCityName}`, {
      state: { id, city_name },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // Skeleton Loader for Destination Cards
  const SkeletonCard = () => (
    <div className="flex items-center gap-5 border-2 px-5 border-gray-200 py-1 w-80 rounded-2xl bg-gray-200 animate-pulse">
      <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse"></div>
      <div className="flex-1 h-6 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );

  return (
    <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16 md:mt-16">
      <p className="text-2xl md:text-3xl font-semibold">Destinations</p>

      <div className="flex flex-wrap gap-4 justify-start mt-5">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : destinationData && destinationData.length > 0 ? (
          destinationData.map((item, index) => (
            <div
              onClick={() => handleCardClick(item.id, item.city_name)}
              key={index}
              className="flex items-center gap-5 border-2 border-gray-400/30 p-2 pe-0 w-80 rounded-2xl hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl cursor-pointer"
            >
              <img
                src={`https://backoffice.innerpece.com/${item.cities_pic}`}
                alt=""
                className="w-14 h-14 object-cover rounded-full"
              />
              <p className="md:font-semibold text-lg md:text-xl">
                {item.city_name}
              </p>
            </div>
          ))
        ) : (
          <div className="flex w-full items-center justify-center my-20">
            <p className="md:text-3xl">No Destinations Found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Destinations;
