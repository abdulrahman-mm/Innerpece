import React from "react";
import Header from "../components/Header.jsx";
import ProgramsDetailsHero from "../components/ProgramsDetailsHero.jsx";
import ProgramsDetailsTwoComponents from "../components/ProgramsTwoComponents.jsx";
import Footer from "../components/Footer.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Programs() {
  const location = useLocation();
  const { id, themes_name } = location.state || {};
  const [apiData, setApiData] = useState([]);

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

  return (
    <div>
      <Header />
      <ProgramsDetailsHero apiData={apiData} />
      <ProgramsDetailsTwoComponents
        apiData={apiData}
        setApiData={setApiData}
        themes_name={themes_name}
      />
      <Footer />
    </div>
  );
}

export default Programs;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import "../../../assets/css/Events/Upcomingevents.css";
// import Location from "../../../assets/img/Events/location.img.svg";
// import data from "../../../assets/img/Events/calendar_img.svg";
// import Person from "../../../assets/img/Events/person_img.svg";
// import Days from "../../../assets/img/Events/days_img.svg";
// import star from "../../../assets/img/sample/Star.png";
// import staret from "../../../assets/img/sample/Staret.png";
// import defaultimg from "../../../assets/img/defaultimg.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function PopularEvents() {

//   const location = useLocation();
//   const { id, themes_name } = location.state || {};
//   const [theme, setTheme] = useState("");
//   const [loading, setLoading] = useState(true);
//   //for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(2);
//   //for date filter
//   const [startDate, setStartDate] = useState('');
//   //for sortby
//   const [sortBy, setSortBy] = useState('');
//   //for search
//   const [searchTitle, setSearchTitle] = useState('');

//   useEffect(() => {

//     if (id) {
//       setTheme(themes_name);
//     }
//   }, [id, themes_name]);

//   const [programData, setProgramData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProgramData = async () => {

//       try {
//         const response = await axios.post(
//           "https://backoffice.innerpece.com/api/get-program",
//           {
//             theme: id, // Assuming `id` is the theme ID you want to filter by
//           }
//         );

//         if (response.data.status === "success") {
//           setProgramData(response.data.data);
//           console.log('program', response.data.data);
//           // Update meta tags dynamically

//           if (response.data.data.length > 0) {

//             const firstProgram = response.data.data[0]; // Assuming you want the first program's details
//             document.title = firstProgram.title || "Default Title";
//             const metaOgTitle = document.querySelector("meta[property='og:title']");
//             if (metaOgTitle) {
//               metaOgTitle.setAttribute("content", firstProgram.title || "Default Title");
//             }
//             const metaOgDescription = document.querySelector("meta[property='og:description']");
//             if (metaOgDescription) {
//               metaOgDescription.setAttribute("content", firstProgram.category || "Default description");
//             }
//             const metaOgImage = document.querySelector("meta[property='og:image']");
//             if (metaOgImage) {
//               metaOgImage.setAttribute("content", `https://backoffice.innerpece.com/${firstProgram.cover_img}` || '');
//             }

//           }

//         } else {
//           setError(response.data.message || "Failed to fetch program details.");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProgramData();
//   }, [id]);

