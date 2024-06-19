import { useContext, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa6";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const { isLoading, data: applicationStatus } = useQuery({
    queryKey: ["applicationStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applicationStatus?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user.email,
  });

  const status =
    !isLoading && applicationStatus ? applicationStatus[0]?.status : null;
  const feedback =
    !isLoading && applicationStatus ? applicationStatus[0]?.feedback : null;

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold text-clr-main">Activity Log</h1>
        <div className="flex gap-3 items-center my-6 text-xl font-medium">
          <p>Application Status: {status ?? "Not applied"}</p>
          <button onClick={() => setFeedbackModalOpen(true)}>
            <FaEye />
          </button>
          {feedbackModalOpen && (
            <dialog open id="feedback" className="modal">
              <div className="modal-box">
                <p className="py-4">{feedback ?? "Not applied"}</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button onClick={() => setFeedbackModalOpen(false)}>
                  Close
                </button>
              </form>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityLog;
