import React from "react";
import Header from "../components/Header";
import ContactUsHero from "../components/ContactUsHero";
import ContactUsGetInTouch from "../components/ContactUsGetInTouch";
import ContactUsVisitOurOffice from "../components/ContactUsVisitOurOffice";
import ContactUsVisitOurFaq from "../components/ContactUsFaq";
import Footer from "../components/Footer";
import { useEffect,useState } from "react";

function ContactUs() {
      const [isLoading, setIsLoading] = useState(true); // Loading state
  
    useEffect(() => {
      document.title = "Contact Us - Innerpece";
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
      <ContactUsHero />
      <ContactUsGetInTouch />
      <ContactUsVisitOurOffice />
      {/* <ContactUsVisitOurFaq /> */}
      <Footer />
    </div>
  );
}

export default ContactUs;
