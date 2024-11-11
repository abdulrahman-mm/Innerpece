import React from "react";
import { GiMountainCave } from "react-icons/gi";

function LetsGetStarted() {
  return (
    <div className='image bg-[url("././assets/letsgetstarted.jpg")] bg-center bg-cover p-5 ms-5 me-5  md:ms-16 md:me-16 mt-16 py-8 rounded-md'>
      <div className="flex gap-5 justify-between md:justify-between flex-wrap items-center h-full mx-5 md:mx-20">
        <div className="flex flex-wrap">
          <div>
            <GiMountainCave className="text-white text-[60px] me-7" />
          </div>

          <div>
            <p className="text-white text-xl md:text-3xl font-semibold">
              Ready to adventure and enjoy natural{" "}
            </p>
            <p className="text-white mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicin
            </p>
          </div>
        </div>

        <div>
          <button className="bg-white p-3 font-semibold rounded ">
            LET'S GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
}

export default LetsGetStarted;
