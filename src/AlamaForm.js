import React from "react";
import FormGenerator from "./FormGenerator";

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

export default AlamaForm;
