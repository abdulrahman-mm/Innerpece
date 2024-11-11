import React from "react";
import Header from "../components/Header";
import DestinationsDetailsHero from "../components/DestinationsDetailsHero";
import DestinationDetailsTwoComponents from "../components/DestinationsDetailsTwoComponents";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function DestinationsDetails() {
  const location = useLocation();
  const { id, city_name } = location.state || {};
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await axios.post(
          "https://backoffice.innerpece.com/api/get-program",
          {
            destination: id,
          }
        );

        setApiData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    <div>
      <Header />
      <DestinationsDetailsHero apiData={apiData} />
      <DestinationDetailsTwoComponents apiData={apiData} />
      <Footer />
    </div>
  );
}

export default DestinationsDetails;
