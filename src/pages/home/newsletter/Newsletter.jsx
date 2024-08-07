import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const subscriber = { name, email };

    axiosPublic
      .post("/newsletter", subscriber)
      .then((res) => {
        res.data;
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Thank you for subscribing!",
            icon: "success",
          });
        }
      })
      .catch((error) => error);
  };

  return (
    <div className="my-12 lg:my-24">
      <div className="lg:flex justify-center items-start gap-6 w-11/12 lg:container mx-auto">
        <div>
          <h3 className="text-5xl font-bold text-clr-main mb-6">
            Join our newsletter <br /> for latest updates
          </h3>
          <p className="text-xl">
            Join our newsletter for the latest updates. Have questions or need
            assistance? Contact our friendly support team.
          </p>
        </div>
        <div className="lg:w-1/2">
          <h3 className="text-2xl text-clr-main font-semibold mb-3">
            Get Started for Free
          </h3>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full"
            />
            <button className="btn w-full bg-clr-main">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
