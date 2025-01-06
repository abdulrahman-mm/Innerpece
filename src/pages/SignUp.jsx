import React from "react";
import Header from "../components/Header";
import SignupHero from "../components/SignupHero";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";
import { useEffect } from "react";

function SignUp() {
  // / Empty dependency array ensures it runs once on mount
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
