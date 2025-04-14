import React from "react";
import TourDetailsMainbar from "../components/TourDetailsMainbar";
import TourDetailsSidebar from "../components/TourDetailsSidebar";

function TwoComponents({
  LocationShareRef,
  informationRef,
  TourPlanningRef,
  reviewRef,
}) {
  return (
    <div className="flex bg-[#FEFEFE] gap-8 md:gap-12  flex-col justify-between md:flex-row bg-gray-50/10 ms-5 me-5 md:ms-10 md:me-10 lg:ms-20 lg:me-20 items-start font-mulish">
      <TourDetailsMainbar
        informationRef={informationRef}
        TourPlanningRef={TourPlanningRef}
        reviewRef={reviewRef}
      />
      <TourDetailsSidebar LocationShareRef={LocationShareRef} />
    </div>
  );
}

export default TwoComponents;
