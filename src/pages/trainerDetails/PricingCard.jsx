import { useState } from "react";

const PricingCard = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const plans = [
    {
      title: "Basic Membership",
      features: [
        "Access to gym facilities during regular operating hours.",
        "Use of cardio and strength training equipment.",
        "Access to locker rooms and showers.",
      ],
      price: 10,
    },
    {
      title: "Standard Membership",
      features: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Use of additional amenities like a sauna or steam room.",
      ],
      price: 50,
    },
    {
      title: "Premium Membership",
      features: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Discounts on additional services such as massage therapy or nutrition counseling.",
      ],
      price: 100,
    },
  ];

  const handleSelectPlan = (index) => {
    setSelectedPlan(index);
  };

  const handleSubmit = () => {
    if (selectedPlan !== "") {
      alert("selected plan");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-6">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`max-w-sm rounded-lg shadow-lg p-6 m-4 border ${
            selectedPlan === index ? "bg-[#00032271]" : ""
          }`}
          onClick={() => handleSelectPlan(index)}
        >
          <h2 className="text-3xl text-clr-main font-bold mb-4">
            {plan.title}
          </h2>
          <ul className="mb-6 pl-6">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="mb-2 list-disc">
                {feature}
              </li>
            ))}
          </ul>
          <div className="text-lg font-bold mt-4">Price: ${plan.price}</div>
          <div className="text-center mt-6">
            <button
              className="btn w-full rounded-lg transition duration-200"
              onClick={handleSubmit}
            >
              Join Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
