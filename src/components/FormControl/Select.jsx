import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

const Select = (props) => {
  const { label, name, options, setValue, ...rest } = props;
  return (
    <div className={`mb-3`}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className="form-select"
        onClick={(e) => setValue(e.target.value)}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
