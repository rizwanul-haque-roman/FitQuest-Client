import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import ClassCard from "../../shared/ClassCard";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["totalClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/totalClasses`);
      setCount(res.data.count);
      return res.data;
    },
  });

  const {
    isPending: isLoading,
    data: classes,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/classes?page=${currentPage - 1}&size=${dataPerPage}`
      );
      return res.data;
    },
  });

  const dataPerPage = 9;
  let totalPages = Math.ceil(count / dataPerPage);

  console.log("classes:", classes, currentPage);

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
    <div className="pt-28">
      <div className="w-11/12 lg:container mx-auto">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main">All Classes</h1>
        </div>
        <div className="flex flex-col justify-between min-h-screen">
          <div className="grid grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 justify-center items-center">
                <div className="flex justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              </div>
            ) : (
              classes.map((classData) => (
                <ClassCard key={classData._id} classData={classData} />
              ))
            )}
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
    </div>
  );
};

export default AllClasses;
