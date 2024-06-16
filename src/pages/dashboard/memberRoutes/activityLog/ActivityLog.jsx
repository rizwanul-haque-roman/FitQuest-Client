import { useContext } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa6";

const ActivityLog = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const { isLoading, data: applicationStatus } = useQuery({
    queryKey: ["applicationStatus"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/applicationStatus?email=${user.email}`
      );
      return res.data;
    },
  });

  !isLoading && console.log(applicationStatus[0]);
  return (
    <div>
      <h1 className="text-5xl font-bold text-clr-main">Activity Log</h1>
      <div className="flex gap-3 items-center my-6 text-xl font-medium">
        <p>Application Status: {!isLoading && applicationStatus[0].status}</p>
        <button onClick={() => document.getElementById("feedback").showModal()}>
          <FaEye />
        </button>
        <dialog id="feedback" className="modal">
          <div className="modal-box">
            <p className="py-4">
              {!isLoading && applicationStatus[0].feedback}
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ActivityLog;
