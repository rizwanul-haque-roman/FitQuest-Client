import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProvider";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import StarRating from "./StarRating";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BookedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [trainerId, setTrainerId] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const { isLoading, data: bookedTrainer } = useQuery({
    queryKey: ["Id"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedTrainer?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    !isLoading && setTrainerId(bookedTrainer[0].trainerId);
  }, [isLoading]);

  const { isLoading: loading, data: trainer } = useQuery({
    queryKey: ["trainerInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer/${trainerId}`);
      return res.data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("function working perfectly");
    const feedback = event.target.feedback.value;

    const review = {
      image: user.photoURL,
      testimonial: feedback,
      customerName: user.displayName,
      customerDesignation: "Member",
      rating: rating,
    };
    console.log(review);

    axiosPublic
      .post("/testimonials", review)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          Swal.fire("Thank You For Your Valuable Review and Feedback");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {loading ? (
        <div className="col-span-3 justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto ">
          <div className="my-6">
            <h1 className="text-5xl font-bold text-clr-main">
              Booked Trainer details
            </h1>
          </div>
          <div className="grid grid-cols-2 my-12">
            <div>
              <h1 className="text-3xl font-bold underline">Trainer info</h1>
              <div>
                <div className="w-1/4 mt-6">
                  <img
                    className="rounded-full border-2 border-clr-main"
                    src={trainer?.profileImage}
                    alt=""
                  />
                </div>
                <div className="w-3/4 space-y-3">
                  <h4 className="text-2xl font-semibold text-clr-main">
                    {trainer?.fullName}
                  </h4>
                  <p>Age: {trainer?.age}</p>
                  <p>Email: {trainer?.email}</p>
                  <div className="flex gap-3 text-2xl">
                    <Link>
                      <FaFacebookF />
                    </Link>
                    <Link>
                      <IoLogoInstagram />
                    </Link>
                    <Link>
                      <BsTwitterX />
                    </Link>
                  </div>
                  <p>
                    With{" "}
                    <span className="text-xl font-semibold text-clr-main">
                      {trainer?.yearsOfExperience}
                    </span>{" "}
                    Years of experience
                  </p>
                  <p>{trainer?.bio}</p>
                  <div>
                    <p className="text-xl font-semibold text-clr-main underline">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {trainer?.skills.map((skill, idx) => (
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
                      {trainer?.areasOfExpertise.map((exprts, idx) => (
                        <div key={idx}>
                          <p className="badge badge-primary">{exprts}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold underline">Available Slots</h1>
              <div className="space-y-2 mt-6 w-full">
                <p>
                  <span className="text-xl text-clr-main font-semibold">
                    Available Time:{" "}
                  </span>
                  {trainer?.availableTime}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-semibold text-clr-main">
                    Available Days:
                  </p>
                  <div className=" flex gap-3">
                    {trainer?.availableDays.map((day, idx) => (
                      <div key={idx}>
                        <p className="">{day}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-clr-main underline my-3">
                    Slots info
                  </p>
                  <div className="flex gap-6 justify-between">
                    {trainer?.slotsAvailable.length === 0 ? (
                      <p>No Slots Available</p>
                    ) : (
                      <>
                        {trainer?.slotsAvailable.map((slot, idx) => (
                          <div key={idx}>
                            <button className="btn btn-sm hover:bg-clr-main">
                              {slot.day} <br /> {slot.time}
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-clr-main underline">
                    Classes
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {trainer?.classes.map((cls, idx) => (
                      <div key={idx}>
                        <p className="badge badge-primary">{cls}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="my-12">
                  <div className="mt-6 flex justify-center items-center gap-6">
                    <button
                      onClick={() =>
                        document.getElementById("review_modal").showModal()
                      }
                      className="btn bg-clr-main w-full"
                    >
                      Review
                    </button>
                  </div>
                  <dialog id="review_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <div>
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col justify-center items-center"
                        >
                          <label className="form-control">
                            <div className="label">
                              <h3 className="label-text-alt text-2xl mx-auto my-3 font-bold">
                                Please give a review about the trainer
                              </h3>
                            </div>
                            <p>
                              We highly value your feedback! Kindly take a
                              moment to rate your experience and provide us with
                              your valuable feedback.
                            </p>
                            <div className="flex justify-center items-center my-6">
                              <StarRating
                                setRating={setRating}
                                rating={rating}
                              />
                            </div>
                            <textarea
                              className="textarea textarea-bordered h-24"
                              name="feedback"
                              placeholder="Type here..."
                              required
                            ></textarea>
                          </label>
                          <div className="mt-6 flex justify-center">
                            <button className="btn bg-clr-main">
                              Submit feedback and review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
