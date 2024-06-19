import { Link } from "react-router-dom";
import bg from "../../../assets/gymDumbles.jpg";
import gymGuy from "../../../assets/gymGuy.png";

const Banner = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-screen bg-[#000000c6] bg-cover bg-no-repeat bg-center">
        <div className="w-11/12 lg:container mx-auto flex flex-col-reverse lg:flex-row justify-between items-end">
          <div className="lg:w-1/2 min-h-screen flex flex-col justify-center">
            <h2 className="text-6xl font-bold">
              Your <span className="text-clr-main">Fitness</span>, Our Mission
            </h2>
            <p className="mt-6 text-xl leading-10">
              At FitQuest, we are dedicated to helping you achieve your health
              and fitness goals. Our expert trainers, personalized programs, and
              supportive community are here to guide and inspire you every step
              of the way. Join us and make your fitness journey our mission.
            </p>
            <Link to={"/allClasses"}>
              <button className="btn w-1/4 mt-6 bg-clr-main hover:bg-clr-main">
                Get started
              </button>
            </Link>
          </div>
          <div className="hidden lg:flex justify-end">
            <img className="lg:w-2/3" src={gymGuy} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
