import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";

const Register = () => {
  const [viewPass, setVewPass] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const url = form.name.url;
    const email = form.email.value;
    const pass = form.pass.value;

    console.log({ name, url, email, pass });
  };

  return (
    <div className="w-11/12 lg:container mx-auto min-h-screen bg-cover flex justify-center items-center">
      <div className="justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 p-6 lg:px-8 lg:py-6 shadow-2xl rounded-xl border"
        >
          <p className="text-5xl font-semibold">
            Fit<span className=" text-clr-main">Quest</span> Register
          </p>
          <p className="text-lg">Please Enter Your Information</p>
          <div className="flex flex-col gap-2">
            <label className="border-b-2 py-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#ed0015"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                className="outline-none bg-transparent"
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
            </label>
            <label className="border-b-2 py-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                width="16px"
                height="16px"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
                xmlSpace="preserve"
              >
                <path
                  fill="#ed0015"
                  d="M459.654,233.373l-90.531,90.5c-49.969,50-131.031,50-181,0c-7.875-7.844-14.031-16.688-19.438-25.813  l42.063-42.063c2-2.016,4.469-3.172,6.828-4.531c2.906,9.938,7.984,19.344,15.797,27.156c24.953,24.969,65.563,24.938,90.5,0  l90.5-90.5c24.969-24.969,24.969-65.563,0-90.516c-24.938-24.953-65.531-24.953-90.5,0l-32.188,32.219  c-26.109-10.172-54.25-12.906-81.641-8.891l68.578-68.578c50-49.984,131.031-49.984,181.031,0  C509.623,102.342,509.623,183.389,459.654,233.373z M220.326,382.186l-32.203,32.219c-24.953,24.938-65.563,24.938-90.516,0  c-24.953-24.969-24.953-65.563,0-90.531l90.516-90.5c24.969-24.969,65.547-24.969,90.5,0c7.797,7.797,12.875,17.203,15.813,27.125  c2.375-1.375,4.813-2.5,6.813-4.5l42.063-42.047c-5.375-9.156-11.563-17.969-19.438-25.828c-49.969-49.984-131.031-49.984-181.016,0  l-90.5,90.5c-49.984,50-49.984,131.031,0,181.031c49.984,49.969,131.031,49.969,181.016,0l68.594-68.594  C274.561,395.092,246.42,392.342,220.326,382.186z"
                />
              </svg>
              <input
                className="outline-none bg-transparent"
                type="url"
                name="url"
                placeholder="Your Name"
                required
              />
            </label>
            <label className="border-b-2 py-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#ed0015"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                className="outline-none bg-transparent"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </label>
            <label className="border-b-2 py-2 flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#ED1533"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="outline-none bg-transparent"
                  type={viewPass ? "password" : "text"}
                  name="pass"
                  placeholder="password"
                  required
                />
              </div>
              <a className="text-2xl" onClick={() => setVewPass(!viewPass)}>
                {viewPass ? <HiEye className="" /> : <HiEyeOff className="" />}
              </a>
            </label>
          </div>
          <div className="flex gap-2 justify-start font-medium items-center">
            <input type="checkbox" name="check" required />
            <h3>Accept terms & conditions</h3>
          </div>
          <button className="btn btn-sm bg-clr-secondary hover:bg-clr-main rounded-full border-0 text-lg text-white">
            Register
          </button>
          <p className="text-center text-xl font-bold">Or</p>
          <Link className="btn btn-sm border border-clr-secondary rounded-full text-lg ">
            <FcGoogle />
            Log In with Google
          </Link>
          <Link className="btn btn-sm border border-clr-secondary rounded-full text-lg ">
            <FaFacebookF />
            Log In with Facebook
          </Link>

          <p className="text-center font-medium">
            Already a user? Proceed to{" "}
            <Link className="underline text-clr-main" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
