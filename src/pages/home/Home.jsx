import { Helmet } from "react-helmet-async";
import About from "./about/About";
import Banner from "./banner/Banner";
import Featured from "./featured/Featured";
import Features from "./features/Features";
import LatestPosts from "./latestPost/LatestPosts";
import Newsletter from "./newsletter/Newsletter";
import Team from "./team/Team";
import Testimonial from "./testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>FitQuest | Home</title>
      </Helmet>
      <Banner />
      <Features />
      <About />
      <Featured />
      <Testimonial />
      <LatestPosts />
      <Team />
      <Newsletter />
    </div>
  );
};

export default Home;
