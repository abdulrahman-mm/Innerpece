import React from 'react'
import destinations from '../assets/destinations.png'

function Hero() {
  return (

     
    <div className='30vh md:h-[40vh] lg:h-[50vh] xl:h-[68vh] bg-gray-50' >

     <img src={destinations} alt="" className='bg-cover w-full bg-center'/>
     <p className='mt-10 text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'>DESTINATIONS</p>

    </div>
  )
}

export default Hero