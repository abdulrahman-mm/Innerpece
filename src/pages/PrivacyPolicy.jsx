import React from 'react'
import Header from '../components/Header'
import Privacypolicy_Hero from '../components/Privacypolicy_Hero'
import Privacypolicy_Content from '../components/Privacypolicy_Content'
import Footer from '../components/Footer'
import { useEffect,useState } from 'react'



function PrivacyPolicy() {
    const [isLoading, setIsLoading] = useState(true); // Loading state
  
    useEffect(() => {
      document.title = "Privacy Policy - Innerpece";
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200); // Adjust time as needed
  
      return () => clearTimeout(timer); // Cleanup timeout
    
    }, []); // Empty dependency array ensures it runs once on mount

    if (isLoading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      );
    }

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