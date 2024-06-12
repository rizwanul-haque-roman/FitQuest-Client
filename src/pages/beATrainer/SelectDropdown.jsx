import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";

const animatedComponents = makeAnimated();

const SelectDropdown = ({ options, setValue, placeholder, defaultValue }) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      placeholder={placeholder}
      onChange={setValue}
      defaultValue={defaultValue}
    />
  );
};

SelectDropdown.propTypes = {
  options: PropTypes.array,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.array,
};

export default SelectDropdown;
