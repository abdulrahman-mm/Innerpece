import React, { useState } from "react";
import phoneimg from "../assets/phone.png";
import mail from "../assets/mail.png";
import axios from "axios";
import Swal from "sweetalert2";

function GetInTouch() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "firstname") {
      setFirstname(value);
    }

    if (name === "lastname") {
      setLastname(value);
    }

    if (name === "email") {
      setEmail(value);
    }

    if (name === "phone") {
      setPhone(value);
    }

    if (name === "message") {
      setMessage(value);
    }
  }

  async function onClickSendMessage() {
    try {
      let response = await axios.post(
        `https://backoffice.innerpece.com/api/contact`,
        {
          first_name: firstname,
          last_name: lastname,
          email: email,
          phone: phone,
          message: message,
        }
      );
      console.log(response);

      setFirstname("");
      setLastname("");
      setPhone("");
      setEmail("");
      setMessage("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "message send successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);

      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Fill all the fields",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row px-5 py-8  md:px-20 lg:px-30 xl:px-40 gap-16 mt-8 md:mt-12">
        <div className="basis-[40%]">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Get in Touch with Our Team
          </p>

          <p className="text-gray-400 mt-5 md:mt-8">
            Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a
            magna euismod. Commodo amet mauris quis at.
          </p>

          <div className="flex flex-wrap mt-5 md:mt-16 gap-5 md:gap-8">
            <div className="flex  flex-col gap-5 md:gap-8">
              <p className="font-serif tracking-widest">PHONE</p>

              <div className="flex  flex-col gap-2">
                <div className="flex  gap-2 text-sky-800">
                  <img src={phoneimg} alt="" className="object-contain" />
                  <p>1-856-256-2896 x972</p>
                </div>
                <div className="flex  gap-2 text-sky-800">
                  <img src={phoneimg} alt="" className="object-contain" />
                  <p>1-854-440-6416 x862</p>
                </div>
              </div>
            </div>

            <div className="flex  flex-col gap-5 md:gap-8">
              <p className="font-serif tracking-widest">EMAIL</p>

              <div className="flex  flex-col gap-2 text-sky-800">
                <div className="flex gap-2">
                  <img src={mail} alt="" className="object-contain" />
                  <p>support@innerpece.com</p>
                </div>
                <div className="flex gap-2 text-sky-800">
                  <img src={mail} alt="" className="object-contain" />
                  <p>office@innerpece.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="basis-[50%] mt-5 md:mt-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-grow flex-col gap-3 ">
                <label htmlFor="firstname">Your First Name</label>
                <input
                  placeholder="enter your first name"
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={onChangeInput}
                  className="border-2  bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5  text-sm"
                />
              </div>

              <div className="flex flex-grow flex-col gap-3 ">
                <label htmlFor="lastname">Your Last Name</label>
                <input
                  placeholder="enter your last name"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={onChangeInput}
                  value={lastname}
                  className="border-2  bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <div className="flex flex-grow flex-col gap-3 ">
                <label htmlFor="email">Your Email</label>
                <input
                  placeholder="enter your email"
                  type="text"
                  name="email"
                  id="email"
                  onChange={onChangeInput}
                  value={email}
                  className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5  text-sm"
                />
              </div>

              <div className="flex flex-grow flex-col gap-3 ">
                <label htmlFor="phone">Your Phone</label>
                <input
                  placeholder="enter your phone"
                  type="number"
                  id="phone"
                  name="phone"
                  onChange={onChangeInput}
                  value={phone}
                  className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5  text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                rows={7}
                onChange={onChangeInput}
                value={message}
                placeholder="enter your message"
                className="border-2 bg-gray-100/90 outline-none border-none rounded-xl px-5 py-5  text-sm"
              ></textarea>
            </div>

            <button
              onClick={onClickSendMessage}
              className="bg-sky-800 hover:bg-sky-700 px-5 py-2 md:px-7 outline-none md:py-3  lg:px-8 lg:py-4 xl:px-10 xl:py-5 w-fit rounded-full text-white"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
