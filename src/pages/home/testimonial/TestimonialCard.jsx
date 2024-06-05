import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="mx-4">
      <div className="card flex flex-col gap-6 card-side bg-base-100 justify-evenly items-center shadow-xl p-6 border border-clr-secondary h-[50vh]">
        <div className="w-1/4">
          <img
            className="rounded-full border-2 border-clr-secondary"
            src={testimonial.image}
            alt="a painting is a frame"
          />
        </div>
        <div>
          <p className="text-lg">{testimonial.testimonial}</p>
          <div className="text-xl font-medium mt-6">
            <h3 className="text-xl font-bold text-clr-secondary">
              {testimonial.customerName}
            </h3>
            <p className="text-base">{testimonial.customerDesignation}</p>
            <div className="flex items-center gap-1">
              <FaStar className="text-[#e79d2e]" />
              <FaStar className="text-[#e79d2e]" />
              <FaStar className="text-[#e79d2e]" />
              <FaStar className="text-[#e79d2e]" />
              <FaStar className="text-[#e79d2e]" />
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
