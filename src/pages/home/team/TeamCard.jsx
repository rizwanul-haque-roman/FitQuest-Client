import PropTypes from "prop-types";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

const TeamCard = ({ trainer }) => {
  return (
    <div>
      <div className="card flex flex-col gap-4 card-side bg-[#0c0f13] justify-evenly shadow-xl p-6 border border-clr-main h-full">
        <div className="flex items-center gap-4">
          <div className="w-1/4">
            <img
              className="rounded-full border-2 border-clr-main"
              src={trainer.profileImage}
              alt=""
            />
          </div>
          <div className="w-3/4 space-y-3">
            <h4 className="text-2xl font-semibold text-clr-main">
              {trainer.fullName}
            </h4>
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
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-clr-main">Available Slots</p>
          <div className="flex gap-2">
            {trainer?.slotsAvailable.length === 0 ? (
              <p>No Slots Available</p>
            ) : (
              <>
                {trainer?.slotsAvailable.map((slot, idx) => (
                  <div key={idx}>
                    <p className="btn btn-lg text-xs hover:bg-clr-main">
                      {slot.day} <br /> {slot.time}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
          <p className="text-xl font-semibold text-clr-main">
            Classes by this trainer
          </p>
          <div className="flex flex-wrap gap-2">
            {trainer?.classes.map((cls, idx) => (
              <div key={idx}>
                <p className="badge badge-primary">{cls}</p>
              </div>
            ))}
          </div>
        </div>
        <Link to={`/trainer/${trainer._id}`}>
          <button className="btn btn-sm bg-clr-main hover:bg-[#6c0d0d]">
            Know more
          </button>
        </Link>
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  trainer: PropTypes.object,
};

export default TeamCard;
