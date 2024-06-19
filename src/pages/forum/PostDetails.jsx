import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { Helmet } from "react-helmet-async";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const [clickedUp, setClickedUp] = useState(false);
  const [clickedDn, setClickedDn] = useState(false);
  const [initialVote, setInitialVote] = useState(0);
  let [upvote, setUpvote] = useState(null);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data: post } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/post/${id}`);
      "inside useQuery:", res.data;
      return res.data;
    },
  });

  "Post:", post;
  `initial vote ${initialVote} upvote ${upvote}`;

  useEffect(() => {
    setUpvote(post?.likes);
    setInitialVote(post?.likes);
  }, [post]);

  useEffect(() => {
    if (upvote !== null) {
      axiosSecure
        .patch(`/upvote?postId=${id}`, { like: upvote })
        .then((res) => res.data)
        .catch((error) => error.message);
    }
  }, [upvote]);

  const handleUp = () => {
    if (!user) {
      navigate("/login");
    }
    setClickedUp(true);
    if (upvote < initialVote + 1) {
      setUpvote(upvote + 1);
      // update();
    }

    if (clickedDn) {
      setClickedDn(false);
    }
  };

  const handleDn = () => {
    if (upvote > initialVote) {
      setClickedDn(!clickedDn);
      setUpvote(upvote - 1);
      // update();
    }
    if (clickedUp) {
      setClickedUp(false);
    }
  };

  // const update = () => {
  //   axiosSecure
  //     .patch(`/upvote?postId=${id}`, { like: upvote })
  //     .then((res) => (res.data))
  //     .catch((error) => (error.message));
  // };

  post;
  return (
    <div className="min-h-screen pt-28">
      <Helmet>
        <title>FitQuest | Forum</title>
      </Helmet>
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
              <div className="lg:w-2/3 text-xl text-justify">
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
                  Upvote : {upvote}
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
