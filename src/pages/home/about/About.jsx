import { Link } from "react-router-dom";
import bg from "../../../assets/aboutBg.jpg";
import dumbles from "../../../assets/dumbles.png";

const About = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-[#000000f3] bg-cover bg-no-repeat bg-center py-12">
        <div className="container mx-auto flex justify-between">
          <div className="w-1/2">
            <h2 className="text-6xl font-bold text-clr-main">About Us</h2>
            <p className="mt-6 text-xl leading-10">
              At FitQuest, we&apos;re passionate about helping people achieve
              their health and wellness goals. We believe that fitness should be
              accessible, enjoyable, and sustainable. That&apos;s why we&apos;ve
              developed a cutting-edge fitness tracker platform that combines
              innovative technology with a supportive community. We offer a
              variety of features to help you track your progress, set goals,
              and connect with like-minded individuals. Whether you&apos;re a
              seasoned athlete or just starting out, we&apos;re here to guide
              and motivate you on your fitness journey.
            </p>
            <Link to={"/allClasses"}>
              <button className="btn w-1/4 mt-6 bg-clr-secondary hover:bg-clr-main">
                Join Us
              </button>
            </Link>
          </div>
          <div className="flex justify-end">
            <img className="" src={dumbles} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
