import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import Swal from "sweetalert2";
import { FaFacebookF } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [viewPass, setVewPass] = useState(true);
  const { login, googleLogin, facebookLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const pass = form.pass.value;

    console.log({ email, pass });
    login(email, pass)
      .then((result) => {
        console.log(result);
        const userInfo = {
          email: email,
          lastLogin: result.user?.metadata?.lastSignInTime,
        };
        axiosPublic.patch("/users", userInfo).then((res) => {
          console.log("Inside axios:", res.data);
        });
        Swal.fire("Login Successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => Swal.fire(error.message));
  };

  const google = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        const userInfo = {
          lastLogin: result.user?.metadata?.lastSignInTime,
        };
        axiosPublic.patch("/users", userInfo).then((res) => {
          console.log("Inside axios:", res.data);
        });
        navigate("/");
        Swal.fire("Login Successful");
      })
      .catch((error) => Swal.fire(error.message));
  };

  const facebook = () => {
    facebookLogin()
      .then((result) => {
        console.log(result);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
          role: "member",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        navigate("/");
        Swal.fire("Login Successful");
      })
      .catch((error) => Swal.fire(error.message));
  };

  return (
    <div className="w-11/12 lg:container mx-auto min-h-screen bg-cover flex justify-center items-center">
      <Helmet>
        <title>FitQuest | Login</title>
      </Helmet>
      <div className="justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 p-6 lg:px-8 lg:py-6 shadow-2xl rounded-xl border"
        >
          <p className="text-5xl font-semibold">
            Fit<span className=" text-clr-main">Quest</span> LogIn
          </p>
          <p className="text-lg">Please Enter Your Credentials</p>
          <div className="flex flex-col gap-2">
            <label className="border-b-2 py-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#ED1533"
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
          <div className="flex gap-2 justify-start font-medium items-center hover:underline">
            <Link>
              <h3>Forgot Password?</h3>
            </Link>
          </div>
          <button className="btn btn-sm bg-clr-main hover:bg-clr-main rounded-full border-0 text-lg text-white">
            Log In
          </button>
          <p className="text-center text-xl font-bold">Or</p>
          <Link
            onClick={google}
            className="btn btn-sm border border-clr-main rounded-full text-lg "
          >
            <FcGoogle />
            Log In with Google
          </Link>
          <Link
            onClick={facebook}
            className="btn btn-sm border border-clr-main rounded-full text-lg "
          >
            <FaFacebookF />
            Log In with Facebook
          </Link>

          <p className="text-center font-medium">
            New to this site? Proceed to{" "}
            <Link className="underline text-clr-main" to={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
