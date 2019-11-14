import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FormGenerator from "./FormGenerator";
import { formSchema } from "./testFormSchema";

const FormGeneratorWrapper = ({ children }) => {
  let defaultValues = {};
  formSchema.forEach(field => {
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
