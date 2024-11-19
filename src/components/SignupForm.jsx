import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  let navigate = useNavigate();

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_province_code, setZipProvinceCode] = useState("");
  const [country, setCountry] = useState("");
  const [preferred_lang, setPreferredLang] = useState("");
  const [newsletter_sub, setNewsletterSub] = useState("");
  const [terms_condition, setTermsCondition] = useState("");

  const [userDetailsError, setUserDetailsError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    dob: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip_province_code: "",
    country: "",
    preferred_lang: "",
    newsletter_sub: false,
    terms_condition: false,
  });

  function onClickBtn() {
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function handleInputChanges(e) {
    const { name, value, checked, type } = e.target;

    if (name === "first_name") {
      setFirstname(value);
    }
    if (name === "last_name") {
      setLastname(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "password_confirmation") {
      setPasswordConfirmation(value);
    }
    if (name === "dob") {
      setDob(value);
    }
    if (name === "phone") {
      setPhone(value.slice(0, 10));
    }
    if (name === "street") {
      setStreet(value);
    }
    if (name === "city") {
      setCity(value);
    }
    if (name === "state") {
      setState(value);
    }
    if (name === "zip_province_code") {
      setZipProvinceCode(value);
    }
    if (name === "country") {
      setCountry(value);
    }

    if (name === "preferred_lang") {
      setPreferredLang(value);
    }
    if (name === "newsletter_sub") {
      setNewsletterSub(newsletter_sub ? "" : "newsletter_sub");
    }

    if (name === "terms_condition") {
      setTermsCondition(terms_condition ? "" : "terms_condition");
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(
        `https://backoffice.innerpece.com/api/signup`,
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
          password: password,
          password_confirmation: password_confirmation,
          dob: dob,
          preferred_lang: preferred_lang,
          street: street,
          city: city,
          state: state,
          country: country,
          zip_province_code: zip_province_code,
          newsletter_sub: newsletter_sub,
          terms_condition: terms_condition,
        }
      );

      setUserDetailsError({
        ...userDetailsError,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        dob: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip_province_code: "",
        country: "",
        preferred_lang: "",
        newsletter_sub: false,
        terms_condition: false,
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setDob("");
      setPhone("");
      setStreet("");
      setCity("");
      setState("");
      setZipProvinceCode("");
      setCountry("");
      setPreferredLang("");
      setNewsletterSub("");
      setTermsCondition("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/login");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
    } catch (err) {
      console.log(err);

      console.log(err.response.data.errors);

      let errors = err.response.data.errors;

      setUserDetailsError({ ...errors });
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 md:px-1 md:mt-16">
      <div className="w-[95vw] md:w-[80vw] lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
        <div className="flex bg-gray-50/30 justify-start gap-1 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
          <div className=' bg-[url("././assets/signup.png")] w-1/5 max-md:hidden  rounded-md  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

          <div className="w-2/5 flex-grow flex-shrink">
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Create An Account To Get Started
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <p
                  style={{ backgroundColor: "#EB9009" }}
                  className="text-white px-2 rounded"
                >
                  20% off
                </p>
                <p className="text-gray-500">get 20% off for web signup</p>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col flex-grow gap-1">
                  <label htmlFor="first_name" className="font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    onChange={handleInputChanges}
                    value={first_name}
                    className="border-2 border-gray-300  outline-none p-2 rounded-md"
                    placeholder="Enter your first name"
                  />
                  {userDetailsError.first_name && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.first_name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col flex-grow gap-1">
                  <label htmlFor="last_name" className="font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={last_name}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none  p-2 rounded-md"
                    placeholder="Enter your last name"
                  />
                  {userDetailsError.last_name && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="email" className="font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Enter your email"
                  />
                  {userDetailsError.email && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="phone" className="font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="enter your phone number"
                  />
                  {userDetailsError.phone && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="password" className="font-semibold">
                    Create Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Create Password"
                  />
                  {userDetailsError.password && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.password[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label
                    htmlFor="password_confirmation"
                    className="font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={password_confirmation}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Confirm Password"
                  />
                  {userDetailsError.password && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.password[1]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="dob" className="font-semibold">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Create Passoword"
                  />
                  {userDetailsError.dob && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.dob}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="street" className="font-semibold">
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    value={street}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Street"
                  />
                  {userDetailsError.street && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.street}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="city" className="font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="City"
                  />
                  {userDetailsError.city && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.city}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="state" className="font-semibold">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={state}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Street"
                  />
                  {userDetailsError.state && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.state}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="zip_province_code" className="font-semibold">
                    Zip/Postal Code
                  </label>
                  <input
                    type="number"
                    name="zip_province_code"
                    id="zip_province_code"
                    value={zip_province_code}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="zip province code/postal code"
                  />
                  {userDetailsError.zip_province_code && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.zip_province_code}
                    </p>
                  )}
                </div>

                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="country" className="font-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Country"
                  />
                  {userDetailsError.country && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.country}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-wrap lg:flex-row justify-between gap-5 mt-5">
                <div className="flex flex-col basis-[25%] flex-grow gap-1">
                  <label htmlFor="preferred_lang" className="font-semibold">
                    Preferred Language
                  </label>
                  <input
                    type="text"
                    name="preferred_lang"
                    id="preferred_lang"
                    value={preferred_lang}
                    onChange={handleInputChanges}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Preferred Language"
                  />
                  {userDetailsError.preferred_lang && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.preferred_lang}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-start gap-2 mt-5">
                  <input
                    type="checkbox"
                    name="newsletter_sub"
                    id="newsletter_sub"
                    className="scale-125"
                    value="newsletter_sub"
                    checked={newsletter_sub ? true : false}
                    onChange={handleInputChanges}
                  />
                  <label
                    htmlFor="newsletter_sub"
                    className="text-xs sm:text-sm md:text-base"
                  >
                    Subscribe to Newsletter
                  </label>
                </div>

                <div>
                  {userDetailsError.newsletter_sub && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.newsletter_sub}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-start gap-2">
                  <input
                    type="checkbox"
                    name="terms_condition"
                    id="terms_condition"
                    className="scale-125"
                    checked={terms_condition ? true : false}
                    value="terms_condition"
                    onChange={handleInputChanges}
                  />
                  <label
                    htmlFor="terms_condition"
                    className="text-xs sm:text-sm md:text-base"
                  >
                    I accept the{" "}
                  </label>
                  <span className=" md:-ms-1 text-blue-600 underline cursor-pointer text-xs sm:text-sm md:text-base">
                    Terms and Conditions
                  </span>
                </div>

                <div>
                  {userDetailsError.terms_condition && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {userDetailsError.terms_condition}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSignup}
                className="bg-sky-800 p-3 mt-5 text-white"
              >
                Sign Up
              </button>

              <div className="flex flex-wrap justify-start items-center gap-8 mt-5">
                <p>Already have an Account?</p>

                <button
                  onClick={onClickBtn}
                  className="bg-sky-800 px-5 py-1 rounded text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
