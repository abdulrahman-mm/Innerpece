import Header from "../components/Header";
import Featuredhero from "../components/FeaturedHero";
import Featured from "../components/Featured";
import TourDetailsTwoComponents from "../components/TourDetailsTwoComponents";
import Footer from "../components/Footer";
import { useRef, useEffect, useState } from "react";

function TourDetails() {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Tour Details - Innerpece";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []); // Empty dependency array ensures it runs once on mount

  let informationRef = useRef(null);
  let TourPlanningRef = useRef(null);
  let LocationShareRef = useRef(null);
  let reviewRef = useRef(null);

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
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
      />
      <Footer />
    </div>
  );
}

export default TourDetails;
