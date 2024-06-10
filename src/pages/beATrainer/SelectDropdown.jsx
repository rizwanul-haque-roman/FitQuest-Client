import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";

const animatedComponents = makeAnimated();

const SelectDropdown = ({ options, setValue, placeholder }) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      placeholder={placeholder}
      onChange={setValue}
    />
  );
};

SelectDropdown.propTypes = {
  options: PropTypes.array,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SelectDropdown;
