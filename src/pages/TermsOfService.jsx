import React from 'react'
import Header from '../components/Header'
import TermsOfServices_Hero from '../components/TermsOfServices_Hero'
import TermsOfServices_Content from '../components/TermsOfServices_Content'
import Footer from '../components/Footer'
import { useEffect } from 'react'

function TermsOfService() {
    useEffect(() => {
      document.title = "Terms of service - - Innerpece";
    }, []); // Empty dependency array ensures it runs once on mount
  return (
    <div>
     <Header/>
     <TermsOfServices_Hero/>
     <TermsOfServices_Content/>
     <Footer/>
    </div>
  )
}

export default TermsOfService