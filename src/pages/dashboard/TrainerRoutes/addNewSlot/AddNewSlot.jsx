import { useContext, useState } from "react";
import { AuthContext } from "../../../../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import SelectDropdown from "../../../beATrainer/SelectDropdown";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddNewSlot = () => {
  const { user, loader } = useContext(AuthContext);
  const [availableDays, setAvailableDays] = useState([]);
  const [classes, setClasses] = useState([]);

  const axiosSecure = useAxiosSecure();
  const { isLoading, data: trainer } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/trainerDashboard?email=${user.email}`
      );
      return res.data;
    },
  });

  const daysOption = [
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tues", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];

  const classesOptions = [
    { value: "Yoga Basics", label: "Yoga Basics" },
    { value: "Cardio Blast", label: "Cardio Blast" },
    { value: "Martial Arts", label: "Martial Arts" },
    { value: "Powerlifting", label: "Powerlifting" },
    { value: "Bodyweight Training", label: "Bodyweight Training" },
    { value: "Stretch and Flex", label: "Stretch and Flex" },
    { value: "Core Strength", label: "Core Strength" },
    { value: "Kickboxing", label: "Kickboxing" },
  ];

  const selectedOptions = trainer?.availableDays?.map((day) =>
    daysOption.find((option) => option.value === day)
  );

  let classlist = [];
  let days = [];
  classlist = classes?.map((cls) => cls.value);
  days = availableDays?.map((day) => day.value);

  days;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const slotTime = form.slotTime.value;

    availableDays;
    const updatedTrainerInfo = {
      days: days,
      slotsAvailable: [
        ...trainer?.slotsAvailable,
        { day: slot, time: slotTime },
      ],
      classes: classlist,
    };

    updatedTrainerInfo;

    axiosSecure
      .patch(`/updateSlot?email=${user.email}`, updatedTrainerInfo)
      .then((res) => {
        res.data;
        if (res.data.acknowledged === true) {
          Swal.fire("Information Updated Successfully");
        }
      });
  };

  return (
    <div className="w-11/12 lg:container mx-auto ">
      <div className="my-6">
        <h1 className="text-5xl font-bold text-clr-main text-center">
          Add New Slot
        </h1>
      </div>
      {!isLoading && (
        <div>
          <form onSubmit={handleSubmit} className="w-full mb-12">
            <div className="lg:flex gap-6">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={trainer?.fullName}
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Email
                  </span>
                </div>
                <input
                  type="email"
                  value={trainer?.email}
                  name="email"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">Age</span>
                </div>
                <input
                  type="number"
                  value={trainer?.age}
                  name="age"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Years of Experience
                  </span>
                </div>
                <input
                  type="number"
                  value={trainer?.yearsOfExperience}
                  name="experience"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
            </div>
            <label className="form-control w-full mt-6">
              <div className="label">
                <span className="label-text text-lg font-semibold">Bio</span>
              </div>
              <textarea
                value={trainer?.bio}
                name="bio"
                className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                required
              />
            </label>
            <div className="lg:flex gap-6">
              <label className="form-control w-full mt-6">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Profile image URL
                  </span>
                </div>
                <input
                  type="url"
                  placeholder="Enter Profile image url"
                  value={trainer?.profileImage}
                  name="url"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
              <label className="form-control w-full mt-6">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Available Time
                  </span>
                </div>
                <input
                  type="text"
                  value={trainer?.availableTime}
                  name="time"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
            </div>
            <div className="lg:flex gap-6 items-center mt-6">
              <label className="form-control w-full mt-6">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Available Days
                  </span>
                </div>
                {!isLoading && (
                  <SelectDropdown
                    options={daysOption}
                    setValue={setAvailableDays}
                    defaultValue={selectedOptions}
                  />
                )}
              </label>
              <label className="form-control w-full mt-6">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Classes
                  </span>
                </div>
                <SelectDropdown
                  options={classesOptions}
                  setValue={setClasses}
                  placeholder={"Select Classes from below"}
                />
              </label>
            </div>
            <div className="lg:flex gap-6">
              <label className="form-control w-full mt-6">
                <div className="label">
                  <span className="label-text text-lg font-semibold">Slot</span>
                </div>
                <input
                  type="text"
                  placeholder="Ex. Sat"
                  name="slot"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                />
              </label>
              <label className="form-control w-full mt-6">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Slot Time
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Ex. 7:00 AM - 8:00 AM"
                  name="slotTime"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                />
              </label>
            </div>
            <button className="mt-10 btn w-full bg-clr-main text-xl text-white font-semibold border-none">
              Apply
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNewSlot;
