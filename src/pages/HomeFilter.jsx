import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineChildCare } from "react-icons/md";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GiHighGrass } from "react-icons/gi";
import { LuWaves } from "react-icons/lu";
import { PiBowlFood } from "react-icons/pi";
import { MdTheaters } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

import defaultimage from "../assets/defaultimg.png";

function DestinationsDetails() {
  const location = useLocation();
  const { date, city_name } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [startDate, setStartDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [searchTitle, setSearchTitle] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = Array.isArray(apiData)
    ? apiData.slice(indexOfFirstItem, indexOfLastItem)
    : [];


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.post(
          "https://backoffice.innerpece.com/api/home-filter",
          {
            destination: city_name,
            start_date: date,
          }
        );

        console.log('homefilter',response.data.data);
        setApiData(response.data.data);

        const firstProgram = response.data.data[0];
        const metaOgTitle = document.querySelector("meta[property='og:title']");
        console.log(metaOgTitle);
        if (metaOgTitle) {
          metaOgTitle.setAttribute("content", firstProgram.title || "Default Title");
        }

        const metaOgDescription = document.querySelector("meta[property='og:description']");
            if (metaOgDescription) {
              metaOgDescription.setAttribute("content", firstProgram.category || "Default description");
            }

            const metaOgImage = document.querySelector("meta[property='og:image']");
            if (metaOgImage) {
              metaOgImage.setAttribute("content", `https://backoffice.innerpece.com/${firstProgram.cover_img}` || '');
            }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [city_name, date]);

  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  let navigate = useNavigate();


  const handleSearchClick = async () => {
    try {
      // Post request to search-program API
      const response = await axios.post('https://backoffice.innerpece.com/api/search-program', {
        destination: city_name,
        title: searchTitle
      });

      if (response.data.status === 'success') {
        if (response.data.data.length === 0) {
          setApiData([]); // No data found, set empty array
        } else {
          setApiData(response.data.data); // Set the retrieved data
        }
      } else {
        console.error('Error fetching programs:', response.data.message);
        setApiData([]); // Error occurred, set empty array
      }
    } catch (error) {
      console.error('Error:', error);
      setApiData([]); // Set empty array on exception
    }
  };

  const handleCardClick = (id, title) => {
    const formattedTitleName = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Remove all special characters and replace with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end

    navigate(`/${id}/${formattedTitleName}`, {
      state: { id, title },
    });

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const handleSortChange = async (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);

    try {
      const response = await axios.post('https://backoffice.innerpece.com/api/sort-destination ', {
        sort_by: selectedSort,
        destination: city_name
      });

      console.log('API response:', response.data); // Inspect response data

      if (response.data.status === 'success') {
        const dataObject = response.data.data;
        // Convert the data object to an array
        const dataArray = Object.values(dataObject);
        setApiData(dataArray);
      } else {
        console.error('Error sorting programs:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterClick = async () => {
    try {
      const response = await axios.post('https://backoffice.innerpece.com/api/filter-destination', {
        start_date: startDate,
        to_date: toDate,
        destination: city_name
      });
  
      if (response.data.status === 'success') {
        const data = Object.values(response.data.data); // Convert data to an array
  
        if (data.length === 0) {
          setApiData([]); // No data found, set empty array
        } else {
          console.log('filtered data', data);
          setApiData(data); // Set the retrieved data as an array

          
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setApiData([]);
    }
  };

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleToChange = (e) => {
    setToDate(e.target.value);
  }

  function onchangeSelect(e) {
    setSortBy(e.target.value);
  }

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div className="mt-4 md:mt-7 ms-3 me-3 md:ms-10 md:me-10 ">
        <div className="gap-3 mt-4 items-center justify-between inline-flex bg-sky-100/80 font-semibold text-sky-800 p-2 rounded-lg">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </p>
          <b>{">"}</b>

          <p className="">{`Explore ${
            apiData.length > 0 ? apiData[0].title : ""
          }`}</p>
        </div>

        <div
          id="hero"
          className="h-64 md:h-80  lg:h-[380px] rounded-lg mt-8 md:mt-10 lg:mt-16 relative bg-[url('././assets/explorepopularpackagehero.jpg')] bg-cover bg-center"
        >
          <div
            id="blur"
            className="absolute h-[60%] w-[85%] md:w-[65%] lg:w-[60%] rounded-lg flex flex-col justify-center top-11 md:top-10 lg:top-16 left-6 md:left-10 lg:left-16 px-3 py-1 md:px-8 md:py-3 bg-[url('././assets/blurbg.png')] bg-cover bg-center"
          >
            <h1 className="text-white text-lg md:text-2xl lg:text-4xl font-semibold">{`Explore ${
              apiData.length > 0 ? apiData[0].title : ""
            }`}</h1>
            <p className="text-white text-sm md:text-base mt-2 ">
              Find your perfect tour with personalized themes and destinations
              to match your preferences
            </p>
          </div>

          <div className="w-[180px] h-[40px] md:h-auto md:w-[250px] lg:w-[270px] absolute rounded top-[160px] flex items-center justify-between flex-shrink left-16 mt-3 sm:top-40 md:top-48 md:left-24 lg:top-60 xl:top-60 lg:left-36 bg-white  gap-1  md:gap-3 p-1 py-1">
            <span className="ms-3">
              {" "}
              <IoIosSearch className="md:text-2xl" />
            </span>

            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="outline-none w-[50px] md:w-[80px] lg:w-[100px]"
              placeholder="Search Events "
            />

            <button
              style={{ background: "#283D74" }}
              onClick={handleSearchClick}
              className=" text-white px-1 py-1  md:px-6 md:py-2 rounded font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* main section */}

      <div className="flex flex-col md:flex-row ustify-between gap-2 md:gap-3 lg:gap-5 mt-2 md:mt-7 ms-4 me-4 md:ms-7 md:me-7 lg:ms-10 lg:me-10 ">
        {/* main section > sideBar */}
        <div className="mt-20 px-7 py-10 h-fit flex flex-col gap-6 rounded-md  max-md:hidden border-2 basis-[20%] ">
          <p className="text-xl">Search By Filter</p>

          <label htmlFor="fromDate">From Date</label>
          <input
            type="date"
            value={startDate}
            onChange={handleDateChange}
            className="border-2 p-2 rounded"
          />

          <label htmlFor="toDate">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={handleToChange}
            className="border-2 p-2 rounded"
          />

          <button 
          value="FILTER"
          onClick={handleFilterClick}
          className="bg-sky-800 active:bg-gray-600 px-8 rounded text-end py-2 text-white place-items-end w-fit">
            Filter
          </button>

          <p className="text-xl">Sort By</p>

          <select
            name=""
            id=""
            className="border-2 p-2 outline-none"
            onChange={handleSortChange} 
            value={sortBy}
          >
            <option value="" disabled selected>
              Select Sort Option
            </option>
            <option value="recent">Recent Event</option>
            <option value="price_low_to_high">Low Price</option>
            <option value="price_high_to_low">High Price</option>
          </select>
        </div>

        {/* main section > mainBar */}
        <div className="  w-full ">
          <p
            onClick={() => setFilterButtonClicked(!filterButtonClicked)}
            className={`mt-10 w-28 text-center py-2 px-2 md:p-2 md:px-6 rounded-lg block md:hidden ${
              filterButtonClicked ? "bg-red-500 text-white" : "bg-gray-300"
            } }`}
          >
            {`${filterButtonClicked ? "Close Filter" : "Filter"}`}
          </p>

          {filterButtonClicked && (
            <div className="mt-5 md:hidden flex border-2 flex-col rounded-lg px-3 py-3 pb-5 gap-5">
              <p className="text-lg">Search By Filter</p>

              <div className="flex flex-wrap gap-5">
                <div className="flex gap-2 items-center">
                  <label htmlFor="fromDate">From Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleDateChange}
                    className="border-2 p-2 rounded"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <label htmlFor="toDate">To Date</label>
                  <input
                    type="date"
                    value={toDate}
            onChange={handleToChange}
                    className="border-2 p-2 rounded"
                  />
                </div>

                <button 
                 value="FILTER"
                 onClick={handleFilterClick}
                className="bg-sky-800 active:bg-gray-600 px-8 rounded text-end py-2 text-white place-items-end w-fit">
                  Filter
                  
                </button>
              </div>

              <p className="text-lg">Sort By</p>

              <select
                className="border-2 p-2 rounded outline-none w-fit"
                onChange={handleSortChange}
                value={sortBy}
              >
                <option value="" disabled selected>
                  Select Sort Option
                </option>
                <option value="recent">Recent Event</option>
                <option value="price_low_to_high">Low Price</option>
                <option value="price_high_to_low">High Price</option>
              </select>
            </div>
          )}

          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div key={index} className="flex flex-col mt-10  ">
                <div
                  key={index}
                  className="flex w-full flex-grow flex-col lg:flex-row mt-11    "
                >
                  <img
                    src={
                      item.cover_img
                        ? `https://backoffice.innerpece.com/${item.cover_img}`
                        : defaultimage
                    }
                    alt=""
                    className="object-cover w-full lg:w-72  bg-center  rounded-none"
                  />

                  <div className="flex flex-wrap flex-grow  flex-col gap-2 border-2 border-gray-300 py-2 px-3 ">
                    <p className="font-semibold flex-wrap text-2xl md:text-3xl">
                      {item.title}
                    </p>

                    <div className="flex  items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <FaLocationDot className="text-sky-800" />
                        <p>{item.location}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <p>
                          <b className="me-1">5</b>of 5
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                      <p>Upto 12 guests</p>

                      <div className="flex items-center gap-3">
                        <PiStarFourFill className="text-gray-400" />
                        <p>4 rooms</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <PiStarFourFill className="text-gray-400" />
                        <p>5 baths</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">Great for:</p>

                      <div className="flex items-center gap-2">
                        <IoPeopleSharp className="text-gray-400" />
                        <p>Senior Citizen</p>
                      </div>

                      <p>|</p>

                      <div className="flex items-center gap-2">
                        <MdOutlineChildCare className="text-gray-400" />
                        <p>Kids</p>
                      </div>
                    </div>

                    <div className="border-b border-gray-400"></div>

                    <div className="flex justify-start mt-1 gap-2 flex-wrap items-start">
                      <div className="flex flex-col  w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <LiaSwimmingPoolSolid className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Swimming pool</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <GiHighGrass className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Lawn</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <LuWaves className="text-gray-500 " />
                        </span>
                        <p className="text-gray-500 text-xs">Beach View</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <PiBowlFood className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Meals</p>
                      </div>

                      <div className="flex flex-col w-14 ">
                        <span className="border-2 p-2 w-9 border-gray-300 rounded-full">
                          {" "}
                          <MdTheaters className="text-gray-500" />
                        </span>
                        <p className="text-gray-500 text-xs">Home Theatre</p>
                      </div>

                      <p className="text-gray-500">20+</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap  flex-row lg:flex-col items-center justify-between lg:justify-center gap-4  lg:border-s-0 border-t-0 lg:border-t-2 border-2 border-gray-300  px-3 py-2  lg:rounded-lg lg:rounded-s-none rounded-b-none">
                    <p className="font-bold text-xl md:text-2xl">
                      ₹{item.actual_price}
                    </p>

                    <div className="flex border flex-wrap justify-center border-sky-700 py-1 px-4 bg-sky-100/50 rounded-lg  items-center gap-2">
                      <IoBedSharp className="text-xl" />
                      <p className="text-sm">For 4 Rooms</p>
                    </div>

                    <p className="text-xs text-gray-500">
                      for 32 Nights + Taxes(4 rooms)
                    </p>

                    <div
                      onClick={() => handleCardClick(item.id, item.title)}
                      className="flex  items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-900 px-5 py-1 lg:px-8 lg:py-2 rounded-lg "
                    >
                      <p className="text-white cursor-pointer  md:text-xl font-semibold ">
                        View
                      </p>
                      <FaArrowRight className="text-white" />
                    </div>
                  </div>
                </div>

                <p className="bg-sky-800/20 w-90vw  text-sm md:text-base rounded-lg py-2 ps-1 md:ps-5 rounded-t-none tracking-widest ">
                  RATED BEST FOR ITS AMENITIES AND SERVICE
                </p>
              </div>
            ))
          ) : (
            <div className="no-data-container">
              <p>No programs available.</p>
            </div>
          )}

<nav>
            <div className="flex justify-center items-center mt-5">
              <ul className="flex space-x-2">
                {Array.from(
                  { length: Math.ceil(apiData.length / itemsPerPage) },
                  (_, i) => (
                    <li key={i + 1} className="relative">
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 border-2 rounded-full text-black ${currentPage === i + 1 ? "bg-blue-700 border-blue-700 text-white" : "hover:bg-blue-600 hover:border-blue-600"}`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </nav>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DestinationsDetails;
