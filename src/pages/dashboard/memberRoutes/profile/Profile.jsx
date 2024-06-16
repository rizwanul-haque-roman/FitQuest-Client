import { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      return res.data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button working");
    const form = event.target;

    const name = form.name.value;
    const lastLogin = form.lastLogin.value;
    const profilePicture = form.pfp.value;

    const updateUserData = {
      id: userData[0]?._id,
      name: name,
      lastLogin: lastLogin,
      profilePicture: profilePicture,
    };

    axiosSecure
      .patch("/userUpdate", updateUserData)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    console.log(updateUserData);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-11/12 lg:container mx-auto ">
            <div className="my-6">
              <h1 className="text-5xl font-bold text-clr-main text-center">
                User Profile
              </h1>
            </div>
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center w-full gap-6"
              >
                <div className="w-full">
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Name</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      //placeholder="Your name"
                      defaultValue={userData[0]?.name}
                      className="input input-bordered w-full "
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Your email</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={userData[0]?.email}
                      className="input input-bordered w-full"
                    />
                  </label>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Last Login</span>
                    </div>
                    <input
                      type="text"
                      name="lastLogin"
                      defaultValue={userData[0]?.lastLogin}
                      className="input input-bordered w-full "
                    />
                  </label>
                  <div className="mt-12 w-full">
                    <button className="btn bg-clr-main w-full">Update</button>
                  </div>
                </div>
                <div className="w-full">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Profile Picture</span>
                    </div>
                    <div className="mb-3 w-1/2">
                      <img src={userData[0]?.photoURL} alt="" />
                    </div>
                    <input
                      type="url"
                      name="pfp"
                      defaultValue={userData[0]?.photoURL}
                      placeholder="Your photo picture URL"
                      className="input input-bordered w-full "
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
