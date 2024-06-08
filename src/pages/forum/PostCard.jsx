import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  return (
    <div>
      <div className="card card-compact h-full border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
        <div className="h-full flex flex-col justify-between">
          <figure>
            <img
              className="rounded-lg"
              src={post?.content?.media}
              alt="media"
            />
          </figure>
          <div className="my-6">
            <h2 className="card-title text-2xl text-clr-main">{post.title}</h2>
            <div className="flex gap-2 items-center">
              <div className="w-1/12">
                <img
                  className="rounded-full border-2 border-clr-main"
                  src={post?.author?.profilePicture}
                  alt=""
                />
              </div>
              <p className="text-xl">{post?.author?.username}</p>
              <p className="badge badge-accent">{post?.author?.role}</p>
            </div>
          </div>
          <div>
            <button className="btn btn-sm hover:bg-clr-main">
              View full post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
