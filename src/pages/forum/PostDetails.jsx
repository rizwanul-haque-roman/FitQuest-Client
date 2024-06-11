import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const [clickedUp, setClickedUp] = useState(false);
  const [clickedDn, setClickedDn] = useState(false);
  let [vote, setVote] = useState(0);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  console.log(id);

  const { isLoading, data: post } = useQuery({
    queryKey: ["totalPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/post/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    setVote(post?.likes);
  }, [post]);

  const handleUp = () => {
    setClickedUp(true);
    if (vote < post?.likes + 1) setVote(vote + 1);

    if (clickedDn) {
      setClickedDn(false);
    }
  };

  const handleDn = () => {
    if (vote > post?.likes) {
      setClickedDn(!clickedDn);
      setVote(vote - 1);
    }
    if (clickedUp) {
      setClickedUp(false);
    }
  };

  console.log(post);
  return (
    <div className="min-h-screen pt-28">
      <div className="w-11/12 lg:container mx-auto ">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1 className="text-5xl font-bold text-clr-main text-center">
              {post?.title}
            </h1>
            <div className="flex justify-center my-12">
              <img className="rounded-xl" src={post?.content?.media} alt="" />
            </div>
            <div className="flex flex-col justify-center items-center gap-6 my-12">
              <div className="w-2/3 text-xl text-justify">
                <div className="flex gap-2 items-center text-xl">
                  <p>Author:</p>
                  <p className="text-clr-main">{post?.author?.username}</p>
                  <p className="badge badge-accent">{post?.author?.role}</p>
                  <div className="w-1/12">
                    <img
                      className="rounded-full border-2 border-clr-main w-2/3"
                      src={post?.author?.profilePicture}
                      alt=""
                    />
                  </div>
                </div>
                <div className="my-3">
                  {post?.tags?.map((tag, idx) => (
                    <p className="badge badge-primary mr-2" key={idx}>
                      #{tag}
                    </p>
                  ))}
                </div>
                <p>Published: {post?.dateTime}</p>
                <p className="leading-10">{post?.content?.text}</p>
              </div>
              <div className="text-xl join">
                <button
                  className={`btn join-item bg-clr-main`}
                  onClick={handleUp}
                >
                  {clickedUp ? (
                    <BiSolidUpvote className="text-2xl" />
                  ) : (
                    <BiUpvote className="text-2xl" />
                  )}{" "}
                  Upvote : {vote}
                </button>
                <button
                  className="btn join-item bg-clr-main"
                  onClick={handleDn}
                >
                  {clickedDn ? (
                    <BiSolidDownvote className="text-2xl" />
                  ) : (
                    <BiDownvote className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
