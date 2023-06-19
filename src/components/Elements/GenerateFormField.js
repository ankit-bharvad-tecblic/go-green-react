import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";

function generateFormField(obj) {
  const { name, placeholder, type, label, style } = obj;
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
    case "checkbox":
      return '<input type="checkbox">';
    case "select":
      return (
        <CustomSelector
          name={name}
          placeholder={placeholder}
          type={type}
          label={label}
          style={style}
          options={obj.options}
        />
      );
    default:
      return "";
  }
}

export default generateFormField;
