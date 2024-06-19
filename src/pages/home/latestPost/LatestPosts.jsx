import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PostCard from "../../forum/PostCard";

const LatestPosts = () => {
  const axiosPublic = useAxiosPublic();

  const { isPending, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recentPosts");
      return res.data;
    },
  });

  return (
    <div className="w-11/12 lg:container mx-auto my-12 lg:my-24">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-clr-main">Recent Posts</h1>
        <p className="mt-4">See what the community is talking about...</p>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className=" grid lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestPosts;
