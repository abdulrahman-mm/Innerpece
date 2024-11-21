import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxChecked, setCheckBoxChecked] = useState("");

  const [loginError, setLoginError] = useState({});

  let navigate = useNavigate();

  function onClickBtn() {
    navigate("/signup");
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  function onChangeInput(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "checkbox") {
      setCheckBoxChecked(checkboxChecked ? "" : "checkbox checked");
    }
  }

  async function onClickSignIn() {
    try {
      let response = await axios.post(
        `https://backoffice.innerpece.com/api/login`,
        {
          email: email,
          password: password,
        }
      );

      const loginid = response.data.token;
      const loginDetails = response.data.user_details;

      sessionStorage.setItem("loginid", loginid);
      sessionStorage.setItem("loginDetails", JSON.stringify(loginDetails));

      setEmail("");
      setPassword("");
      setLoginError("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
    } catch (err) {
      console.log(err);

      let errors = err.response.data.errors
        ? err.response.data.errors
        : err.response.data;
      setLoginError({ ...errors });
      console.log(errors);
    }
  }

  return (
    <div className="flex items-center justify-center mt-8 md:mt-14">
      <div className="80vw md:w-[70vw] lg:w-[60vw]  shadow-2xl  shadow-black/30 rounded-md">
        <div className="flex justify-start gap-2 md:gap-5 lg:gap-8 h-full w-full px-2 md:px-4 py-4">
          <div className=' bg-[url("././assets/login_image.png")] max-sm:hidden  w-1/5  md:w-1/3 flex-shrink bg-cover  bg-center bg-no-repeat'></div>

          <div className="w-2/5 flex-grow flex-shrink">
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
                Log In To Get Started
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
                <div className="flex flex-col flex-grow gap-2">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={onChangeInput}
                    className="border-2 border-gray-300 outline-none p-2 rounded-md"
                    placeholder="Enter your Email"
                  />
                  {loginError.email && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {loginError.email}
                    </p>
                  )}

                  {loginError.error === "Unauthorized User " && (
                    <p className="text-red-500 text-xs sm:text-sm ">
                      {loginError.error}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col mt-5 gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="font-semibold">
                    Your Password
                  </label>
                  <p className="text-red-400 cursor-pointer text-xs md:text-sm font-semibold">
                    Forgot Password?
                  </p>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangeInput}
                  placeholder="Enter your Password"
                  className="border-2  border-gray-300 outline-none p-2 rounded-md"
                />
                {loginError.password && (
                  <p className="text-red-500 text-xs sm:text-sm ">
                    {loginError.password}
                  </p>
                )}

                {loginError.error === "Incorrect password" && (
                  <p className="text-red-500 text-xs sm:text-sm ">
                    {loginError.error}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value="checkboxChecked"
                  onChange={onChangeInput}
                  checked={checkboxChecked ? true : false}
                  className="scale-125"
                />
                <label
                  htmlFor="checkbox"
                  className="text-xs sm:text-sm md:text-base"
                >
                  By signing up, you agree to Terms Of Service and Privacy
                  Policy
                </label>
              </div>

              <button
                onClick={onClickSignIn}
                className="bg-sky-800 p-3 mt-2 rounded-md text-white"
              >
                Sign In
              </button>

              <div className="flex items-center flex-wrap mt-5 mb-5 gap-2 ">
                <p>Don't you have an account?</p>
                <button
                  onClick={onClickBtn}
                  className="bg-sky-800 px-3 py-1 cursor-pointer  text-white rounded"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
