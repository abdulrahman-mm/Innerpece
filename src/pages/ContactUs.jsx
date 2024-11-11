import React from 'react'
import Header from '../components/Header'
import ContactUsHero from '../components/ContactUsHero'
import ContactUsGetInTouch from '../components/ContactUsGetInTouch'
import ContactUsVisitOurOffice from '../components/ContactUsVisitOurOffice'
import ContactUsVisitOurFaq from '../components/ContactUsFaq'
import Footer from '../components/Footer'

function ContactUs() {
  return (
    <div>
     <Header/>
     <ContactUsHero/>
     <ContactUsGetInTouch/>
     <ContactUsVisitOurOffice/>
     <ContactUsVisitOurFaq/>
     <Footer/>

    </div>
  )
}

export default ContactUs