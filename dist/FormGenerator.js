import React, { useEffect } from "react";
import { Form } from "antd";
import useForm from "react-hook-form";
import "antd/dist/antd.css";
import { renderFormFields } from "./renderFormFields";

const Conditional = ({
  field,
  children,
  unregister,
  register
}) => {
  useEffect(() => {
    register({
      name: field.name
    }, { ...field.validation
    });
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
    defaultValues: { ...defaultValues
    }
  });
  useEffect(() => {
    formSchema.forEach(field => {
      if (!field.isConditional) {
        register({
          name: field.name
        }, { ...field.validation
        });
      }
    });
  }, [register, formSchema, errors]);
  useEffect(() => {
    Object.keys(defaultValues).forEach(key => {
      setValue(key, defaultValues[key]);
    });
  }, [defaultValues, setValue]);

  const handleChange = async (name, value) => {
    await setValue(name, value);

    if (formState.submitCount !== 0) {
      await triggerValidation();
    }
  };

  const submitForm = async data => {
    return submitFormAsync(data);
  };

  return React.createElement(Form, {
    className: outerClassName
  }, React.createElement("div", {
    className: innerClassName
  }, formSchema.map((field, index) => {
    const values = watch();

    if (field.isConditional === true) {
      return values[field.when] === field.is ? React.createElement(Conditional, {
        register: register,
        field: field,
        key: field.name,
        unregister: unregister
      }, renderFormFields(field, handleChange, errors, values)) : null;
    }

    return React.createElement(React.Fragment, {
      key: index
    }, renderFormFields(field, handleChange, errors, values));
  })), renderSubmitButton(handleSubmit(submitForm), errors));
};

export default FormGenerator;