import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [navdropdown, setNavDropdown] = useState(false);
  const user = false;

  const handleDopdown = () => {
    setDropdown(!dropdown);
  };
  const handleNavDopdown = () => {
    setNavDropdown(!navdropdown);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline text-clr-main" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/assignments"
          className={({ isActive }) =>
            isActive ? "underline text-clr-main" : ""
          }
        >
          All Trainer
        </NavLink>
      </li>
      <>
        <li>
          <NavLink
            to="/CreateAssignments"
            className={({ isActive }) =>
              isActive ? "underline text-clr-main" : ""
            }
          >
            All classes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pendingAssignments"
            className={({ isActive }) =>
              isActive ? "underline text-clr-main" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/studyOwl"
            className={({ isActive }) =>
              isActive ? "underline text-clr-main" : ""
            }
          >
            Forum
          </NavLink>
        </li>
      </>
    </>
  );

  return (
    <div className="absolute w-full z-50">
      <div className=" w-11/12 mx-auto navbar">
        <div className="navbar-start">
          <div onClick={handleNavDopdown} className="dropdown">
            <div
              onClick={handleDopdown}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {navdropdown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 border border-[#ffbf0051] rounded-box w-52"
              >
                {links}
              </ul>
            )}
          </div>
          <Link to={"/"}>
            <p className="text-5xl font-bold">
              Fit<span className=" text-clr-main">Quest</span>
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold text-xl">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {!user && (
            <div className="flex gap-3">
              <Link to={"/login"}>
                <button className="btn btn-sm font-semibold border-none  ">
                  LogIn
                </button>
              </Link>
              <p>Or</p>
              <Link to={"/register"}>
                <button className="btn btn-sm font-semibold border-none  ">
                  Register
                </button>
              </Link>
            </div>
          )}
          <button className="btn btn-sm font-semibold border-none">
            Log Out
          </button>
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  onClick={handleDopdown}
                  className="w-10 rounded-full bg-orange-400"
                >
                  <img
                    alt="Profile Photo"
                    src={user?.photoURL ? user?.photoURL : ""}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
