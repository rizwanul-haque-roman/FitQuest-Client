import { Link } from "react-router-dom";
import bg from "../../../assets/gymDumbles.jpg";
import gymGuy from "../../../assets/gymGuy.jpg";

const Banner = () => {
  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-screen bg-[#000000e3] bg-cover bg-no-repeat bg-center">
        <div className="container mx-auto flex justify-between items-end">
          <div className="w-1/2 h-screen flex flex-col justify-center">
            <h2 className="text-6xl font-bold">
              Your <span className="text-clr-main">Fitness</span>, Our Mission
            </h2>
            <p className="mt-6 text-xl">
              At FitQuest, we are dedicated to helping you achieve your health
              and fitness goals. Our expert trainers, personalized programs, and
              supportive community are here to guide and inspire you every step
              of the way. Join us and make your fitness journey our mission.
            </p>
            <Link to={"/allClasses"}>
              <button className="btn w-1/4 mt-6 bg-clr-secondary hover:bg-clr-main">
                Get started
              </button>
            </Link>
          </div>
          <div className="flex justify-end">
            <img className="w-2/3" src={gymGuy} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
