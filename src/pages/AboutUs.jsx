import React from "react";
import { useEffect,useState } from "react";
import Header from "../components/Header";
import AboutUsHero from "../components/AboutUsHero";
import AboutUsMission from "../components/AboutUsOurMission";
import AboutUsOurStory from "../components/AboutUsOurStory";
import AboutUsOurValue from "../components/AboutUsOurValue";
import AboutUsGroupImg from "../components/AboutUsGroupImg";
import Footer from "../components/Footer";

function AboutUs() {
    const [isLoading, setIsLoading] = useState(true); // Loading state
  
  useEffect(() => {
    document.title = "About Us - Innerpece";
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []); // Empty dependency array ensures it runs once on mount


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
      <AboutUsHero />
      <AboutUsMission />
      <AboutUsOurStory />
      <AboutUsOurValue />
      <AboutUsGroupImg />
      <Footer />
    </div>
  );
}

export default AboutUs;
