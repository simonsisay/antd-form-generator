import React from "react";
import ReactDOM from "react-dom";
import FormGenerator from "./FormGenerator";
import { sampleFormSchema } from "./sampleFormSchema";
import propTypes from "prop-types";

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
  renderFooter,
  innerClassName,
  outerClassName
}) => {
  return (
    <FormGeneratorWrapper formSchema={formSchema}>
      {defaultValues => (
        <FormGenerator
          outerClassName={outerClassName}
          innerClassName={innerClassName}
          formSchema={formSchema}
          defaultValues={defaultValues}
          submitFormAsync={onSubmit}
          renderSubmitButton={handleSubmit => renderFooter(handleSubmit)}
        />
      )}
    </FormGeneratorWrapper>
  );
};

AntdFormGenerator.propTypes = {
  innerClassName: propTypes.string,
  outerClassName: propTypes.string,
  formSchema: propTypes.arrayOf(propTypes.object).isRequired,
  onSubmit: propTypes.func,
  renderFooter: propTypes.func.isRequired
};

ReactDOM.render(
  <AntdFormGenerator
    formSchema={sampleFormSchema}
    renderFooter={handleSubmit => <button onClick={handleSubmit}>Click</button>}
    onSubmit={data => console.log(data)}
  />,
  document.getElementById("root")
);

export default AntdFormGenerator;
