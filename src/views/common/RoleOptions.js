import { Field } from "formik";
import React from "react";
import { FormikAutocompleteComponent } from "../../utilities/formutilities";

const RoleOptions = ({ options, focus, isMandatory, name , setValue }) => {
  const EmployeeRole = [
    {
      value: "employee",
      label: "employee",
    },
    {
      value: "subAdmin",
      label: "subAdmin",
    },
  ];

  const getSelectedValue = (value) => {
    if (setValue) setValue(value);
     console.log("value====>", value);
  };

  return (
    <Field
      name={"employeeRole"}
      focus={focus}
      isMandatory={isMandatory}
      component={FormikAutocompleteComponent}
      userProps={{
        options: EmployeeRole,
        getValue: getSelectedValue,
      }}
    >
      {""}
    </Field>
  );
};

export default RoleOptions;
