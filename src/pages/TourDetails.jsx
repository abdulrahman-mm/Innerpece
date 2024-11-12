import Header from "../components/Header";
import Featuredhero from "../components/FeaturedHero";
import Featured from "../components/Featured";
import TourDetailsTwoComponents from "../components/TourDetailsTwoComponents";
import ImportantNotice from "../components/ImportantNotice";
import CampRules from "../components/CampRules";
import TourPlanning from "../components/TourPlanning";
import Review from "../components/Review";
import Footer from "../components/Footer";
import PaymentPolicy from "../components/PaymentPolicy";
import ImportantInfo from "../components/ImportantInfo";

function TourDetails() {
  return (
    <div>
      <Header />
      <Featuredhero />
      <Featured />
      <TourDetailsTwoComponents />
      <PaymentPolicy />
      <ImportantInfo />
      <TourPlanning />
      <Review />
      <Footer />
    </div>
  );
}

export default TourDetails;
{
  /* <CampRules /> */
}
{
  /* <ImportantNotice /> */
}
