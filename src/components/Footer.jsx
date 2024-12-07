import React, { useEffect, useState } from "react";
import footer1 from "../assets/footer1.png";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import aryulogo from "../assets/aryulogo.png";
import homefooterinsta from "../assets/homefooterinsta.png";
import homefooterfb from "../assets/homefooterfb.png";
import homefooterlinkedin from "../assets/homefooterlinkedin.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [footerContent, setFooterContent] = useState("");
  let navigator = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backoffice.innerpece.com/api/footer-content`)
      .then((response) => {
        setFooterContent(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  function navigate(navigatePath) {
    navigator(navigatePath);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  return (
    <div className="mt-8 md:mt-16 ">
      <img
        src={footer1}
        alt=""
        className="w-screen -mb-2  sm:-mb-3 md:-mb-4 lg:-mb-5"
      />

      <div className="bg-[url('././assets/footer2.png')]   bg-center bg-cover  ">
        <div className="footer py-5  md:py-16 gap-8  md:gap-12 flex-wrap flex-col md:flex-row flex  justify-start xl:justify-evenly  px-5 ">
          <div className="flex flex-col basis-[30%] flex-wrap text-white ">
            <div>
              <img
                src={`https://backoffice.innerpece.com/${footerContent.footer_logo}`}
                className="bg-cover"
                alt=""
              />
            </div>

            <p className="mt-5 text-lg">
              Innerpece is a travel curator that transforms your travel ideas
              into customized, unforgettable journeys.
            </p>

            <p className="mt-3 md:mt-5">
              <a href="mailto:Info@Webmail.com">
                <span className="inline-block me-5">
                  <IoIosMail className="text-lg md:text-2xl text-sky-300" />
                </span>
                {footerContent.contact_email}
              </a>
            </p>

            <p className="mt-3 md:mt-5">
              <a href={`tel:${footerContent.contact_number}`}>
                <span className="inline-block me-5">
                  <FaPhoneAlt className="text-lg md:text-2xl  text-sky-300" />
                </span>
                {footerContent.contact_number}
              </a>
            </p>

            <p className="mt-3 md:mt-5">
              <span className="inline-block me-5">
                <FaMapLocationDot className="text-lg md:text-2xl  text-sky-300" />
              </span>
              {footerContent.contact_address}
            </p>
          </div>

          <div className="text-white basis-30 flex gap-2 flex-col  md:gap-4">
            <p className="font-semibold text-xl md:text-2xl pb-3 md:pb-5 ">
              Services Req
            </p>

            <p
              onClick={() => navigate("/aboutus")}
              className="text-lg text-gray-400 cursor-pointer hover:text-white"
            >
              About Us
            </p>

            <p
              onClick={() => navigate("/contactus")}
              className="text-lg text-gray-400 cursor-pointer hover:text-white"
            >
              Contact
            </p>
            <p
              onClick={() => navigate("/termsofservice")}
              className="text-lg text-gray-400 cursor-pointer hover:text-white"
            >
              Terms Of Service
            </p>

            <p
              onClick={() => navigate("/privacypolicy")}
              className="text-lg text-gray-400 cursor-pointer hover:text-white"
            >
              Privacy Policy
            </p>
          </div>

          <div className="flex -mt-6 sm:-mt-0 flex-col flex-wrap ">
            <div className="flex items-center gap-3 pb-3 md:pb-5">
              <FaCircleArrowRight className="inline-block text-sky-200 text-3xl" />
              <p className="text-xl md:text-2xl text-white font-semibold">
                Get In Touch
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 md:mt-5">
              <a
                href={`https://www.facebook.com/p/Innerpece-100094846880465/?_rdr`}
                target="_blank"
              >
                <img src={homefooterfb} alt="" className="cursor-pointer" />
              </a>

              <a
                href={`https://www.linkedin.com/company/80112098/admin/dashboard/`}
                target="_blank"
              >
                <img
                  src={homefooterlinkedin}
                  alt=""
                  className="cursor-pointer"
                />
              </a>
              <a
                href={`https://www.instagram.com/innerpececom/`}
                target="_blank"
              >
                <img src={homefooterinsta} alt="" className="cursor-pointer" />
              </a>
            </div>

            <img
              src={`https://backoffice.innerpece.com/uploads/settings/official_logo/1724229229_1.PNG`}
              alt=""
              className="bg-contain w-40 h-16 mt-5 md:mt-8"
            />
          </div>

          <div className="flex flex-col md:items-center  flex-wrap gap-y-3">
            <div className="flex items-center pb-3 md:pb-5">
              <p className="text-white text-xl md:text-2xl font-semibold">
                Crafting Excellence With{" "}
              </p>
              <FaHeart className="text-white ms-1 " />
            </div>

            <a href="https://aryutechnologies.com/" target="_blank">
              <img
                src={aryulogo}
                alt=""
                className="w-20 h-16 md:w-28 md:h-20"
              />
            </a>

            <p className="text-white text-xs font-semibold">
              <span className="font-bold text-xl me-1">ARYU</span>Technologies
            </p>

            <div className="flex flex-wrap gap-x-3">
              <a
                href="https://www.instagram.com/aryutechnologies/"
                target="_blank"
              >
                <RiInstagramFill className="text-white  rounded-full bg-blue-600 p-1 text-3xl cursor-pointer" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61560790628495"
                target="_blank"
              >
                <FaFacebook className="text-white rounded-full bg-blue-600 p-1 text-3xl cursor-pointer " />
              </a>

              <a
                href="https://www.linkedin.com/company/103279912/admin/dashboard/"
                target="_blank"
              >
                <FaLinkedin className="text-white rounded-full bg-blue-600 p-1 text-3xl cursor-pointer " />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 items-center justify-around pb-5">
          <p className="text-xs md:text-sm text-white ">
            {footerContent.copyright}
          </p>
          <a
            href="https://aryutechnologies.com/"
            target="_blank"
            className="text-xs md:text-sm text-white "
          >
            Powered by Aryu Technologies
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
