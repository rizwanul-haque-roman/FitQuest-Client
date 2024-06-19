import PropTypes from "prop-types";

const skills = [
  { value: "strength_training", label: "Strength Training" },
  { value: "cardio", label: "Cardio" },
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
  { value: "nutrition", label: "Nutrition" },
  { value: "crossfit", label: "CrossFit" },
  { value: "flexibility", label: "Flexibility" },
];

const TrainerSkills = ({ selectedSkills, setSelectedSkills }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        Select Your Skills (At least 3)
      </h3>
      <div className="flex flex-wrap gap-6">
        {skills.map((skill) => (
          <div key={skill.value}>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                value={skill.value}
                onChange={handleCheckboxChange}
                checked={selectedSkills.includes(skill.value)}
              />
              {skill.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

TrainerSkills.propTypes = {
  selectedSkills: PropTypes.array,
  setSelectedSkills: PropTypes.func,
};

export default TrainerSkills;
