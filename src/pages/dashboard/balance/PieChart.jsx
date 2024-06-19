import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PieChart = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats } = useQuery({
    queryKey: ["subMembers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/subMember`);
      return res.data;
    },
  });
  const data = [
    ["Type", "Value"],
    ["Subscriber", stats?.totalSubscribers],
    ["Paid Member", stats?.totalPaidMembers],
  ];

  const options = {
    backgroundColor: "#1D232A",
    titleTextStyle: {
      color: "#fff",
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"350px"}
      />
    </div>
  );
};

export default PieChart;
