import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  let navigate=useNavigate()

  return (
    <div className="bg-[url('././assets/Loginhero.png')]  h-[30vh] md:h-[50vh]  w-full bg-no-repeat bg-center bg-cover">
      
      <div className='flex flex-col h-full items-center justify-center gap-5'>
        <p className='text-white text-4xl font-bold'>User Login</p>
        <div className='flex gap-5'>
          <p className='text-sky-200 cursor-pointer' onClick={()=>navigate('/')}>Home</p>
          <p className='text-white'>User Login</p>

        </div>


      </div>
    </div>
  )
}

export default Hero