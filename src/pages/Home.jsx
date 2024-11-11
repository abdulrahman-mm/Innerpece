import Header from "../components/HomeHeader";
import Hero from "../components/HomeHero";
import HomePrograms from "../components/HomePrograms";
import HomeDestinations from "../components/HomeDestinations";
import ExploreMore from "../components/ExploreMore";
import UpcomingEvents from "../components/UpcomingEvents";
import TalkToUs from "../components/TalkToUs";
import ExplorePopularEvents from "../components/ExplorePopularEvents";
import Destination from "../components/Destination";
import LetsGetStarted from "../components/LetsGetStarted";
import ExplorePopularPackages from "../components/ExplorePopularPackages";
import OurStoryDocumentation from "../components/OurStoryDocumentation";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Header />
      {/* <Hero /> */}
      {/* <HomePrograms /> */}
      {/* <HomeDestinations /> */}
      {/* <ExploreMore /> */}
      <UpcomingEvents />
      <TalkToUs />
      <ExplorePopularEvents />
      <Destination />
      <LetsGetStarted />
      <ExplorePopularPackages />
      <OurStoryDocumentation />
      <Footer />
    </div>
  );
}

export default Home;
