import React from "react";
import Header from "../components/Header";
import SignupHero from "../components/SignupHero";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";



function SignUp() {
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        document.title = "Signup - Innerpece";
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
      <SignupHero />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default SignUp;
