import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ApplicantsDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  console.log(id);

  const { isLoading, data: applicant } = useQuery({
    queryKey: ["applicant"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appliedTrainers/${id}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="col-span-3 justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto ">
          <div className="my-6">
            <h1 className="text-5xl font-bold text-clr-main text-center">
              Applicants details
            </h1>
          </div>
          <div className="my-12">
            <div>
              <div className="flex items-center gap-6">
                <div className="w-1/4">
                  <img
                    className="rounded-2xl border-2 border-clr-main"
                    src={applicant?.profileImage}
                    alt=""
                  />
                </div>
                <div className="w-3/4 space-y-3">
                  <h4 className="text-2xl font-semibold text-clr-main">
                    {applicant.fullName}
                  </h4>
                  <p>Age: {applicant.age}</p>
                  <p>Email: {applicant.email}</p>
                  <p>
                    With{" "}
                    <span className="text-xl font-semibold text-clr-main">
                      {applicant?.yearsOfExperience}
                    </span>{" "}
                    Years of experience
                  </p>
                  <p>{applicant?.bio}</p>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {applicant?.skills.map((skill, idx) => (
                        <div key={idx}>
                          <p className="badge badge-primary">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Experties
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {applicant?.areasOfExpertise.map((exprts, idx) => (
                        <div key={idx}>
                          <p className="badge badge-primary">{exprts}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 mt-6 w-full">
                    <p>
                      <span className="text-xl text-clr-main font-semibold">
                        Available Time:{" "}
                      </span>
                      {applicant?.availableTime}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-semibold text-clr-main">
                        Available Days:
                      </p>
                      <div className=" flex gap-3">
                        {applicant?.availableDays.map((day, idx) => (
                          <div key={idx}>
                            <p className="">{day}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center items-center gap-6">
              <button className="btn bg-[#1a560e]">Approve</button>
              <button className="btn bg-clr-main">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsDetails;
