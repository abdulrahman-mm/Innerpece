import Header from "../components/Header";
import Featuredhero from "../components/FeaturedHero";
import Featured from "../components/Featured";
import TourDetailsTwoComponents from "../components/TourDetailsTwoComponents";
import Footer from "../components/Footer";
import { useRef, useEffect } from "react";

function TourDetails() {
  useEffect(() => {
    document.title = "Tour Details - Innerpece";
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
      {/* <PaymentPolicy />
      <ImportantInfo informationRef={informationRef} />
      <TourPlanning TourPlanningRef={TourPlanningRef} />
      <Review reviewRef={reviewRef} /> */}
      <Footer />
    </div>
  );
}

export default TourDetails;
