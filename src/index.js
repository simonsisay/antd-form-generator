import React from "react";
import ReactDOM from "react-dom";
import FormGenerator from "./FormGenerator";
import "./index.css";
import "antd/dist/antd.css";
import { sampleFormSchema } from "./sampleFormSchema";

const FormGeneratorWrapper = ({ children, formSchema }) => {
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
  return <React.Fragment>{children(defaultValues)}</React.Fragment>;
};

const AlamaForm = ({
  submitFormAsync,
  formSchema,
  renderSubmitButton,
  fieldsContainerClassName,
  containerClassName
}) => (
  <FormGeneratorWrapper formSchema={formSchema}>
    {defaultValues => (
      <FormGenerator
        fieldsContainerClassName={fieldsContainerClassName}
        containerClassName={containerClassName}
        formSchema={formSchema}
        defaultValues={defaultValues}
        submitFormAsync={submitFormAsync}
        renderSubmitButton={handleSubmit => renderSubmitButton(handleSubmit)}
      />
    )}
  </FormGeneratorWrapper>
);

ReactDOM.render(
  <div className="forms">
    <AlamaForm
      formSchema={sampleFormSchema}
      containerClassName={"form-container"}
      fieldsContainerClassName={"fields"}
      submitFormAsync={data => {
        console.log(data);
      }}
      renderSubmitButton={handleSubmit => (
        <button className="button" onClick={() => handleSubmit()}>
          Submit
        </button>
      )}
    />
  </div>,
  document.getElementById("root")
);

export default AlamaForm;
