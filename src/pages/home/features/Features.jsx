import f1 from "../../../assets/bodyBuilding.png";
import f2 from "../../../assets/masculation.png";
import f3 from "../../../assets/running.png";
import f4 from "../../../assets/deadlift.png";
import f5 from "../../../assets/weightlift.png";
import f6 from "../../../assets/yoga.png";

const Features = () => {
  return (
    <div className="w-11/12 lg:container mx-auto my-12 lg:my-24">
      <div>
        <h1 className="text-5xl font-bold text-clr-main">Features</h1>
        <p className="mt-4">
          Join us for rebuilding yourself in a new way. Invest in yourself and
          reap the profit. Change yourself for the better with the services we
          provide.
        </p>
        <div className="mt-12">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
              <img className="w-1/4" src={f1} alt="" />
              <h3 className="text-2xl font-bold text-clr-main">
                Body Building
              </h3>
              <p>
                Build the body you&apos;ve always dreamed of. Our expert
                bodybuilding coaches will create a personalized plan to help you
                achieve your fitness goals.
              </p>
            </div>
            <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
              <img className="w-1/4" src={f2} alt="" />
              <h3 className="text-2xl font-bold text-clr-main">Masculation</h3>
              <p>
                Build your dream physique with our personalized muscle-building
                programs! We offer expert guidance, customized workout plans.
              </p>
            </div>
            <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
              <img className="w-1/4" src={f3} alt="" />
              <h3 className="text-2xl font-bold text-clr-main">
                Tredmil Running
              </h3>
              <p>
                Treadmill running offers a fantastic way to get your cardio
                workout in, all from the comfort and convenience of dedicated
                gym space. Get up and running.
              </p>
            </div>
            <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
              <img className="w-1/4" src={f4} alt="" />
              <h3 className="text-2xl font-bold text-clr-main">Deadlifting</h3>
              <p>
                Build core strength and pulling power with our deadlift
                coaching. Master the deadlift! Avoid injury and maximize results
                with personalized deadlift instruction.
              </p>
            </div>
            <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
              <img className="w-1/4" src={f5} alt="" />
              <h3 className="text-2xl font-bold text-clr-main">
                Weighting Lifting
              </h3>
              <p>
                Unleash your inner athlete with our personalized weightlifting
                program! Get expert coaching, build strength and achieve your
                fitness goals faster. Start today.
              </p>
            </div>
            <div className="border border-clr-main rounded-2xl p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out">
              <img className="w-1/4" src={f6} alt="" />
              <h3 className="text-2xl font-bold text-clr-main">Classic Yoga</h3>
              <p>
                Find your center and strengthen your body with our yoga classes!
                We offer a variety of styles for all levels. Unwind, de-stress,
                and feel the difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
