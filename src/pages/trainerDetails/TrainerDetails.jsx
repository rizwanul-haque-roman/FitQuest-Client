import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  //   console.log(id);

  const { isLoading, data: trainer } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer/${id}`);
      return res.data;
    },
  });

  !isLoading && console.log(trainer);
  return (
    <div className="min-h-screen pt-20">
      <div className="w-11/12 lg:container mx-auto ">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main">Trainer details</h1>
        </div>
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold underline">Trainer info</h1>
            <div>
              <div className="w-1/4 mt-6">
                <img
                  className="rounded-full border-2 border-clr-main"
                  src={trainer.profileImage}
                  alt=""
                />
              </div>
              <div className="w-3/4 space-y-3">
                <h4 className="text-2xl font-semibold text-clr-main">
                  {trainer.fullName}
                </h4>
                <p>Age: {trainer.age}</p>
                <p>Email: {trainer.email}</p>
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
                <div className=" flex gap-6">
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Classes
                    </p>
                    <div>
                      {trainer?.classes.map((cls, idx) => (
                        <div key={idx}>
                          <p className="badge badge-primary">{cls}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Skills
                    </p>
                    <div>
                      {trainer?.skills.map((skill, idx) => (
                        <div key={idx}>
                          <p className="">
                            <li>{skill}</li>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Experties
                    </p>
                    <div>
                      {trainer?.areasOfExpertise.map((exprts, idx) => (
                        <div key={idx}>
                          <p className="">
                            <li>{exprts}</li>
                          </p>
                        </div>
                      ))}
                    </div>
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
                  Available days:{" "}
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
                  {trainer?.slotsAvailable.map((slot, idx) => (
                    <div key={idx}>
                      <Link>
                        <button className="btn btn-lg hover:bg-clr-main">
                          {slot.day} <br /> {slot.time}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
