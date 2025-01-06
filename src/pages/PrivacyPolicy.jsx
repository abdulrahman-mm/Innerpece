import React from 'react'
import Header from '../components/Header'
import Privacypolicy_Hero from '../components/Privacypolicy_Hero'
import Privacypolicy_Content from '../components/Privacypolicy_Content'
import Footer from '../components/Footer'
import { useEffect } from 'react'



function PrivacyPolicy() {
    useEffect(() => {
      document.title = "Privacy Policy - Innerpece";
    }, []); // Empty dependency array ensures it runs once on mount
  return (
    <div>
     <Header/>
     <Privacypolicy_Hero/>
     <Privacypolicy_Content/>
     <Footer/>

    </div>
  )
}

export default PrivacyPolicy