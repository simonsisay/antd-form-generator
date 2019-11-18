import React, { useEffect } from "react";
import { Form } from "antd";
import useForm from "react-hook-form";
import "antd/dist/antd.css";
import { renderFormFields } from "./renderFormFields";

//   types: text, number, email, money, percent, select, datepicker, radio
//  should populate default ant design props.

const FormGenerator = ({
  formSchema,
  defaultValues,
  renderSubmitButton,
  submitFormAsync,
  fieldsContainerClassName,
  containerClassName
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState,
    watch,
    triggerValidation
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    submitFocusError: true,
    defaultValues: { ...defaultValues }
  });

  useEffect(() => {
    formSchema.forEach(field => {
      register({ name: field.name }, { ...field.validation });
    });
  }, [register, formSchema]);

  const handleChange = async (name, value) => {
    await setValue(name, value);
    if (formState.submitCount !== 0) {
      await triggerValidation();
    }
  };

  const submitForm = data => {
    return submitFormAsync(data);
  };

  const Conditional = ({ field, children }) => {
    return watch()[field.when] === field.is ? children : null;
  };

  return (
    <Form className={containerClassName}>
      <div className={fieldsContainerClassName}>
        {formSchema.map((field, index) => {
          if (field.conditional === true) {
            return (
              <Conditional field={field} key={index}>
                {renderFormFields(field, handleChange, errors)}
              </Conditional>
            );
          }
          return (
            <React.Fragment key={index}>
              {renderFormFields(field, handleChange, errors)}
            </React.Fragment>
          );
        })}
      </div>
      {renderSubmitButton(handleSubmit(submitForm))}
    </Form>
  );
};

export default FormGenerator;
