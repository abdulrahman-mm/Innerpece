// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { lazy } from "react";

// let Home=lazy(()=>import("./pages/Home"))
// let AboutUs=lazy(()=>import("./pages/AboutUs"))
// let ContactUs=lazy(()=>import("./pages/ContactUs"))
// let ProgramsDetails=lazy(()=>import("./pages/ProgramsDetails"))
// let Login=lazy(()=>import("./pages/Login"))
// let SignUp=lazy(()=>import("./pages/SignUp"))
// let TourDetails=lazy(()=>import("./pages/TourDetails"))
// let DestinationsDetails=lazy(()=>import("./pages/DestinationsDetails"))
// let PageNotFound=lazy(()=>import("./pages/PageNotFound"))
// let HomeFilter=lazy(()=>import("./pages/HomeFilter"))
// let PrivacyPolicy=lazy(()=>import("./pages/PrivacyPolicy"))
// let TermsOfService=lazy(()=>import("./pages/TermsOfService"))
// let SendEnquiry=lazy(()=>import("./pages/SendEnquiry"))
// let Sitemap=lazy(()=>import("./pages/Sitemap"))
// let User_Profile=lazy(()=>import("./pages/User_Profile"))
// let User_Wishlist=lazy(()=>import("./pages/User_Wishlist"))
// let User_Enquiries=lazy(()=>import("./pages/User_Enquiries"))
// let Faq=lazy(()=>import("./pages/Faq"))

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/sendenquiry" element={<SendEnquiry />} />
//           <Route path="/aboutus" element={<AboutUs />} />
//           <Route path="/contactus" element={<ContactUs />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/:id/:title" element={<TourDetails />} />
//           <Route path="/home-filter/:city_name" element={<HomeFilter />} />
//           <Route
//             path="/programsdetails/:theme_name"
//             element={<ProgramsDetails />}
//           />
//           <Route
//             path="/destinationsdetails/:city_name"
//             element={<DestinationsDetails />}
//           />
//           <Route path="/privacypolicy" element={<PrivacyPolicy />} />
//           <Route path="/termsofservice" element={<TermsOfService />} />
//           <Route path="/sitemap" element={<Sitemap />} />
//           <Route path="*" element={<PageNotFound />} />
//           <Route path="/profile" element={<User_Profile />} />
//           <Route path="/wishlist" element={<User_Wishlist />} />
//           <Route path="/enquiries" element={<User_Enquiries />} />
//           <Route path="/faq" element={          <Faq/>} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ProgramsDetails = lazy(() => import("./pages/ProgramsDetails"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const TourDetails = lazy(() => import("./pages/TourDetails"));
const DestinationsDetails = lazy(() => import("./pages/DestinationsDetails"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const HomeFilter = lazy(() => import("./pages/HomeFilter"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const SendEnquiry = lazy(() => import("./pages/SendEnquiry"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const User_Profile = lazy(() => import("./pages/User_Profile"));
const User_Wishlist = lazy(() => import("./pages/User_Wishlist"));
const User_Enquiries = lazy(() => import("./pages/User_Enquiries"));
const Faq = lazy(() => import("./pages/Faq"));
import { HelmetProvider } from "react-helmet-async";
import Destinations from "./pages/Destinations";







function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sendenquiry" element={<SendEnquiry />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:id/:title" element={<TourDetails />} />
          <Route path="/home-filter/:city_name" element={<HomeFilter />} />
          <Route
            path="/programsdetails/:theme_id/:theme_name"
            element={<ProgramsDetails />}
          />
          <Route
            path="/destinationsdetails/:city_id/:city_name"
            element={<DestinationsDetails />}
          />
          <Route path="/destinations" element={<Destinations/>} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/profile" element={<User_Profile />} />
          <Route path="/wishlist" element={<User_Wishlist />} />
          <Route path="/enquiries" element={<User_Enquiries />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
