import React from "react";
import TourDetailsMainbar from "../components/TourDetailsMainbar";
import TourDetailsSidebar from "../components/TourDetailsSidebar";

function TwoComponents() {
  return (
    <div className="flex gap-16 flex-col justify-between md:flex-row bg-gray-50/10 ms-5 me-5 md:ms-10 md:me-10 lg:ms-20 lg:me-20 items-start mt-10">
      <TourDetailsMainbar />
      <TourDetailsSidebar />
    </div>
  );
}

export default TwoComponents;
