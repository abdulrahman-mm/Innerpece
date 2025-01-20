import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SendEnquiryHero from "../components/SendEnquiryHero";
import SendEnquiryForm from "../components/SendEnquiryForm";

const SendEnquiry = () => {
  useEffect(() => {
    document.title = "Login - Innerpece";
  }, []);
  return (
    <div>
      <Header />
      <SendEnquiryHero/>
      <SendEnquiryForm/>
      <Footer />
    </div>
  );
};

export default SendEnquiry;
