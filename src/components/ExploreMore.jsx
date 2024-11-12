import React from "react";
import palm_tree from "../assets/Palm-Trees.jpg";
import exploremore from "../assets/exploremore.jpg";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ExploreMore() {
  let navigate=useNavigate()

  function onclickBtn(){
    navigate('/contactus')

    window.scrollTo({
      top:'0',
      behavior:'instant'
    })
  }
  return (
    <div className="w-100vw relative ms-5 me-5 md:ms-16 md:me-16  mt-16 h-56 ">
      <img
        src={exploremore}
        alt=""
        className="h-56 w-full cursor-pointer  object-cover bg-center bg-no-repeat rounded-xl absolute inset-0"
      />
      <p className="text-white/60 absolute inset-0 top-12 left-20 text-xl md:text-2xl font-semibold">
        GROUP
      </p>
      <p className="text-white/60 absolute inset-0 top-[70px] left-12 text-2xl md:text-4xl font-semibold">
        BOOKING
      </p>

      <button
      onClick={onclickBtn}
        style={{ backgroundColor: "#DBF056" }}
        className=" absolute  top-32 left-10 text-green-900 p-2 font-bold rounded-lg "
      >
        EXPLORE MORE <MdArrowOutward className="inline-block ms-1 text-2xl" />
      </button>
    </div>
  );
}

export default ExploreMore;
