import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="flex items-center gap-5 border-2 px-5 border-gray-400 py-1 w-80 rounded-2xl bg-gray-400 animate-pulse">
      <div className="w-14 h-14 rounded-full bg-gray-500 animate-pulse"></div>
      <div className="flex-1 h-6 bg-gray-500 rounded animate-pulse"></div>
    </div>
  );

  return (
    <div>
      {destinationData.length > 0 && (
        <div className="ms-5 me-5 mt-8 md:ms-16 md:me-16 md:mt-16">
          <p className="text-xl md:text-3xl font-semibold">Destinations</p>

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
                  className="flex items-center gap-5 border-2 border-gray-400/30 p-2 pe-0 w-80 rounded-2xl transition-all ease-in-out duration-500 hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl cursor-pointer"
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
      )}
    </div>
  );
}

export default Destinations;
