import { useQuery } from "@tanstack/react-query";
import bg from "../../../assets/aboutBg.jpg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";

const Team = () => {
  const axiosPublic = useAxiosPublic();

  const { isPending, data: trainers } = useQuery({
    queryKey: ["feturedTrainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featuredTrainers");
      return res.data;
    },
  });

  return (
    <div>
      <div
        className="bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-[#000000f3] bg-cover bg-no-repeat bg-center py-12 lg:py-24">
          <div className="w-11/12 lg:container mx-auto">
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-bold text-clr-main">
                Meet Out Team
              </h2>
            </div>
            <div className="mt-12">
              {isPending ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6 w-full">
                  {trainers.map((trainer) => (
                    <TeamCard key={trainer._id} trainer={trainer} />
                  ))}
                </div>
              )}
            </div>
            <div className="mt-12">
              <Link to={"/allTrainers"}>
                <button className="btn bg-clr-main">See more</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
