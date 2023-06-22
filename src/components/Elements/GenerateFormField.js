import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import CustomSwitch from "./CustomSwitch";

function generateFormField(obj) {
  const {
    name,
    placeholder,
    type,
    label,
    isClearable,
    selectedValue,
    selectType,
    isChecked,
    style,
  } = obj;
  switch (type) {
    case "text":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
          style={style}
        />
      );
    case "date":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
          style={style}
        />
      );
    case "number":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
          style={style}
        />
      );
    case "email":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
        />
      );
    case "switch":
      return (
        <CustomSwitch
          name={name}
          type={type}
          label={label}
          style={style}
          isChecked={isChecked}
        />
      );
    case "select":
      return (
        <CustomSelector
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
          style={style}
          selectType={selectType}
          isClearable={isClearable}
          selectedValue={selectedValue}
          options={obj.options}
        />
      );
    default:
      return "";
  }
}

export default generateFormField;
