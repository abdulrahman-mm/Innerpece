import React, { useEffect, useState } from "react";
// import amazingindia from "../assets/amazingindia.png";
// import backtoself from "../assets/backtoself.png";
// import cityescapes from "../assets/cityescapes.png";
// import discoveringheritages from "../assets/discoveringheritages.png";
// import Entrepreneurs from "../assets/entrepreneurs.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Programs() {
  let navigate = useNavigate();
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
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end


    navigate(`/programsdetails/${formattedThemeName}`, {state: { id, themes_name } });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="ms-5 me-5 md:ms-16 md:me-16 mt-16 ">
      <p className="mt-12 text-2xl md:text-3xl font-semibold ">Programs</p>

    {
      programsData.length>0 ?
      <div className="flex items-center flex-wrap justify-start mt-14 gap-4">
        {
        programsData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleThemeClick(item.id, item.themes_name)}
            className="relative w-56 h-60 cursor-pointer hover:-translate-y-1 shadow-sm shadow-black/10 hover:shadow-xl"
          >
            <div className="absolute -z-20 bg-gradient-to-b from-black/70 to-transparent h-full w-full"></div>
            <img
              src={`https://backoffice.innerpece.com/${item.theme_pic}`}
              alt=""
              className="w-56 h-60 -z-40 bg-gradient  shadow-black object-cover rounded absolute inset-0"
            />
            <p className="absolute z-10  flex justify-center text-lg w-full top-4 text-white font-semibold">
              {item.themes_name}
            </p>
          </div>
        ))}
      </div>

      :
      <div className="flex items-center justify-center my-20">
          <p className="md:text-3xl">No Programs Found </p>
        </div>
    }
      


    </div>
  );
}

export default Programs;
