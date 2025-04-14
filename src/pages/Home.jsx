import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";

let Header = lazy(() => import("../components/HomeHeader"));
let Hero = lazy(() => import("../components/HomeHero"));
let HomePrograms = lazy(() => import("../components/HomePrograms"));
let HomeDestinations = lazy(() => import("../components/HomeDestinations"));
let ExploreMore = lazy(() => import("../components/ExploreMore"));
let UpcomingEvents = lazy(() => import("../components/UpcomingEvents"));
let ExplorePopularEvents = lazy(() =>
  import("../components/ExplorePopularEvents")
);
let LetsGetStarted = lazy(() => import("../components/LetsGetStarted"));
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";
import { Container, Button, Link } from "react-floating-action-button";
import axios from "axios";
import Swal from "sweetalert2";
let Perfecttraveltype = lazy(() => import("../components/Perfecttraveltype"));
// import Perfecttraveltype from "";
import TripCategories from "../components/TripCategories";

function Home() {
  // const [isLoading, setIsLoading] = useState(true); // Loading state
  const [assistanceFormClicked, setAssiatanceFormClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [comments, setComments] = useState("");
  const [loginError, setLoginError] = useState({});

  useEffect(() => {
    document.title = "Innerpece";
  }, []);

  useEffect(() => {
    if (assistanceFormClicked) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [assistanceFormClicked]);

  const onClickSubmit = async () => {
    try {
      let response = await axios.post(
        "https://backoffice.innerpece.com/api/v1/assistance",
        {
          name,
          email,
          phone,
          comments,
        }
      );

      setName("");
      setEmail("");
      setphone("");
      setComments("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        setAssiatanceFormClicked(false);
      }, 1700);
    } catch (err) {
      console.log(err);
      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
    }
  };

  return (
    <div>
      <div
        onClick={() => window.open("https://wa.me/6384131642")}
        className="fixed whatsapp z-50 bottom-2 right-2 cursor-pointer flex items-center group"
      >
        <div className="text-black opacity-0 scale-90 translate-x-5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 bg-white px-2 py-1 rounded-md shadow-md ml-2 transition-all duration-300">
          <p>Whatsapp Enquiry</p>
        </div>
        <img
          src={whatsapp}
          className="h-10 w-10  transition-all duration-500"
        />
      </div>

      <div>
        <div
          onClick={() => setAssiatanceFormClicked(!assistanceFormClicked)}
          className="fixed group top-1/2 right-0 -translate-y-1/2 z-20 "
        >
          <div className="flex flex-col items-center justify-center    rounded-l-md cursor-pointer text-xs sm:text-sm px-1 sm:px-2 py-3 font-medium font-raleway text-white bg-blue-600 ">
            <p className="leading-tight">A</p>
            <p className="leading-tight">S</p>
            <p className="leading-tight">S</p>
            <p className="leading-tight">I</p>
            <p className="leading-tight">S</p>
            <p className="leading-tight">T</p>
            <p className="leading-tight">A</p>
            <p className="leading-tight">N</p>
            <p className="leading-tight">C</p>
            <p className="leading-tight">E</p>
            <p className="h-2"></p>
            <p className="leading-tight">F</p>
            <p className="leading-tight">O</p>
            <p className="leading-tight">R</p>
            <p className="leading-tight">M</p>
          </div>
        </div>

        {assistanceFormClicked && (
          <>
            <div
              className="fixed inset-0 z-40   bg-black/20 backdrop-blur-sm transition-opacity duration-300" // Blur and overlay
              style={{ opacity: assistanceFormClicked ? 1 : 0 }} // Smooth fade-in/out
              onClick={() => setAssiatanceFormClicked(false)} // Close on overlay click
            ></div>
            <div
              className="fixed inset-y-0 right-0 z-50 flex flex-col items-center justify-center w-full  h-full transition-transform duration-300 ease-in-out transform"
              style={{
                transform: assistanceFormClicked
                  ? "translateX(0)"
                  : "translateX(100%)",
              }}
            >
              <div className="relative font-mulish h-fit rounded-xl   bg-white p-5 md:p-8 shadow-xl overflow-y-auto">
                <button
                  onClick={() => setAssiatanceFormClicked(false)}
                  className="absolute right-4 top-4 p-2 text-gray-500 transition hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="mb-6 text-2xl font-bold font-mulish text-gray-800">
                  Get Assistance
                </h2>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter your name"
                    />
                    {loginError.name && (
                      <p className="text-red-500 text-xs sm:text-sm ">
                        {loginError.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter your email"
                    />
                    {loginError.email && (
                      <p className="text-red-500 text-xs sm:text-sm ">
                        {loginError.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter your phone no"
                    />
                    {loginError.phone && (
                      <p className="text-red-500 text-xs sm:text-sm ">
                        {loginError.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="comments"
                      className="text-sm font-medium text-gray-700"
                    >
                      Comments
                    </label>
                    <textarea
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows="2"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter your message here..."
                    />
                    {loginError.comments && (
                      <p className="text-red-500 text-xs sm:text-sm ">
                        {loginError.comments}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <button
                      onClick={onClickSubmit}
                      type="submit"
                      className="w-fit rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Header />
        <Hero />
        <HomePrograms />
        <Perfecttraveltype />
        <HomeDestinations />
        {/* <UpcomingEvents /> */}
        {/* <ExploreMore /> */}
        {/* <ExplorePopularEvents /> */}
        {/* <TripCategories /> */}
        <LetsGetStarted />
        <Footer />
      </Suspense>
    </div>
  );
}
export default Home;
