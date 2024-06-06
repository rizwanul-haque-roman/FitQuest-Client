import { useQuery } from "@tanstack/react-query";
import banner from "../../assets/forumBanner.png";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Forum = () => {
  const axiosPublic = useAxiosPublic();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ["totalPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/totalPosts`);
      setCount(res.data.count);
      return res.data;
    },
  });

  const {
    isPending: isLoading,
    data: posts,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/posts?page=${currentPage - 1}&size=${dataPerPage}`
      );
      return res.data;
    },
  });

  const dataPerPage = 6;
  let totalPages = Math.ceil(count / dataPerPage);

  console.log("Posts:", posts, currentPage);

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
    <div className="min-h-screen pt-28">
      <div className="w-11/12 lg:container mx-auto ">
        <div className="border border-clr-secondary overflow-hidden lg:h-[40vh] rounded-2xl">
          <img className="w-full" src={banner} alt="" />
        </div>
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main">Fitness Forum</h1>
          <p className="mt-4">
            Welcome to FitQuest Forum, your go-to community for all things
            fitness! Whether you&apos;re a beginner seeking advice or a seasoned
            athlete looking to share your expertise, our forum provides a
            supportive space to discuss workouts, nutrition, wellness tips, and
            more. Connect with fellow fitness enthusiasts, get expert advice,
            and stay motivated on your fitness journey. Join us and be part of a
            vibrant community dedicated to achieving health and wellness goals
            together!
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-3 justify-center items-center">
              <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
        <div className="my-12 text-center">
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
                currentPage == page + 1 && "bg-clr-secondary"
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

export default Forum;
