import React, { useEffect } from "react";
import { Form } from "antd";
import useForm from "react-hook-form";
import "antd/dist/antd.css";
import { renderFormFields } from "./renderFormFields";

const Conditional = ({ field, children, unregister, register }) => {
  useEffect(() => {
    register({ name: field.name });
    return () => {
      unregister(field.name);
    };
  }, [register, unregister, field]);
  return children;
};

const FormGenerator = ({
  formSchema,
  defaultValues,
  renderSubmitButton,
  submitFormAsync,
  innerClassName,
  outerClassName
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    formState,
    watch,
    triggerValidation,
    unregister
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

  return (
    <Form className={outerClassName}>
      <div className={innerClassName}>
        {formSchema.map((field, index) => {
          if (field.isConditional === true) {
            const values = watch();
            return values[field.when] === field.is ? (
              <Conditional
                register={register}
                field={field}
                key={field.name}
                unregister={unregister}
              >
                {renderFormFields(field, handleChange, errors)}
              </Conditional>
            ) : null;
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
