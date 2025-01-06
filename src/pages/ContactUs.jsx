import React from "react";
import Header from "../components/Header";
import ContactUsHero from "../components/ContactUsHero";
import ContactUsGetInTouch from "../components/ContactUsGetInTouch";
import ContactUsVisitOurOffice from "../components/ContactUsVisitOurOffice";
import ContactUsVisitOurFaq from "../components/ContactUsFaq";
import Footer from "../components/Footer";
import { useEffect } from "react";

function ContactUs() {
    useEffect(() => {
      document.title = "Contact Us - Innerpece";
    }, []); // Empty dependency array ensures it runs once on mount
  return (
    <div>
      <Header />
      <ContactUsHero />
      <ContactUsGetInTouch />
      <ContactUsVisitOurOffice />
      <ContactUsVisitOurFaq />
      <Footer />
    </div>
  );
}

export default ContactUs;
