import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AppliedTrainers = () => {
  const axiosPublic = useAxiosPublic();

  const { isLoading, data: appliedTrainers } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appliedTrainersDashboard`);
      return res.data;
    },
  });

  console.log(appliedTrainers);
  return (
    <div>
      <div className="w-11/12 lg:container mx-auto ">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main text-center">
            Applied Trainers
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
                    {appliedTrainers.map((appliedTrainer, idx) => (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <th>
                          {
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={appliedTrainer.profileImage}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          }
                        </th>
                        <td>{appliedTrainer.fullName}</td>
                        <td>{appliedTrainer.email}</td>
                        <td>
                          <Link
                            to={`/dashboard/applicant/${appliedTrainer._id}`}
                          >
                            <button className="btn bg-clr-main">Details</button>
                          </Link>
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

export default AppliedTrainers;
