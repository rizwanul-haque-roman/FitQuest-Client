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

  //   console.log(userData[0].role);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const dateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  //   console.log(dateTimeString);

  //   console.log(user.photoURL);
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

    console.log(postData);

    axiosSecure
      .post("/forumPost", postData)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.acknowledged) {
          Swal.fire("Forum Post added");
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="w-11/12 lg:container mx-auto ">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-clr-main text-center">
          Add new Forum
        </h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-6">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-xl">Post Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Add Post title"
                  name="title"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-xl">Post Category</span>
                </div>
                <input
                  type="text"
                  name="category"
                  placeholder="Ex. Nutrition"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-xl">Post Tags</span>
                </div>
                <input
                  type="text"
                  name="tags"
                  placeholder="Ex. nutrition, musclegain, bodymass"
                  className="input input-bordered w-full max-w-xs"
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

/**
 * {
  "title": "Nutrition Tips for Muscle Gain",
  "author": {
    "username": "Emily Johnson",
    "profilePicture": "https://i.ibb.co/TqKbgzM/Emily-Johnson.jpg",
    "role": "Trainer"
  },
  "dateTime": "2024-06-06T10:00:00Z",
  "content": {
    "text": "Gaining muscle mass requires a balanced approach to nutrition. Prioritize protein intake, aiming for about 1.6 to 2.2 grams of protein per kilogram of body weight daily, from sources like lean meats, eggs, dairy, and plant-based proteins. Carbohydrates are also crucial for fueling workouts and recovery, so include complex carbs like whole grains, fruits, and vegetables in your diet. Healthy fats from sources like avocados, nuts, and olive oil support hormone production and overall health. Stay hydrated and consider nutrient timing, such as consuming protein-rich snacks post-workout to enhance muscle repair and growth. A well-rounded diet tailored to your specific needs and goals is essential for optimal results.",
    "media": "https://i.ibb.co/51SBDbC/nutrition-Tips.png"
  },
  "category": "Nutrition",
  "tags": [
    "nutrition",
    "muscle gain",
    "diet tips"
  ],
  "likes": 0,
  "views": 0
}
 */
