import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";

const TestimonialCard = ({ testimonial }) => {
  const stars = Array(parseInt(testimonial.rating)).fill(0);
  return (
    <div className="mx-4">
      <div className="card flex flex-col gap-6 card-side bg-[#0c0f13] justify-evenly items-center shadow-xl p-6 border border-clr-main h-[48vh]">
        <div className="w-1/4">
          <img
            className="rounded-full border-2 border-clr-main"
            src={testimonial.image}
            alt=""
          />
        </div>
        <div>
          <p className="text-lg">{testimonial.testimonial}</p>
          <div className="text-xl font-medium mt-3">
            <h3 className="text-xl font-bold text-clr-main">
              {testimonial.customerName}
            </h3>
            <p className="text-base">{testimonial.customerDesignation}</p>
            <div className="flex items-center gap-1 mt-3">
              {stars.map((_, idx) => (
                <FaStar key={idx} className="text-[#e79d2e]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.object,
};

export default TestimonialCard;
