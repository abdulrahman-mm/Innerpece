import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ProgramsDetails from "./pages/ProgramsDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TourDetails from "./pages/TourDetails";
import DestinationsDetails from "./pages/DestinationsDetails";
import PageNotFound from "./pages/PageNotFound";
import HomeFilter from "./pages/HomeFilter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import SendEnquiry from "./pages/SendEnquiry";
import Sitemap from "./pages/Sitemap";
import User_Profile from "./pages/User_Profile";
import User_Wishlist from "./pages/User_Wishlist";
import User_Enquiries from "./pages/User_Enquiries";
import Faq from "./pages/Faq";

function App() {
  return (
    <>
      <BrowserRouter>
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
            path="/programsdetails/:theme_name"
            element={<ProgramsDetails />}
          />
          <Route
            path="/destinationsdetails/:city_name"
            element={<DestinationsDetails />}
          />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/profile" element={<User_Profile />} />
          <Route path="/wishlist" element={<User_Wishlist />} />
          <Route path="/enquiries" element={<User_Enquiries />} />
          <Route path="/faq" element={          <Faq/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
