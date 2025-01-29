import React from "react";
import { useEffect,useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SendEnquiryHero from "../components/SendEnquiryHero";
import SendEnquiryForm from "../components/SendEnquiryForm";

const SendEnquiry = () => {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    document.title = "Send Enquiry - Innerpece";
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
  return (
    <div>
      <Header />
      <SendEnquiryHero />
      <SendEnquiryForm />
      <Footer />
    </div>
  );
};

export default SendEnquiry;
