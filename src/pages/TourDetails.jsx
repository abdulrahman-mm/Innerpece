import { lazy, Suspense } from "react";
let Header = lazy(() => import("../components/Header"));
let Featuredhero = lazy(() => import("../components/FeaturedHero"));
let Featured = lazy(() => import("../components/Featured"));
let TourDetailsTwoComponents = lazy(() =>
  import("../components/TourDetailsTwoComponents")
);
let Footer = lazy(() => import("../components/Footer"));
import { useRef, useEffect, useState } from "react";
import whatsapp from "../assets/whatsapp.svg";

function TourDetails() {
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Tour Details - Innerpece";
  }, []); // Empty dependency array ensures it runs once on mount

  let informationRef = useRef(null);
  let TourPlanningRef = useRef(null);
  let LocationShareRef = useRef(null);
  let reviewRef = useRef(null);

  let dummyRef=useRef(null)

  const handleInformationScroll = () => {
    informationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleTourPlanningScroll = () => {
    TourPlanningRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocationShareScroll = () => {
    LocationShareRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const reviewRefScroll = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
  //       <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-[#FEFEFE]">
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
        <Featuredhero
          handleInformationScroll={handleInformationScroll}
          handleTourPlanningScroll={handleTourPlanningScroll}
          handleLocationShareScroll={handleLocationShareScroll}
          reviewRefScroll={reviewRefScroll}
        />
        <Featured />
        <TourDetailsTwoComponents
          LocationShareRef={LocationShareRef}
          informationRef={informationRef}
          TourPlanningRef={TourPlanningRef}
          reviewRef={reviewRef}
          dummyRef={dummyRef}
        />
        <Footer />
      </Suspense>
    </div>
  );
}

export default TourDetails;
