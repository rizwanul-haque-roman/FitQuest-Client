import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import SelectDropdown from "./SelectDropdown";
import TrainerSkills from "./TrainerSkills";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const BeATrainer = () => {
  const [availableDays, setAvailable] = useState([]);
  const [experties, setExperties] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { user, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  let days = [];
  let expertiesData = [];
  days = availableDays.map((day) => day.value);
  expertiesData = experties.map((day) => day.value);
  //   console.log(expertiesData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const age = form.age.value;
    const experience = form.experience.value;
    const bio = form.bio.value;
    const AvailableTime = form.time.value;
    const photoURL = user?.photoURL;
    const availableDays = days;
    const experties = expertiesData;
    const skills = selectedSkills;

    const trainer = {
      fullName: name,
      email: email,
      profileImage: photoURL,
      age: age,
      skills: skills,
      availableDays: availableDays,
      availableTime: AvailableTime,
      yearsOfExperience: experience,
      role: "member",
      bio: bio,
      areasOfExpertise: experties,
      status: "pending",
      slotsAvailable: [],
      classes: [],
    };

    // console.log(trainer);

    axiosSecure.post("/appliedTrainer", trainer).then((res) => {
      // console.log(res.data);
      if (res.data.acknowledged === true) {
        Swal.fire({
          title: "Success!",
          text: "Application Successfull!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    });
  };

  const daysOption = [
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tues", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
  ];
  const expertiesOptions = [
    { value: "Yoga Basics", label: "Yoga Basics" },
    { value: "Cardio Blast", label: "Cardio Blast" },
    { value: "Martial Arts", label: "Martial Arts" },
    { value: "Powerlifting", label: "Powerlifting" },
    { value: "Bodyweight Training", label: "Bodyweight Training" },
    { value: "Stretch and Flex", label: "Stretch and Flex" },
    { value: "Core Strength", label: "Core Strength" },
    { value: "Kickboxing", label: "Kickboxing" },
  ];

  //   availableDays.map((day) => console.log(day.value));
  //   console.log(selectedSkills);

  return (
    <div className="min-h-screen pt-20">
      <Helmet>
        <title>FitQuest | Be A Trainer</title>
      </Helmet>
      {loader ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="w-11/12 lg:container mx-auto ">
          <div className="my-6">
            <h1 className="text-5xl font-bold text-clr-main">Be A Trainer</h1>
            <p className="w-2/3">
              Unlock your potential and transform lives by becoming a trainer
              with us. Share your expertise, build your brand, and join a
              community dedicated to making a difference. Start your journey
              today and inspire the next generation of achievers. To join as a
              trainer fill up the form below.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="w-full mb-12">
              <div className="flex gap-6">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Name
                    </span>
                  </div>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.displayName}
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
                    value={user.email}
                    name="email"
                    className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Age
                    </span>
                  </div>
                  <input
                    type="number"
                    placeholder="Your age"
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
                    placeholder="Years of experience"
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
                  placeholder="Share a brief introduction about yourself, your experience, and your training philosophy."
                  name="bio"
                  className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                  required
                />
              </label>
              <div className="flex gap-6">
                <label className="form-control w-full mt-6">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Profile image URL
                    </span>
                  </div>
                  <input
                    type="url"
                    placeholder="Enter Profile image url"
                    defaultValue={user?.photoURL}
                    name="url"
                    className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                    required
                  />
                </label>
                <label className="form-control w-full mt-6">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Available Time (minimum 2 hours a day)
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="i.e. 6:00 AM - 8:00 AM"
                    name="time"
                    className="outline-none bg-transparent w-full py-4 pl-1 border-b-2 border-clr-main"
                    required
                  />
                </label>
              </div>
              <div className="flex gap-6 items-center mt-6">
                <label className="form-control w-full mt-6">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Available Days (select at least 3)
                    </span>
                  </div>
                  <SelectDropdown
                    options={daysOption}
                    setValue={setAvailable}
                    placeholder={"When are you available in a week?"}
                  />
                </label>
                <label className="form-control w-full mt-6">
                  <div className="label">
                    <span className="label-text text-lg font-semibold">
                      Area of experties (select at least 5)
                    </span>
                  </div>
                  <SelectDropdown
                    options={expertiesOptions}
                    setValue={setExperties}
                    placeholder={"What are your area of experties?"}
                  />
                </label>
              </div>
              <div className="mt-6">
                <TrainerSkills
                  selectedSkills={selectedSkills}
                  setSelectedSkills={setSelectedSkills}
                />
              </div>
              <button className="mt-10 btn w-full bg-clr-main text-xl text-white font-semibold border-none  ">
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeATrainer;
