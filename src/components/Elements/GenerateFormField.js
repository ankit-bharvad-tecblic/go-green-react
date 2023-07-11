import moment from "moment/moment";
import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import CustomSwitch from "./CustomSwitch";
import CustomTextArea from "./CustomTextArea";
import CustomDatepicker from "./CustomDatepicker";

function generateFormField(obj) {
  const {
    name,
    placeholder,
    type,
    label,
    size,
    height,
    isClearable,
    selectedValue,
    selectType,
    isChecked,
    style,
    max,
    min,
  } = obj;
  const formatDate = (value) => {
    // const formattedDate = moment(value, "YYYY-MM-DD").format("MMMM D, YYYY");
    // return formattedDate;

    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(value);
    return date.toLocaleDateString(undefined, options);

    // const formattedDate = moment(value).format("MMMM D, YYYY");
    // return formattedDate;
  };
  switch (type) {
    case "text":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          type={type}
          height={height}
          size={size}
          label={label}
          style={style}
        />
      );
    case "password":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          size={size}
          height={height}
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
          size={size}
          height={height}
          type={type}
          label={label}
          style={style}
          formatDate={formatDate}
          max={max}
          min={min}
        />
      );
    case "date-from-to":
      return (
        <CustomDatepicker
          name={name}
          placeholder={placeholder}
          size={size}
          height={height}
          type={type}
          label={label}
          style={style}
          formatDate={formatDate}
          max={max}
        />
      );

    case "number":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          size={size}
          type={type}
          height={height}
          label={label}
          style={style}
        />
      );
    case "email":
      return (
        <CustomInput
          name={name}
          placeholder={placeholder}
          size={size}
          height={height}
          type={type}
          label={label}
        />
      );
    case "textArea":
      return (
        <CustomTextArea
          name={name}
          placeholder={placeholder}
          type={type}
          height={height}
          size={size}
          label={label}
          style={style}
        />
      );
    case "switch":
      return (
        <CustomSwitch
          name={name}
          type={type}
          height={height}
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
