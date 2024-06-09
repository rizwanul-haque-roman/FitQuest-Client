import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PricingCard = ({ plan, idx, trainerId }) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planID, setPlanID] = useState("");
  const navigate = useNavigate();

  const handleSelectPlan = (idx, id) => {
    setSelectedPlan(idx);
    setPlanID(id);
  };

  console.log("plan:", selectedPlan);
  const handleJoin = () => {
    const plan = { trainerId, planID };
    const planJSON = JSON.stringify(plan);
    localStorage.setItem("plan", planJSON);
    navigate("/payment");
  };

  return (
    <div
      key={idx}
      className={`max-w-sm rounded-lg shadow-lg p-6 m-4 border hover:cursor-pointer ${
        selectedPlan === idx ? "bg-[#00032271]" : ""
      }`}
      onClick={() => handleSelectPlan(idx, plan._id)}
    >
      <h2 className="text-3xl text-clr-main font-bold mb-4">{plan.title}</h2>
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
          className={`btn w-full rounded-lg transition duration-200 ${
            selectedPlan !== idx ? "btn-disabled" : ""
          }`}
          onClick={handleJoin}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  plan: PropTypes.object,
  idx: PropTypes.number,
  trainerId: PropTypes.string,
};

export default PricingCard;
