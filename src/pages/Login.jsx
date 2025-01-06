import React from 'react'
import Header from '../components/Header'
import LoginHero from '../components/LoginHero'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'
import { useEffect } from "react";



function Login() {
  useEffect(() => {
      document.title = "Login - Innerpece";
    }, []); // Empty dependency array ensures it runs once on mount
  return (
    <div>
     <Header/>
     <LoginHero/>
     <LoginForm/>
     <Footer/>


    </div>
  )
}

export default Login