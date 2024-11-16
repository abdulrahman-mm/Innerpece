import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

function Programs() {
  const location = useLocation();
  let navigate = useNavigate();
  const { id, themes_name } = location.state || {};
  const [apiData, setApiData] = useState([]);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);

  const [sortBy, setSortBy] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const [startDate, setStartDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = Array.isArray(apiData)
    ? apiData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.post(
          "https://backoffice.innerpece.com/api/get-program",
          {
            theme: id,
          }
        );

        setApiData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  function onchangeSelect(e) {
    setSortBy(e.target.value);
  }

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleToChange = (e) => {
    setToDate(e.target.value);
  };

  const handleClearFilterClicked = async () => {
    setFilterButtonClicked(false);

    const fetchProgramData = async () => {
      try {
        const response = await axios.post(
          "https://backoffice.innerpece.com/api/get-program",
          {
            theme: id,
          }
        );
        setStartDate("");
        setToDate("");
        setApiData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  };

  const handleSortChange = async (event) => {
    setFilterButtonClicked(false);

    const selectedSort = event.target.value;
    setSortBy(selectedSort);

    try {
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/sort-program",
        {
          sort_by: selectedSort,
          theme: themes_name,
        }
      );

      console.log("API response:", response.data); // Inspect response data

      if (response.data.status === "success") {
        const dataObject = response.data.data;
        // Convert the data object to an array
        const dataArray = Object.values(dataObject);
        setApiData(dataArray);
      } else {
        console.error("Error sorting programs:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchClick = async () => {
    try {
      // Post request to search-program API
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/search-program",
        {
          title: searchTitle,
          theme: themes_name,
        }
      );

      if (response.data.status === "success") {
        if (response.data.data.length === 0) {
          setApiData([]); // No data found, set empty array
        } else {
          setApiData(response.data.data); // Set the retrieved data
        }
      } else {
        console.error("Error fetching programs:", response.data.message);
        setApiData([]); // Error occurred, set empty array
      }
    } catch (error) {
      console.error("Error:", error);
      setApiData([]); // Set empty array on exception
    }
  };

  const handleFilterClick = async () => {
    setFilterButtonClicked(false);
    try {
      const response = await axios.post(
        "https://backoffice.innerpece.com/api/filter-program-by-date",
        {
          start_date: startDate,
          to_date: toDate,
          theme: themes_name,
        }
      );

      if (response.data.status === "success") {
        const data = Object.values(response.data.data); // Convert data to an array

        if (data.length === 0) {
          setApiData([]); // No data found, set empty array
        } else {
          console.log("filtered data", data);
          setApiData(data); // Set the retrieved data as an array
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setApiData([]);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  useEffect(() => {
    if (filterButtonClicked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up on component unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [filterButtonClicked]);

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
            apiData.length > 0 ? apiData[0].theme : ""
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
            <h1 className="text-white text-lg md:text-2xl lg:text-4xl font-semibold">
              {`Explore ${apiData.length > 0 ? apiData[0].theme : ""}`}
            </h1>
            <p className="text-white text-sm md:text-base mt-2 ">
              Lorem ipsum dolor sit amet consectetur. Sed egestas mauris ornare
              amet egestas.
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

      {/* Main Section  */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-5 mt-2 md:mt-7 ms-4 me-4 md:ms-7 md:me-7 lg:ms-10 lg:me-10 ">
        {/* Main Section > Sidebar */}
        <div className="mt-32 px-7 py-10 h-fit flex flex-col gap-6 rounded-md  max-md:hidden border-2 basis-[20%] ">
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
            className="bg-sky-600 hover:bg-sky-700 active:bg-gray-600 px-8 rounded text-center py-2 text-white place-items-end w-full"
            value="FILTER"
            onClick={handleFilterClick}
          >
            Filter
          </button>

          <button
            className="bg-red-600 hover:bg-red-800 active:bg-gray-600 px-8 rounded text-center py-2 text-white place-items-end w-full"
            value="FILTER"
            onClick={handleClearFilterClicked}
          >
            Clear Filter
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

        {/* Main Section > Mainbar */}
        <div className=" mt-10 w-full ">
          {/* this div will show only in smaller screens */}

          <div className="flex justify-between ">
            <p
              onClick={() => setFilterButtonClicked(!filterButtonClicked)}
              className={`w-28 text-center py-2 px-2md:p-2 md:px-6 rounded-lg block md:hidden ${
                filterButtonClicked ? "bg-red-600 text-white" : "bg-gray-300"
              }`}
            >
              {`${filterButtonClicked ? "Close Filter" : "Filter"}`}
            </p>
          </div>

          <div
            className={`fixed bottom-0 left-0 right-0 px-2 bg-white border-t-2 rounded-t-lg transform transition-transform duration-500 ease-in-out ${
              filterButtonClicked
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div className="flex flex-col md:hidden  py-2 gap-3 max-w-sm w-full mx-auto">
              {/* Filter Header with X button */}
              <div className="flex justify-between items-center">
                <p className="text-lg">Search By Filter</p>
                <button
                  onClick={() => setFilterButtonClicked(false)}
                  className="text-gray-600 text-xl font-bold transition-transform duration-300 transform hover:scale-110"
                >
                  &times;
                </button>
              </div>

              <div className="flex flex-wrap gap-5">
                <div className="flex gap-2 items-center">
                  <label htmlFor="fromDate" className="w-20">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleDateChange}
                    className="border-2 p-2 rounded"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <label htmlFor="toDate" className="w-20">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={handleToChange}
                    className="border-2 p-2 rounded"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    className="bg-sky-800 active:bg-gray-600 px-8 rounded-lg text-center py-2 text-white w-36"
                    value="FILTER"
                    onClick={handleFilterClick}
                  >
                    Filter
                  </button>

                  <button
                    className="bg-red-600 hover:bg-red-800 active:bg-gray-600 px-8 rounded-lg text-center py-2 text-white w-36"
                    value="FILTER"
                    onClick={handleClearFilterClicked}
                  >
                    Clear Filter
                  </button>
                </div>
              </div>

              <p className="text-lg">Sort By</p>

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
          </div>

          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div key={index} className="flex flex-col mt-10  ">
                <div
                  key={index}
                  className="flex  flex-col lg:flex-row mt-11    "
                >
                  {/* <img
                    src={
                      item.cover_img
                        ? `https://backoffice.innerpece.com/${item.cover_img}`
                        : defaultimage
                    }
                    alt=""
                    className="object-cover  lg:w-72  bg-center  rounded-none"
                  /> */}
                  <img
                    src={
                      item.cover_img
                        ? `https://backoffice.innerpece.com/${item.cover_img}`
                        : defaultimage
                    }
                    alt=""
                    className="object-cover  w-full lg:w-72 bg-center rounded-none"
                  />

                  <div className="flex flex-wrap flex-grow   flex-col gap-2 border-2 border-gray-300 py-2 px-3 ">
                    <p className="font-semibold flex-wrap text-2xl md:text-3xl">
                      {item.title}
                    </p>

                    <div className="flex items-center justify-between gap-2 flex-wrap">
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
                      ₹{item.price}
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
                      className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-900 px-5 py-1 lg:px-8 lg:py-2 rounded-lg "
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
            <div className="flex my-16 items-center justify-center w-full h-full">
              <p className="text-3xl">No programs available.</p>
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
                        className={`px-4 py-2 border-2 rounded-full text-black ${
                          currentPage === i + 1
                            ? "bg-blue-700 border-blue-700 text-white"
                            : "hover:bg-blue-600 hover:border-blue-600"
                        }`}
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

export default Programs;
