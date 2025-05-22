import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";

let Header = lazy(() => import("../components/HomeHeader"));
let Hero = lazy(() => import("../components/HomeHero"));
let HomePrograms = lazy(() => import("../components/HomePrograms"));
let HomeDestinations = lazy(() => import("../components/HomeDestinations"));
let HomeStays=lazy(()=>import('../components/HomeStays'))

let LetsGetStarted = lazy(() => import("../components/LetsGetStarted"));
let Footer = lazy(() => import("../components/Footer"));
import whatsapp from "../assets/whatsapp.svg";
import axios from "axios";
import Swal from "sweetalert2";
let Perfecttraveltype = lazy(() => import("../components/Perfecttraveltype"));
import TripCategories from "../components/TripCategories";
import Blogs from "../components/Blogs";

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
        <HomeStays/>
        <LetsGetStarted />
        <Blogs />
        <Footer />
      </Suspense>
    </div>
  );
}
export default Home;
