import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllNewsletterSub = () => {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: subscribers } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/subscribers`);
      return res.data;
    },
  });

  // (subscribers);
  return (
    <div>
      <div className="w-11/12 lg:container mx-auto ">
        <div className="my-6">
          <h1 className="text-5xl font-bold text-clr-main text-center">
            All Newsletter Subscriber
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber, idx) => (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{subscriber.name}</td>
                        <td>{subscriber.email}</td>
                        <td>
                          <button className="btn bg-clr-main">
                            Send Email
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

export default AllNewsletterSub;
