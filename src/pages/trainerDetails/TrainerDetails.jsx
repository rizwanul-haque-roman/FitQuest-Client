import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import ctaBanner from "../../assets/callToAction.png";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { isLoading, data: trainer } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer/${id}`);
      return res.data;
    },
  });

  const handleSlot = (data) => {
    localStorage.setItem("slot", data);
    navigate(`/booking/${trainer._id}`);
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>FitQuest | Trainer details</title>
      </Helmet>
      {isLoading ? (
        <div className="col-span-3 justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto ">
          <div
            className="bg-cover bg-no-repeat bg-center h-[50vh] rounded-2xl flex justify-end items-center"
            style={{ backgroundImage: `url(${ctaBanner})` }}
          >
            <div>
              <h2 className="text-5xl font-bold mb-3">Become A Trainer</h2>
              <p className="text-xl w-3/4 mb-3">
                If you have the skills and passion to train others, join us and
                become a part of our team.
              </p>
              <Link to={"/beATrainer"}>
                <button className="btn">Become a Trainer</button>
              </Link>
            </div>
          </div>
          <div className="my-6">
            <h1 className="text-5xl font-bold text-clr-main">
              Trainer details
            </h1>
          </div>
          <div className="grid grid-cols-2 my-12">
            <div>
              <h1 className="text-3xl font-bold underline">Trainer info</h1>
              <div>
                <div className="w-1/4 mt-6">
                  <img
                    className="rounded-full border-2 border-clr-main"
                    src={trainer?.profileImage}
                    alt=""
                  />
                </div>
                <div className="w-3/4 space-y-3">
                  <h4 className="text-2xl font-semibold text-clr-main">
                    {trainer?.fullName}
                  </h4>
                  <p>Age: {trainer?.age}</p>
                  <p>Email: {trainer?.email}</p>
                  <div className="flex gap-3 text-2xl">
                    <Link>
                      <FaFacebookF />
                    </Link>
                    <Link>
                      <IoLogoInstagram />
                    </Link>
                    <Link>
                      <BsTwitterX />
                    </Link>
                  </div>
                  <p>
                    With{" "}
                    <span className="text-xl font-semibold text-clr-main">
                      {trainer?.yearsOfExperience}
                    </span>{" "}
                    Years of experience
                  </p>
                  <p>{trainer?.bio}</p>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {trainer?.skills.map((skill, idx) => (
                        <div key={idx}>
                          <p className="badge badge-primary">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Experties
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {trainer?.areasOfExpertise.map((exprts, idx) => (
                        <div key={idx}>
                          <p className="badge badge-primary">{exprts}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold underline">Available Slots</h1>
              <div className="space-y-2 mt-6 w-full">
                <p>
                  <span className="text-xl text-clr-main font-semibold">
                    Available Time:{" "}
                  </span>
                  {trainer?.availableTime}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold text-clr-main">
                    Available Days:
                  </p>
                  <div className=" flex gap-3">
                    {trainer?.availableDays.map((day, idx) => (
                      <div key={idx}>
                        <p className="">{day}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-clr-main underline my-3">
                    Slots info
                  </p>
                  <div className="flex gap-6 justify-between">
                    {trainer?.slotsAvailable.length === 0 ? (
                      <p>No Slots Available</p>
                    ) : (
                      <>
                        {trainer?.slotsAvailable.map((slot, idx) => (
                          <div key={idx}>
                            <button
                              onClick={() => handleSlot(idx)}
                              className="btn btn-lg hover:bg-clr-main"
                            >
                              {slot.day} <br /> {slot.time}
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-clr-main underline">
                    Classes
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {trainer?.classes.map((cls, idx) => (
                      <div key={idx}>
                        <p className="badge badge-primary">{cls}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDetails;
