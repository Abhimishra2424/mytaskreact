import React from "react";
import { TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

export const FormikTextFieldComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  console.log(field, "field");
  return (
    <div>
      <TextField {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

export const FormikAutocompleteComponent = ({
  name,
  options,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(field.name, value);
  };

  return (
    <TextField
      field
      select
      variant="outlined"
      fullWidth
      onChange={handleChange}
      margin="normal"
    >
      {options.map((val, index) => {
        return (
          <MenuItem key={index} value={val.value}>
            {val.label}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <div>
      <input type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};
