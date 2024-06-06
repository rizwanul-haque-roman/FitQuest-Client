import About from "./about/About";
import Banner from "./banner/Banner";
import Featured from "./featured/Featured";
import Features from "./features/Features";
import LatestPosts from "./latestPost/LatestPosts";
import Testimonial from "./testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <About />
      <Featured />
      <Testimonial />
      <LatestPosts />
    </div>
  );
};

export default Home;
