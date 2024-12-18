import React from "react";
import { GiMountainCave } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function LetsGetStarted() {
  let navigate = useNavigate();

  function onclickBtn() {
    navigate("/login");

    window.scrollTo({
      top: "0",
      behavior: "instant",
    });
  }
  return (
    <div className='image bg-[url("././assets/letsgetstarted.jpg")] bg-center bg-cover p-2 ms-5 me-5 mt-8 md:ms-16 md:me-16  md:mt-16 md:py-8 rounded-md'>
      <div className="flex gap-2 md:gap-5 justify-between md:justify-between flex-wrap items-center h-full  md:mx-20">
        <div className="flex flex-wrap">
          <div>
            <GiMountainCave className="text-white text-[60px] me-7" />
          </div>

          <div>
            <p className="text-white text-lg md:text-3xl font-semibold">
              Ready to adventure and enjoy natural{" "}
            </p>
            <p className="text-white mt-2">
            Don't wait any longer

            </p>
          </div>
        </div>

        <div>
          <button
            onClick={onclickBtn}
            className="bg-white p-3 font-semibold rounded "
          >
            LET'S GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
}

export default LetsGetStarted;
