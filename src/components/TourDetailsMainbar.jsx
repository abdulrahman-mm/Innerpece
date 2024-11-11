import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import safeparking from "../assets/safeparking.png";
import plugpoint from "../assets/plugpoint.png";
import petfriendly from "../assets/petfriendly.png";
import phonenetwork from "../assets/phonenetwork.png";
import picnictable from "../assets/picnictable.png";
import drinikingwater from "../assets/drinkingwater.png";
import Breakfast from "../assets/breakfast.png";
import cup from "../assets/cup.png";
import bbqgrillandcoal from "../assets/bbqgrillandcoal.png";
import bbqmarination from "../assets/bbqmarination.png";
import bbqnonveg from "../assets/bbqnonveg.png";
import stove from "../assets/stove.png";
import fishing from "../assets/fishing.png";
import pets from "../assets/pets.png";
import bird from "../assets/bird.png";
import cycling from "../assets/cycling.png";
import sterlized from "../assets/sterlized.png";
import sanitiser from "../assets/sanitiser.png";
import backup from "../assets/backup.png";
import certifiedinstructor from "../assets/certifiedinstructor.png";
import safetygear from "../assets/safetygear.png";
import crowdfree from "../assets/crowdfree.png";
import defaultimage from "../assets/defaultimg.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Mainbar() {
  const location = useLocation();
  // const [amenitiesArray, setAmenitiesArray] = useState([]);
  const { id } = location.state || {};
  const { title } = useParams();
  const [apiData, setApiData] = useState([]);

  // let amenities = apiData.amenity_details;
  // console.log(amenities['1'].amenity_name);

  // const objectLength = Object.keys(amenities);
  // console.log(objectLength);

  // console.log(amenitiesArray);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const storedUserDetails = sessionStorage.getItem("loginDetails");

        const userDetails = storedUserDetails
          ? JSON.parse(storedUserDetails)
          : null;

        const payload = {
          program_id: id,
          user_id: userDetails?.id || null,
        };

        const response = await axios.post(
          "https://backoffice.innerpece.com/api/get-program-details",
          payload
        );

        setApiData(response.data.data);
        console.log(response.data.data.amenity_details);
        // setAmenitiesArray(Object.values(amenities));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProgramData();
  }, [id]);

  return (
    <div className="lg:basis-[45%] xl:basis-[55%] flex-grow md:pb-28">
      <p className="font-semibold text-2xl">Property Highlights</p>
      <p className="mt-5 text-gray-600 leading-7 ">{apiData.program_desc}</p>

      <p className="text-sm font-semibold ms-3 mt-2 cursor-pointer">
        Read More{" "}
        <span>
          <MdOutlineKeyboardArrowDown className="inline-block" />
        </span>{" "}
      </p>

      {apiData.amenity_details &&
        Object.keys(apiData.amenity_details).length > 0 && (
          <div className="border-[1px] px-4 py-3 border-black/40 mt-14 rounded-3xl">
            <p className="font-semibold text-2xl">Amenities</p>

            <div className="flex flex-wrap flex-col gap-5 mt-5">
              <div className="flex gap-5 flex-wrap items-center justify-between pe-16">
                {Object.keys(apiData.amenity_details).map((key, index) => {
                  const amenity = apiData.amenity_details[key];

                  return (
                    <>
                      <img
                        src={`https://backoffice.innerpece.com/${amenity.amenity_pic}`}
                        alt={amenity.amenity_name}
                      />
                      <p className="text-lg text-gray-700">
                        {amenity.amenity_name}
                      </p>
                    </>
                  );
                })}
              </div>

              <span className="text-sm font-semibold ms-3 cursor-pointer">
                More Details{" "}
                <span>
                  <MdOutlineKeyboardArrowDown className="inline-block" />
                </span>{" "}
              </span>
            </div>
          </div>
        )}

      <div className="border-[1px] px-4 py-2   border-black/40 mt-14 rounded-3xl">
        <p className="font-semibold text-2xl">Food and Beverages </p>

        <div className="flex  flex-wrap flex-col gap-5 mt-5">
          <div className="flex flex-wrap gap-5 items-start justify-between">
            <div className="flex items-start gap-2">
              <img src={Breakfast} alt="" />
              <p className="text-lg ">Breakfast Included</p>
            </div>
            <div className="flex items-start gap-2 ">
              <img src={bbqnonveg} alt="" />
              <p className="text-lg">Bbq Marination non-Veg @ ₹560</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 items-start justify-between">
            <div className="flex items-start gap-2">
              <img src={bbqmarination} alt="" />
              <p className="text-lg ">Bbq Marination Veg @ ₹730</p>
            </div>
            <div className="flex items-start gap-2">
              <img src={stove} alt="" />
              <p className="text-lg me-16">Camping Stone @ ₹560</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 items-start justify-between">
            <div className="flex items-start gap-2">
              <img src={bbqgrillandcoal} alt="" />
              <p className="text-lg ">Bbq Grill And Coal @ ₹850</p>
            </div>
            <div className="flex items-start gap-2 ">
              <img src={cup} alt="" />
              <p className="text-lg me-16">Tea And Snack @ ₹170</p>
            </div>
          </div>

          <span className="text-sm font-semibold ms-3 cursor-pointer">
            More Details{" "}
            <span>
              <MdOutlineKeyboardArrowDown className="inline-block" />
            </span>{" "}
          </span>
        </div>
      </div>

      <div className=" w-50vw mt-14 rounded-3xl">
        <p className="font-semibold text-2xl ms-4">Activities</p>

        <div className="flex flex-wrap justify-start mt-5 gap-4">
          <div className="flex flex-col flex-grow  items-center border-[1px] gap-3 w-40  border-black/40 p-3 rounded-lg py-5">
            <img src={fishing} alt="" />
            <p>Diy Fishing Per Rod</p>
          </div>

          <div className="flex flex-col flex-grow  items-center border-[1px] gap-3 w-40 border-black/40 p-3 rounded-lg py-5">
            <img src={pets} alt="" />
            <p>Pet Sanatuary Visit</p>
          </div>

          <div className="flex flex-col flex-grow  items-center border-[1px] gap-3 w-40 border-black/40 p-3 rounded-lg py-5">
            <img src={bird} alt="" />
            <p>Bird Watching</p>
          </div>

          <div className="flex flex-col flex-grow  items-center border-[1px] gap-3 w-40 border-black/40 p-3 rounded-lg py-5">
            <img src={cycling} alt="" />
            <p>Cycling</p>
          </div>
        </div>
      </div>

      <div className="border-[1px] p-5 w-50vw ps-9 border-black/40 mt-14 rounded-3xl">
        <p className="font-semibold text-2xl">Safety Features</p>

        <div className="flex flex-wrap flex-col gap-5 mt-5">
          <div className="flex flex-wrap items-center gap-5 justify-between pe-16">
            <div className="flex items-center gap-2">
              <img src={sterlized} alt="" />
              <p className="text-lg ">Sterlized Tents</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={sanitiser} alt="" />
              <p className="text-lg ">Sanitiser in common areas</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 me-12 items-center justify-between pe-16">
            <div className="flex items-center gap-2">
              <img src={backup} alt="" />
              <p className="text-lg ">Backup Container</p>
            </div>
            <div className="flex items-center gap-2 ">
              <img src={certifiedinstructor} alt="" />
              <p className="text-lg ">Certified Instructors</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 me-8 items-center justify-between  pe-16">
            <div className="flex items-center gap-2">
              <img src={safetygear} alt="" />
              <p className="text-lg ">Safety Gear</p>
            </div>
            <div className="flex items-center gap-2 ">
              <img src={crowdfree} alt="" />
              <p className="text-lg ">Crowd Free Compsite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainbar;
