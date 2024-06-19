import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import bg from "../../assets/paymentBg.jpg";
import card from "../../assets/card.png";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const planJSON = localStorage.getItem("plan");
  const plan = JSON.parse(planJSON);
  const slot = localStorage.getItem("slot");
  const { user, loader } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const { isLoading: loadingTrainer, data: trainer } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer/${plan.trainerId}`);
      return res.data;
    },
  });
  const { isLoading: loadingPlan, data: planData } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pricing/${plan.planID}`);
      return res.data;
    },
  });
  const bookedSlot = trainer?.slotsAvailable[slot];

  let paymentInfo = null;
  if (!loadingPlan && planData) {
    paymentInfo = {
      trainer: trainer?.fullName,
      trainerId: plan.trainerId,
      slot: bookedSlot,
      package: planData?.title,
      price: planData?.price,
      memberName: user?.displayName,
      memberEmail: user?.email,
    };
  }

  const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);
  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>FitQuest | Payment</title>
      </Helmet>
      {loadingTrainer || loadingPlan || loader ? (
        <div className="col-span-3 justify-center items-center">
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto ">
          <div className="my-6">
            <h1 className="text-5xl font-bold text-clr-main">Payment</h1>
          </div>
          <div
            className="bg-cover bg-center bg-no-repeat border border-clr-main rounded-2xl p-10 text-2xl relative z-10"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="bg-[#000000d6] rounded-2xl h-full absolute z-20 inset-0"></div>
            <div className="hidden lg:block">
              <img
                className="w-1/3 absolute z-30 right-20 top-20"
                src={card}
                alt=""
              />
            </div>
            <div className="lg:w-1/2 text-xl flex flex-col gap-4 z-30 relative">
              <div className="lg:flex justify-between">
                <p>Trainer: </p>
                <p>{trainer?.fullName}</p>
              </div>
              <div className="lg:flex justify-between">
                <p>Slot:</p>
                <p>
                  {bookedSlot?.day}-{bookedSlot.time}
                </p>
              </div>
              <div className="lg:flex justify-between">
                <p>Package Name: </p>
                <p>{planData?.title}</p>
              </div>
              <div className="lg:flex justify-between">
                <p>Price: </p>
                <p>${planData?.price}</p>
              </div>
              <div className="lg:flex justify-between">
                <p>Member name: </p>
                <p>{user?.displayName}</p>
              </div>
              <div className="lg:flex justify-between">
                <p>Member email: </p>
                <p>{user?.email}</p>
              </div>
              <div>
                {success ? (
                  <Link to={"/"}>
                    <button className="w-full btn bg-clr-main text-xl">
                      payment completed
                    </button>
                  </Link>
                ) : (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      paymentInfo={paymentInfo}
                      setSuccess={setSuccess}
                    />
                  </Elements>
                )}
              </div>
              {/* <button
                onClick={handleConfirm}
                className="btn w-full bg-clr-main text-xl"
              >
                Confirm Payment
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
