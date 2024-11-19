import Header from "../components/Header";
import Featuredhero from "../components/FeaturedHero";
import Featured from "../components/Featured";
import TourDetailsTwoComponents from "../components/TourDetailsTwoComponents";
import TourPlanning from "../components/TourPlanning";
import Review from "../components/Review";
import Footer from "../components/Footer";
import PaymentPolicy from "../components/PaymentPolicy";
import ImportantInfo from "../components/ImportantInfo";
import { useRef } from "react";

function TourDetails() {
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
      <TourDetailsTwoComponents LocationShareRef={LocationShareRef} />
      <PaymentPolicy />
      <ImportantInfo informationRef={informationRef} />
      <TourPlanning TourPlanningRef={TourPlanningRef} />
      <Review reviewRef={reviewRef} />
      <Footer />
    </div>
  );
}

export default TourDetails;

