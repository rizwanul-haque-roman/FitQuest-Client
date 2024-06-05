import About from "./about/About";
import Banner from "./banner/Banner";
import Featured from "./featured/Featured";
import Features from "./features/Features";

const Home = () => {
  return (
    <div>
      <Banner />
      <Features />
      <About />
      <Featured />
    </div>
  );
};

export default Home;
