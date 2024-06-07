import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ClassCard from "../../../shared/ClassCard";

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
    <div className="container mx-auto my-24">
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
            <ClassCard key={item._id} classData={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Featured;
