import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Destinations from "./pages/Destinations";
import ProgramsDetails from "./pages/ProgramsDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TourDetails from "./pages/TourDetails";
import DestinationsDetails from "./pages/DestinationsDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:id/:title" element={<TourDetails />} />

          <Route path="/programsdetails/:theme_name" element={<ProgramsDetails />} />

          <Route
            path="/destinationsdetails/:city_name"
            element={<DestinationsDetails />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
