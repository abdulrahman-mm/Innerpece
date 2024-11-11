import React from "react";
import DestinationsDetailsMainbar from "../components/DestinationsDetailsMainbar";
import DestinationsDetailsSidebar from "../components/DestinationsDetailsSidebar";

function DestinationsDetailsTwoComponents({apiData}) {
  return (
    <div className="flex flex-col md:flex-row ustify-between gap-2 md:gap-3 lg:gap-5 mt-2 md:mt-7 ms-4 me-4 md:ms-7 md:me-7 lg:ms-10 lg:me-10 pb-10">
      <DestinationsDetailsSidebar />
      <DestinationsDetailsMainbar apiData={apiData}/>
    </div>
  );
}

export default DestinationsDetailsTwoComponents;
