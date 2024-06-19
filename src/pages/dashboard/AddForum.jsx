import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddForum = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      return res.data;
    },
  });

  //   (userData[0].role);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const dateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  //   (dateTimeString);

  //   (user.photoURL);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const category = form.category.value;
    const tags = form.tags.value;
    const post = form.text.value;
    const url = form.media.value;

    const str = tags;
    const tagsArr = str.split(/\s*,\s*/);

    const postData = {
      title: title,
      author: {
        username: user.displayName,
        profilePicture: user.photoURL,
        role: userData[0].role,
      },
      dateTime: dateTime,
      content: {
        text: post,
        media: url,
      },
      category: category,
      tags: tagsArr,
      likes: 0,
      views: 0,
    };

    postData;

    axiosSecure
      .post("/forumPost", postData)
      .then((res) => {
        res.data;
        if (res?.data?.acknowledged) {
          Swal.fire("Forum Post added");
        }
      })
      .catch((error) => error.message);
  };

  return (
    <div className="w-11/12 lg:container mx-auto ">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-clr-main text-center">
          Add new Forum
        </h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="lg:flex lg:gap-6">
              <label className="form-control w-full lg:max-w-xs">
                <div className="label">
                  <span className="label-text text-xl">Post Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Add Post title"
                  name="title"
                  className="input input-bordered w-full lg:max-w-xs"
                />
              </label>
              <label className="form-control w-full lg:max-w-xs">
                <div className="label">
                  <span className="label-text text-xl">Post Category</span>
                </div>
                <input
                  type="text"
                  name="category"
                  placeholder="Ex. Nutrition"
                  className="input input-bordered w-full lg:max-w-xs"
                />
              </label>
              <label className="form-control w-full lg:max-w-xs">
                <div className="label">
                  <span className="label-text text-xl">Post Tags</span>
                </div>
                <input
                  type="text"
                  name="tags"
                  placeholder="Ex. nutrition, musclegain, bodymass"
                  className="input input-bordered w-full lg:max-w-xs"
                />
              </label>
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text-alt text-xl">Write Post</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                name="text"
                placeholder="Write descriptive text about the topic"
              ></textarea>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-xl">Add photo URL</span>
              </div>
              <input
                type="url"
                name="media"
                placeholder="Add a photoURL for the thumbnail of the forum post"
                className="input input-bordered w-full"
              />
            </label>
            <div className="mt-6 flex justify-center items-center">
              <button className="btn bg-clr-main">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForum;
