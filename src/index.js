import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FormGenerator from "./FormGenerator";
import { formSchema } from "./sampleFormSchema";

const FormGeneratorWrapper = ({ children }) => {
  let defaultValues = {};
  formSchema.forEach(field => {
    if (
      !field.defaultValue &&
      (field.type === "radio" || field.type === "select")
    ) {
      // when a user is filling out the form if their choice is the default value
      // and they make no interaction with the field the default value should be the one submitted.
      defaultValues = { ...defaultValues, [field.name]: field.options[0] };
    }
    if (field.defaultValue) {
      defaultValues = { ...defaultValues, [field.name]: field.defaultValue };
    }
  });
  return <React.Fragment>{children(formSchema, defaultValues)}</React.Fragment>;
};

const submitFormAsync = data => {
  console.log(data);
};

ReactDOM.render(
  <FormGeneratorWrapper>
    {(formSchema, defaultValues) => (
      <FormGenerator
        formSchema={formSchema}
        defaultValues={defaultValues}
        submitFormAsync={submitFormAsync}
        renderSubmitButton={handleSubmit => (
          <button type="submit" onClick={() => handleSubmit()}>
            Submit
          </button>
        )}
      />
    )}
  </FormGeneratorWrapper>,
  document.getElementById("root")
);
