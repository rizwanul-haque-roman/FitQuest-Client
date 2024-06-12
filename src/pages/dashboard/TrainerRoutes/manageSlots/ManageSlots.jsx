import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthProvider";
import Swal from "sweetalert2";

const ManageSlots = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    refetch,
    isLoading,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/bookingData?name=${user.displayName}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/slotDeletion?id=${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  console.log(bookings);

  return (
    <div className="w-11/12 lg:container mx-auto ">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-clr-main text-center">
          Manage Slots
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-xl">
              <tr>
                <th>Slot</th>
                <th>Day</th>
                <th>Time</th>
                <th>Bookings</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                bookings.map((booking, idx) => (
                  <tr key={idx}>
                    <th>
                      <button className="btn bg-clr-main">
                        {booking.slot.day} <br /> {booking.slot.time}
                      </button>
                    </th>
                    <td>{booking.slot.day}</td>
                    <td>{booking.slot.time}</td>
                    <td>{booking.memberEmail}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="btn bg-clr-main"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSlots;
