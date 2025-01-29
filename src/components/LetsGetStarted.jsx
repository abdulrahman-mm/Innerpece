import React from "react";
import { GiMountainCave } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import sea from "../assets/sea.mp4";

function LetsGetStarted() {
  let navigate = useNavigate();

  function onclickBtn() {
    if (localStorage.getItem("loginDetails")) {
      navigate("/sendenquiry");
    } else {
      navigate("/login");
    }

    window.scrollTo({
      top: "0",
      behavior: "instant",
    });
  }
  return (
    <div className="image mt-8 md:ms-16 md:me-16  md:mt-16 relative w-[90vw] mx-auto h-60 lg:h-44 rounded-md overflow-hidden">
      {/* Video Section */}
      <video
        src={sea}
        loop
        autoPlay
        muted
        className="absolute w-full h-full object-cover z-10"
      ></video>

      {/* Text Content */}
      <div className="absolute inset-0 [text-shadow:2px_2px_3px_#3d3d3d] flex gap-2 md:gap-5 justify-between items-center flex-wrap z-20 px-5 md:px-20">
        <div className="flex flex-wrap">
          <div>
            <GiMountainCave className="text-white text-[60px] me-7" />
          </div>
          <div>
            <p className="text-white text-lg md:text-3xl font-semibold">
              Ready to adventure and enjoy natural
            </p>
            <p className="text-white mt-2">Don't wait any longer</p>
          </div>
        </div>
        <div>
          <button
            onClick={onclickBtn}
            className="bg-white p-3 transition-all duration-700 hover:bg-blue-800 hover:text-white font-semibold rounded"
          >
            LET'S GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
}

export default LetsGetStarted;
