import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import TeamCard from "../home/team/TeamCard";
import { Helmet } from "react-helmet-async";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["totalTrainers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/totalTrainers`);
      setCount(res.data.count);
      return res.data;
    },
  });

  const {
    isPending: isLoading,
    data: trainers,
    refetch,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/trainers?page=${currentPage - 1}&size=${dataPerPage}`
      );
      return res.data;
    },
  });

  const dataPerPage = 6;
  let totalPages = Math.ceil(count / dataPerPage);

  const pages = [...Array(totalPages).keys()];

  const haandlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>FitQuest | All Trainers</title>
      </Helmet>
      <div className="w-11/12 lg:container mx-auto ">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main">
            Meet our Trainers
          </h1>
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            {isLoading ? (
              <div className="col-span-3 justify-center items-center">
                <div className="flex justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              </div>
            ) : (
              trainers.map((trainer) => (
                <TeamCard key={trainer._id} trainer={trainer} />
              ))
            )}
          </div>
        </div>
        <div className="my-6 text-center">
          <button
            onClick={haandlePrev}
            className={`btn ${currentPage == 1 && "btn-disabled"}`}
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page + 1)}
              className={`btn ml-2 my-2 ${
                currentPage == page + 1 && "bg-clr-main"
              } `}
              key={page}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            className={`btn ml-2 ${
              totalPages == currentPage && "btn-disabled"
            }`}
            role="button"
            aria-disabled="true"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTrainers;
