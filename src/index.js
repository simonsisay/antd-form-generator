import React from "react";
import ReactDOM from "react-dom";
import FormGenerator from "./FormGenerator";
import propTypes from "prop-types";
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

const AntdFormGenerator = ({
  onSubmit,
  formSchema,
  submitButton,
  innerClassName,
  outerClassName
}) => (
  <FormGeneratorWrapper formSchema={formSchema}>
    {defaultValues => (
      <FormGenerator
        outerClassName={outerClassName}
        innerClassName={innerClassName}
        formSchema={formSchema}
        defaultValues={defaultValues}
        submitFormAsync={onSubmit}
        renderSubmitButton={handleSubmit => submitButton(handleSubmit)}
      />
    )}
  </FormGeneratorWrapper>
);

AntdFormGenerator.propTypes = {
  innerClassName: propTypes.string,
  outerClassName: propTypes.string,
  formSchema: propTypes.arrayOf(propTypes.object).isRequired,
  onSubmit: propTypes.func,
  submitButton: propTypes.func.isRequired
};

// ReactDOM.render(
//   <AntdFormGenerator
//     formSchema={sampleFormSchema}
//     submitButton={handleSubmit => <button onClick={handleSubmit}>Click</button>}
//     onSubmit={data => console.log(data)}
//   />,
//   document.getElementById("root")
// );

export default AntdFormGenerator;