//   document.addEventListener("DOMContentLoaded", () => {
//     const ratingStars = document.querySelectorAll(
//       '.star-rating1 input[type="radio"]'
//     );
//     ratingStars.forEach((star) => {
//       star.addEventListener("change", (event) => {
//         console.log(`Rated ${event.target.value} stars`);
//       });
//     });
//   });
//   const [value, setValue] = useState(3000);
//   const minValue = 3000;
//   const maxValue = 25000;
//   const handleInputChange = (event) => {
//     setValue(event.target.value);
//   };
//   const navigate = useNavigate();
//   const handleClick = (id, title) => {
//     const formattedTitle = title
//       .toLowerCase()
//       .replace(/[^a-z0-9_]+/g, "-")
//       .replace(/_+/g, "-")
//       .replace(/^_+|_+$/g, "");
//     navigate(`/${id}/${formattedTitle}`, { state: { id, title } });
//   };
//   const handleDateChange = (e) => {
//     setStartDate(e.target.value);
//   };
//   const handleFilterClick = async () => {
//     try {
//       const response = await axios.post('https://backoffice.innerpece.com/api/filter-program-by-date', {
//         start_date: startDate,
//         theme: themes_name
//       });
//       if (response.data.status === 'success') {
//         if (response.data.data.length === 0) {
//           setProgramData([]);
//         } else {
//           setProgramData(response.data.data);
//         }
//       } else {
//         console.error('Error fetching programs:', response.data.message);
//         setProgramData([]);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setProgramData([]);
//     }
//   };
//   const handleSortChange = async (event) => {
//     const selectedSort = event.target.value;
//     setSortBy(selectedSort);
//     try {
//       const response = await axios.post('https://backoffice.innerpece.com/api/sort-program', {
//         sort_by: selectedSort,
//         theme: themes_name
//       });
//       console.log('API response:', response.data); // Inspect response data
//       if (response.data.status === 'success') {
//         const dataObject = response.data.data;
//         // Convert the data object to an array
//         const dataArray = Object.values(dataObject);
//         setProgramData(dataArray);
//       } else {
//         console.error('Error sorting programs:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   const handleSearchClick = async () => {
//     try {
//       // Post request to search-program API
//       const response = await axios.post('https://backoffice.innerpece.com/api/search-program', {
//         title: searchTitle,
//         theme: themes_name
//       });
//       if (response.data.status === 'success') {
//         if (response.data.data.length === 0) {
//           setProgramData([]); // No data found, set empty array
//         } else {
//           setProgramData(response.data.data); // Set the retrieved data
//         }
//       } else {
//         console.error('Error fetching programs:', response.data.message);
//         setProgramData([]); // Error occurred, set empty array
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setProgramData([]); // Set empty array on exception
//     }
//   };
//   //for pagination
//   // Get current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   console.log('indexOfLastItem', indexOfLastItem);
//   console.log('indexOfFirstItem', indexOfFirstItem);
//   const currentItems = Array.isArray(programData)
//     ? programData.slice(indexOfFirstItem, indexOfLastItem)
//     : [];
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <>
//       <div className="section2 mt-3">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-12 w-100 mt-5 mb-5">
//               <div className="Western-Navigation-bar1">
//                 <span className="hmmtr">
//                   {" "}
//                   <a href="">Home</a> &gt; Explore {theme}
//                 </span>
//               </div>
//             </div>
//             <div className="titleBack row">
//               <div className="col-12">
//                 <div className="banner text-center1">
//                   <div>
//                     <h5 className="banner-title1">Explore {theme}</h5>
//                   </div>
//                   <h6 className="banner-desc1 mt-2">
//                     madhu ipsum dolor sit amet consectetur. Sed egestas mauris
//                     ornare amet egestas.
//                   </h6>
//                   <div class="input-group">
//                     <input
//                       type="search"
//                       class="form-control "
//                       placeholder="Search"
//                       aria-label="Search"
//                       aria-describedby="search-addon"
//                       value={searchTitle}
//                       onChange={(e) => setSearchTitle(e.target.value)}
//                     />
//                     <button
//                       type="button"
//                       class="btn-search"
//                       data-mdb-ripple-init
//                       onClick={handleSearchClick}
//                     >
//                       search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container-fluid">
//           <div className="row ">
//             <button
//               className="btn btn-primary d-lg-none mb-3 papular_button_fill"
//               type="button"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasSidebar"
//               aria-controls="offcanvasSidebar"
//             >
//               Open Filters
//             </button>
//             <div className="col-lg-3 sidebarr d-none d-lg-block">
//               <div className="p-5 border rounded d-grid" style={{ fontWeight: "600" }}>
//                 <p className="serchfilters"> Search By Filter</p>
//                 <div className="row border p-2 ps-2 rounded align-items-center mt-3 sidenav">
//                   <div className="col-2">
//                     <img src={data} alt="Data img" />
//                   </div>
//                   <div className="col-10">
//                     <input
//                       type="date"
//                       className="col-12 border-0 p-1 fontcolor"
//                       placeholder="Select Date"
//                       value={startDate}
//                       onChange={handleDateChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-container">
//                   <div className="ttrre">
//                     <input className="btn fill" type="button" value="FILTER" onClick={handleFilterClick} />
//                   </div>
//                 </div>
//                 <div className="sort-by-container mt-3">
//                   <p className="serchfilters">Sort By</p>
//                   <select className="form-select" onChange={handleSortChange} value={sortBy}>
//                     <option value="">Select Sort Option</option>
//                     <option value="recent">Recent Event</option>
//                     <option value="price_low_to_high">Low Price</option>
//                     <option value="price_high_to_low">High Price</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {/* Offcanvas Sidebar (Visible on Mobile Screens) */}
//             <div
//               className="offcanvas offcanvas-start"
//               tabIndex="-1"
//               id="offcanvasSidebar"
//               aria-labelledby="offcanvasSidebarLabel"
//             >
//               <div className="offcanvas-header">
//                 <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
//                   Search By Filter
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close mt-5"
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="offcanvas-body">
//                 <p className="serchfilters"> Search By Filter</p>
//                 <div className="row border p-2 ps-2 rounded align-items-center mt-3 sidenav">
//                   <div className="col-2">
//                     <img src={data} alt="Data img" />
//                   </div>
//                   <div className="col-10">
//                     {/* Change the select dropdown to a date input */}
//                     <input
//                       type="date"
//                       className="col-12 border-0 p-1 fontcolor"
//                       placeholder="Select Date"
//                     />
//                   </div>
//                 </div>

