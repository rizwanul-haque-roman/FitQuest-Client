import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PricingCard = ({ plan, trainerId, selectedPlan, onSelectPlan }) => {
  const navigate = useNavigate();

  const handleSelectPlan = (id) => {
    onSelectPlan(id);
  };

  const handleJoin = () => {
    const planData = { trainerId, planID: plan._id };
    const planJSON = JSON.stringify(planData);
    localStorage.setItem("plan", planJSON);
    navigate("/payment");
  };

  return (
    <div
      className={`max-w-sm rounded-lg shadow-lg p-6 m-4 border hover:cursor-pointer ${
        selectedPlan === plan._id ? "bg-[#00032271]" : ""
      }`}
      onClick={() => handleSelectPlan(plan._id)}
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
            selectedPlan !== plan._id ? "btn-disabled" : ""
          }`}
          onClick={handleJoin}
          disabled={selectedPlan !== plan._id}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  plan: PropTypes.object,
  trainerId: PropTypes.string,
  selectedPlan: PropTypes.string,
  onSelectPlan: PropTypes.func,
};

export default PricingCard;
