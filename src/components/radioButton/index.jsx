import React from "react";
import { Field, ErrorMessage } from "formik";

function RadioButtons(props) {
  const { label, name, options, handleRadioClick, ...rest } = props;
  return (
    <section>
      <div className="form-control">
        <label>{label}</label>
        <Field name={name} {...rest}>
          {({ field }) => {
            return options?.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    onClick={() => handleRadioClick(option)}
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <label htmlFor={option.value}>{option.key}</label>
                </React.Fragment>
              );
            });
          }}
        </Field>
        <ErrorMessage name={name} />
      </div>
    </section>
  );
}

export { RadioButtons };