//               </div>
//             </div>
//             <div className="col-lg-9 col-md-8 col-sm-12 d-grid gap-3 totals_column">
//               <div className="d-flex justify-content-between p-2 mt-5 rounded ">
//               </div>
//               {loading && <p>Loading...</p>}
//               {error && <p>Error: {error}</p>}
//               <div>
//                 {currentItems.length > 0 ? (
//                   currentItems.map((event, index) => (
//                     <div
//                       key={index}
//                       className="d-flex justify-content-between row rounded mb-4 sharder cardsize"
//                     >
//                       <div
//                         className="card col-lg-4 col-md-4 col-sm-1 justify-content-center align-items-center"
//                         id="popular_145"
//                       >
//                         <img
//                           src={event.cover_img ? `https://backoffice.innerpece.com/${event.cover_img}` : defaultimg}
//                           alt="Location img"
//                           className="full-size-img"
//                         />
//                         <p className="ftrr">{event.category}</p>
//                       </div>
//                       <div className="col-lg-8 col-sm-12 col-md-8 p-3 total_body_coloum">
//                         <div className="row">
//                           <div className="col-lg-8 col-sm-12 d-flex mb-3">
//                             <div className="me-3">
//                               <img
//                                 src={Location}
//                                 alt="Location img"
//                                 className="location-img img-fluid"
//                                 id="lls"
//                               />
//                             </div>
//                             <p>{event.location}</p>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-sm-12 Fontevent">
//                             <a
//                               onClick={() => handleClick(event.id, event.title)}
//                               className="titletx"
//                             >
//                               <h2 className="titletx">{event.title}</h2>
//                             </a>
//                           </div>
//                         </div>
//                         <div className="row strrors">
//                           <div className="col-6 col-sm-6 col-md-3">
//                             <div className="star-rating1 ">
//                               {[...Array(5)].map((_, starIndex) => (
//                                 <li className="stars" key={starIndex}>
//                                   <img
//                                     src={
//                                       starIndex < Math.round(event.average_rating)
//                                         ? star
//                                         : staret
//                                     }
//                                     alt="Star"
//                                   />
//                                 </li>
//                               ))}
//                             </div>
//                           </div>
//                           <div className="col-6 col-sm-6 col-md-9 mt-2">
//                             <p className="reviewevent">
//                               ({event.totalReviews} Review
//                               {event.totalReviews > 1 && "s"})
//                             </p>
//                           </div>
//                         </div>
//                         <div className="row align-items-center strrors mb-2">
//                           <div className="col-6 col-md-3 d-flex align-items-center person_column">
//                             <img src={Days} alt="Days img" className="me-1" />
//                             <p className="reviewevent1 mt-3">
//                               {event.total_days} Days
//                             </p>
//                           </div>
//                           <div className="col-6 col-md-4 d-flex align-items-center person_column">
//                             <img src={Person} alt="Person img" className="me-1" />
//                             <p className="reviewevent1 mt-3">
//                               {event.member_capacity} Person
//                             </p>
//                           </div>
//                         </div>
//                         <hr className="light-line popular_1" />
//                         <div className="row d-flex   popular_1">
//                           <div className="col-lg-8 col-md-6 col-sm-2 d-flex">
//                             <span className="from-text ">From</span>
//                             <span className="price-text23 ms-2 ">
//                               &#8377;{event.actual_price}
//                             </span>
//                             <s className="ms-3">&#8377;{event.price}</s>
//                             <div className="col-lg-9 col-md-6 col-sm-12 ">
//                               <div
//                                 className="btn linkButton1 linkButton45 float-endzzzzz"
//                                 onClick={() => handleClick(event.id, event.title)}
//                                 style={{ cursor: "pointer" }}
//                               >
//                                 View <i className="fas fa-arrow-right"></i>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="no-data-container">
//                     <p>No programs available.</p>
//                   </div>
//                 )}
//                 {/* Pagination Controls */}
//                 <nav>
//                   <div className="pagination-container">
//                     <ul className="pagination">
//                       {Array.from(
//                         { length: Math.ceil(programData.length / itemsPerPage) },
//                         (_, i) => (
//                           <li key={i + 1} className="page-item">
//                             <button
//                               onClick={() => paginate(i + 1)}
//                               className={`page-link ${currentPage === i + 1 ? "active" : ""}`}
//                             >
//                               {i + 1}
//                             </button>
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default PopularEvents;
