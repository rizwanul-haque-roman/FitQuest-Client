import { useQuery } from "@tanstack/react-query";
import PieChart from "./PieChart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { PieChart } from "react-minimal-pie-chart";

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/totalBalance`);
      return res.data;
    },
  });

  const { isLoading, data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="w-11/12 lg:container mx-auto ">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-5xl font-bold text-clr-main">Balance</h2>
            <div className="py-10 my-6 border border-[#160747] rounded-xl w-1/2 text-center bg-[#1b1334]">
              <p className="text-7xl font-bold">${balance?.total}</p>
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-clr-main mb-6">
              Subscribers VS Paid Members
            </h2>
            <PieChart />
          </div>
        </div>
        <div className="my-6">
          <h2 className="text-3xl font-bold text-clr-main">Last 6 bookings</h2>
          <div className="w-full mt-6">
            {isLoading ? (
              <div className="col-span-3 justify-center items-center">
                <div className="flex justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              </div>
            ) : (
              //   subscribers.map((subscriber) => console.log(subscriber))
              <div className="overflow-y-auto h-[80vh]">
                <table className="table table-pin-rows table-pin-cols">
                  {/* head */}
                  <thead className="text-xl">
                    <tr>
                      <th>SL</th>
                      <th>Payment</th>
                      <th>Member Email</th>
                      <th>Transaction ID</th>
                      <th>Booked Trainer</th>
                      <th>Membership</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, idx) => (
                      <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>$ {payment.price}</td>
                        <td>{payment.memberEmail}</td>
                        <td>{payment.trxnId}</td>
                        <td>{payment.trainer}</td>
                        <td>{payment.package}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
