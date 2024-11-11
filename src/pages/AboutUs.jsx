import React from 'react'
import Header from '../components/Header'
import AboutUsHero from '../components/AboutUsHero'
import AboutUsMission from '../components/AboutUsOurMission'
import AboutUsOurStory from '../components/AboutUsOurStory'
import AboutUsOurValue from '../components/AboutUsOurValue'
import AboutUsGroupImg from '../components/AboutUsGroupImg'
import Footer from '../components/Footer'

function AboutUs() {
  return (
    <div>
     <Header/>
     <AboutUsHero/>
     <AboutUsMission/>
     <AboutUsOurStory/>
     <AboutUsOurValue/>
     <AboutUsGroupImg/>
     <Footer/>
     
    </div>
  )
}

export default AboutUs