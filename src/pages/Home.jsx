// import { useEffect } from "react";
// import Header from "../components/HomeHeader";
// import Hero from "../components/HomeHero";
// import HomePrograms from "../components/HomePrograms";
// import HomeDestinations from "../components/HomeDestinations";
// import ExploreMore from "../components/ExploreMore";
// import UpcomingEvents from "../components/UpcomingEvents";
// import ExplorePopularEvents from "../components/ExplorePopularEvents";
// import LetsGetStarted from "../components/LetsGetStarted";
// import Footer from "../components/Footer";

// function Home() {
//   useEffect(() => {
//     document.title = "Innerpece";
//   }, []); // Empty dependency array ensures it runs once on mount

//   return (
//     <div>
//       <Header />
//       <Hero />
//       <HomePrograms />
//       <HomeDestinations />
//       <UpcomingEvents />
//       <ExploreMore />
//       <ExplorePopularEvents />
//       <LetsGetStarted />
//       <Footer />
//     </div>
//   );
// }

// export default Home;

import { useEffect, useState } from "react";
import Header from "../components/HomeHeader";
import Hero from "../components/HomeHero";
import HomePrograms from "../components/HomePrograms";
import HomeDestinations from "../components/HomeDestinations";
import ExploreMore from "../components/ExploreMore";
import UpcomingEvents from "../components/UpcomingEvents";
import ExplorePopularEvents from "../components/ExplorePopularEvents";
import LetsGetStarted from "../components/LetsGetStarted";
import Footer from "../components/Footer";

function Home() {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Innerpece";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  

  // Return the main content after loading is complete
  return (
    <div>
      <Header />
      <Hero />
      <HomePrograms />
      <HomeDestinations />
      <UpcomingEvents />
      <ExploreMore />
      <ExplorePopularEvents />
      <LetsGetStarted />
      <Footer />
    </div>
  );
}

export default Home;
