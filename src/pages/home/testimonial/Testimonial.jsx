import { useQuery } from "@tanstack/react-query";
import bg from "../../../assets/testimonialBg.jpg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const axiosPublic = useAxiosPublic();

  const { isPending, data } = useQuery({
    queryKey: ["testimonial"],
    queryFn: async () => {
      const res = await axiosPublic.get("/testimonials");
      return res.data;
    },
  });

  console.log("Testimonials:", data);

  const settings_lg = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const settings_sm = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-[#000000f3] bg-cover bg-no-repeat bg-center py-12 ">
        <div className="container mx-auto my-8">
          <div>
            <h1 className="text-5xl font-bold text-clr-main">Testimonials</h1>
          </div>
          <div>
            {isPending ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              <>
                <div className="my-8 slider-container hidden lg:block">
                  <Slider {...settings_lg}>
                    {data.map((testimonial) => (
                      <TestimonialCard
                        key={testimonial._id}
                        testimonial={testimonial}
                      />
                    ))}
                  </Slider>
                </div>
                <div className="my-8 slider-container display lg:hidden">
                  <Slider {...settings_sm}>
                    {data.map((testimonial) => (
                      <TestimonialCard
                        key={testimonial._id}
                        testimonial={testimonial}
                      />
                    ))}
                  </Slider>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
