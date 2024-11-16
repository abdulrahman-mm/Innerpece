import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Destinations() {
  let navigate = useNavigate();
  const [destinationData, setDestinationsData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/destination`)
      .then((response) => {
        setDestinationsData(response.data.destination_list);
      })
      .catch((err) => {
        console.log(err);
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
      behavior: 'instant',
    });
  };

  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-10 md:mt-16">
      <p className="text-2xl md:text-3xl font-semibold ">Destinations </p>

      <div className="flex flex-wrap gap-4 justify-start  mt-12  ">
        {destinationData.map((item, index) => (
          <div
            onClick={() => handleCardClick(item.id, item.city_name)}
            key={index}
            className="flex items-center gap-5 border-2 border-gray-400/30 p-2 pe-0 w-80  rounded-2xl hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl cursor-pointer"
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
        ))}
      </div>
    </div>
  );
}

export default Destinations;
