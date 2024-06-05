import About from "./about/About";
import Banner from "./banner/Banner";
import Featured from "./featured/Featured";
import Features from "./features/Features";
import Testimonial from "./testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <About />
      <Featured />
      <Testimonial />
    </div>
  );
};

export default Home;
