import React from "react";
import exploremore from "../assets/exploremore.jpg";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ExploreMore() {
  let navigate = useNavigate();

  // navigate to contactus page
  function onclickBtn() {
    navigate("/contactus");

    window.scrollTo({
      top: "0",
      behavior: "instant",
    });
  }

  return (
    <div className="w-100vw relative ms-5 me-5 mt-8 md:ms-16 md:me-16   md:mt-16 h-56 ">
      <img
        src={exploremore}
        alt=""
        className="h-56 w-full  object-cover bg-center bg-no-repeat rounded-xl absolute inset-0"
      />
      <p className="text-white absolute inset-0 top-16 left-10 text-2xl md:text-2xl font-semibold">
        GROUP BOOKING
      </p>

      <button
        onClick={onclickBtn}
        style={{ backgroundColor: "#DBF056" }}
        className=" absolute cursor-pointer top-28 left-10 text-green-900 p-2 font-bold rounded-lg "
      >
        EXPLORE MORE <MdArrowOutward className="inline-block ms-1 text-2xl" />
      </button>
    </div>
  );
}

export default ExploreMore;
