import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ClassCard = ({ classData }) => {
  return (
    <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out flex items-center gap-4">
      <div className="w-1/2">
        <img src={classData.image} alt="" />
      </div>
      <div className=" space-y-2">
        <h3 className="text-2xl font-bold text-clr-main">
          {classData.className}
        </h3>
        <p>{classData.description}</p>
        <p>
          <span className="font-bold">Total Bookings: </span>
          {classData.totalBookings}
        </p>
        <p className="font-bold">Trainers who take this class:</p>
        <div className="flex gap-5">
          {classData?.trainers?.map((trainer, idx) => (
            <Link key={idx} to={`/trainer/${trainer._id}`}>
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-clr-main ring-offset-base-100">
                  <img src={trainer.profileImage} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

ClassCard.propTypes = {
  classData: PropTypes.object,
};

export default ClassCard;
