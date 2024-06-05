import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Featured = () => {
  const axiosPublic = useAxiosPublic();

  const { isPending, data } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured");
      return res.data;
    },
  });

  console.log("featured:", data);

  return (
    <div className="container mx-auto my-12">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-clr-main">Featured Classes</h1>
        <p className="mt-4">
          Join us for rebuilding yourself in a new way. Invest in yourself and
          reap the profit. Change yourself for the better with the services we
          provide.
        </p>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className=" grid grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="border border-clr-secondary rounded-lg p-6 bg-[#00000037] hover:transform hover:scale-105 hover:transition hover:duration-300 hover:ease-in-out hover:drop-shadow-xl transition duration-300 ease-out flex items-center gap-4"
            >
              <div className="w-1/2">
                <img src={item.image} alt="" />
              </div>
              <div className=" space-y-2">
                <h3 className="text-2xl font-bold text-clr-main">
                  {item.className}
                </h3>
                <p>{item.description}</p>
                <p>
                  <span className="font-bold">Total Bookings: </span>
                  {item.totalBookings}
                </p>
                <p className="font-bold">Trainers who take this class:</p>
                <div className="flex gap-5">
                  {item.trainers.map((trainer, idx) => (
                    <div key={idx} className="avatar">
                      <div className="w-10 rounded-full ring ring-clr-secondary ring-offset-base-100">
                        <img src={trainer.profileImage} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Featured;
