import { useEffect } from "react";
import Header from "../components/HomeHeader";
import Hero from "../components/HomeHero";
import HomePrograms from "../components/HomePrograms";
import HomeDestinations from "../components/HomeDestinations";
import ExploreMore from "../components/ExploreMore";
import UpcomingEvents from "../components/UpcomingEvents";
import ExplorePopularEvents from "../components/ExplorePopularEvents";
import LetsGetStarted from "../components/LetsGetStarted";
import Footer from "../components/Footer";
// import ExplorePopularPackages from "../components/ExplorePopularPackages";
// import OurStoryDocumentation from "../components/OurStoryDocumentation";
// import Home_video from "../components/Home_video";
// import TalkToUs from "../components/TalkToUs";
// import Destination from "../components/Destination";

function Home() {
   useEffect(() => {
        document.title = "Innerpece";
      }, []); // Empty dependency array ensures it runs once on mount
  return (
    <div>
      <Header />
      <Hero />
      <HomePrograms />
      <HomeDestinations />
      {/* <Home_video/> */}
      <UpcomingEvents />
      <ExploreMore />
      {/* <TalkToUs /> */}
      <ExplorePopularEvents />
      {/* <Destination /> */}
      <LetsGetStarted />
      {/* <ExplorePopularPackages /> */}
      {/* <OurStoryDocumentation /> */}
      <Footer />
    </div>
  );
}

export default Home;
