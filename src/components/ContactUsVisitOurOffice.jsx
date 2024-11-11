import React from 'react'
import map from '../assets/contactusmap.png'

function VisitOurOffice() {
  return (
    <div className='bg-gray-100/70'>
     <div className="flex items-center  flex-col md:flex-row px-5 md:px-20 lg:px-30 xl:px-40 gap-5  md:gap-8 lg:gap-12 xl:gap-16 py-8 mt-12">

          <div className='flex flex-col flex-grow basis-[40%] gap-5'>
               <p className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Visit Our Office</p>
               <p className='text-gray-400'>Eget lorem mattis amet elementum. Aliquet elementum amet nascetur cras at arcu cras eget. Enim vitae egestas in pulvinar ullamcorper. Orci turpis ante et gravida. Tortor in adipiscing in vitae velit. Tincidunt suspendisse et aenean egestas lectus arcu. Quisque erat sit massa id sed eleifend ac.</p>

               <button className='bg-sky-800 px-5 py-2 md:px-7 md:py-3  lg:px-8 lg:py-4 xl:px-10 xl:py-5 w-fit rounded-full text-white'>Get Direction</button>

          </div>

          <div className=' basis-[40%]'>

               <img src={map} alt="" className='rounded-3xl' />

          </div>

     </div>
    </div>
  )
}

export default VisitOurOffice