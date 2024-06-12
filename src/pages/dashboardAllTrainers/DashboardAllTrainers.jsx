import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const DashboardAllTrainers = () => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    isLoading,
    data: trainers,
  } = useQuery({
    queryKey: ["trainersDashboard"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/dashboard/trainers`);
      return res.data;
    },
  });

  const handleDelete = async (id, email) => {
    console.log(id);
    const res = await axiosPublic.patch(
      `/trainerToMember?id=${id}&email=${email}`
    );
    console.log(res.data);

    if (res?.data?.result?.modifiedCount === 1) {
      Swal.fire("Trainer deleted successfully");
      refetch();
    }
  };

  console.log(trainers);
  return (
    <div>
      <div className="w-11/12 lg:container mx-auto ">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main text-center">
            All Trainers
          </h1>
          <div className="w-full mt-6">
            {isLoading ? (
              <div className="col-span-3 justify-center items-center">
                <div className="flex justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto h-[80vh]">
                <table className="table table-pin-rows table-pin-cols">
                  <thead className="text-xl">
                    <tr>
                      <th>SL</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer, idx) => (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <th>
                          {
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={trainer?.profileImage}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          }
                        </th>
                        <td>{trainer?.fullName}</td>
                        <td>{trainer?.email}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleDelete(trainer?._id, trainer?.email)
                            }
                            className="btn bg-clr-main"
                          >
                            Delete Trainer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAllTrainers;
