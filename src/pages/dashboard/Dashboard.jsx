import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { FaPeopleCarry } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  const [admin, setAdmin] = useState(false);
  const [trainer, setTrainer] = useState(false);
  const [member, setMember] = useState(false);
  const { user, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  axiosSecure.get(`/userData?email=${user.email}`).then((res) => {
    console.log(res.data[0].role);
    if (res.data[0].role === "admin") {
      setAdmin(true);
    } else if (res.data[0].role === "trainer") {
      setTrainer(true);
    } else {
      setMember(true);
    }
  });

  // console.log(userData);

  return (
    <div>
      <Helmet>
        <title>FitQuest | Dashboard</title>
      </Helmet>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <div className="flex">
          {/* dashboard side bar */}
          <div className="w-[350px] p-10 min-h-screen bg-[#131313] ">
            <ul className="text-xl space-y-6 font-medium">
              <div className="flex gap-3 items-center text-clr-main">
                <MdSpaceDashboard className="text-3xl" />
                <h1 className="text-3xl font-bold">Dashboard</h1>
              </div>
              {admin && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/adminHome"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <FaHome className="text-2xl" />
                        Admin Home
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/subscriber"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <IoNewspaper className="text-2xl" />
                        Newsletter Subscribers
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/trainers"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <FaPeopleCarry className="text-2xl" />
                        All Trainers
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/appliedtrainers"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <IoDocuments className="text-2xl" />
                        Applied Trainers
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addClass"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        <RiPlayListAddLine className="text-2xl" />
                        Add New Class
                      </div>
                    </NavLink>
                  </li>
                </>
              )}
              {trainer && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manageSlots"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        Manage Slots
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addNewSlot"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        Add New Slot
                      </div>
                    </NavLink>
                  </li>
                </>
              )}

              {(admin || trainer) && (
                <li>
                  <NavLink
                    to="/dashboard/CreateForum"
                    className={({ isActive }) =>
                      isActive ? " text-clr-main font-bold" : ""
                    }
                  >
                    <div className="flex gap-3 items-center">Add new forum</div>
                  </NavLink>
                </li>
              )}
              {member && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/activity"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        Activity Log
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">Profile</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/bookedTrainer"
                      className={({ isActive }) =>
                        isActive ? " text-clr-main font-bold" : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
                        Booked Trainer
                      </div>
                    </NavLink>
                  </li>
                </>
              )}
              {/* common navlink */}
              <div className="divider"></div>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allClasses">Classes</NavLink>
              </li>
              <li>
                <NavLink to="/forum">Forum</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-1 p-8">
            {path === "/dashboard" && (
              <div className="text-7xl font-bold h-[80vh] flex justify-center items-center">
                <p>Welcome to Dashboard</p>
              </div>
            )}
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
