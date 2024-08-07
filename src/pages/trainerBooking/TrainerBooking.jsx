import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PricingCard from "../trainerDetails/PricingCard";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const TrainerBooking = () => {
  const [selected, setSelected] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const idx = localStorage.getItem("slot");
    setSelected(idx);
  }, []);

  const { isLoading, data: trainer } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer/${id}`);
      return res.data;
    },
  });

  const { isLoading: planLoading, data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pricing");
      return res.data;
    },
  });

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>FitQuest | Trainer Booking</title>
      </Helmet>
      {isLoading ? (
        <div className="col-span-3 justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto ">
          <div className="my-6">
            <h1 className="text-5xl font-bold text-clr-main">
              Trainer Booking
            </h1>
          </div>
          <div className="lg:flex justify-center items-center gap-12">
            <div className="w-1/6 mt-6">
              <img
                className="rounded-full border-2 border-clr-main"
                src={trainer.profileImage}
                alt=""
              />
            </div>
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold">
                Trainer Name:{" "}
                <span className="text-clr-main">{trainer.fullName}</span>
              </h4>
              <div>
                <p className="text-xl font-semibold text-clr-main underline my-2">
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
              <div>
                <p className="text-xl font-semibold text-clr-main underline my-3">
                  Selected slot
                </p>
                <div className="flex flex-wrap gap-6">
                  {trainer?.slotsAvailable.map((slot, idx) => (
                    <div key={idx}>
                      <button
                        className={`btn btn-lg ${
                          selected == idx && "bg-clr-main"
                        }`}
                      >
                        {slot.day} <br /> {slot.time}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex justify-center items-center">
            {!planLoading &&
              plans.map((plan, idx) => (
                <PricingCard
                  key={idx}
                  plan={plan}
                  trainerId={id}
                  selectedPlan={selectedPlan}
                  onSelectPlan={handleSelectPlan}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerBooking;
