import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import ClassCard from "../../shared/ClassCard";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [classes, setClasses] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const item = event.target.search.value;
    if (item !== "") {
      axiosPublic
        .get(
          `/classesSearch?page=${
            currentPage - 1
          }&size=${dataPerPage}&search=${item}`
        )
        .then((res) => {
          setClasses(res.data);
          setCount(res.data.length);
        });
    }
  };

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
    data: classesData,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/classes?page=${currentPage - 1}&size=${dataPerPage}`
      );
      setClasses(res.data);
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
        <div className="my-6 flex items-center justify-between gap-6">
          <h1 className="text-5xl font-bold text-clr-main">All Classes</h1>
          <div>
            <form onSubmit={handleSearch} action="" className=" join">
              <label className="input input-bordered flex items-center gap-2 join-item">
                <input
                  type="text"
                  name="search"
                  className="grow"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button className=" join-item btn">Search</button>
            </form>
          </div>
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
