import React, { useEffect } from "react";
import { Form } from "antd";
import useForm from "react-hook-form";
import _ from "lodash";
import "antd/dist/antd.css";
import { renderFormFields } from "./renderFormFields";

const Conditional = ({
  field,
  children,
  unregister,
  register,
  values
}) => {
  useEffect(() => {
    register({
      name: field.name
    }, { ...field.validation
    });
    return () => {
      field.conditions.forEach(condition => {
        unregister(field[condition.when]);
      });
    };
  }, [register, unregister, field, values]);
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
  const formValues = watch();
  let values = formValues;
  useEffect(() => {// console.log(values);
  }, [values]);
  useEffect(() => {
    formSchema.forEach(field => {
      if (!field.isConditional) {
        register({
          name: field.name
        }, { ...field.validation
        });
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, errors, values]); // useEffect(() => {
  //   Object.keys(defaultValues).forEach(key => {
  //     setValue(key, defaultValues[key]);
  //   });
  // }, [defaultValues, setValue]);

  const handleChange = async (name, value) => {
    await setValue(name, value);
    values = { ...values,
      [name]: value
    };

    if (formState.submitCount !== 0) {
      await triggerValidation();
    }
  };

  const submitForm = async data => {
    return submitFormAsync(data);
  };

  const checkCondition = field => {
    let shouldRender = false;
    field.conditions.forEach(condition => {
      if (values[condition.when] === condition.is) {
        shouldRender = true;
      } else {
        return false;
      }
    });
    return shouldRender;
  };

  const recoverConditionalData = field => {
    if (field.unregister) {
      field.unregister.forEach(unreg => {
        if (field.unreg && values[field.name] === field.unreg.isNot) if (!values[unreg.register.name]) {
          values = { ...values,
            [unreg.register.name]: unreg.register.value
          };
        }
      });
    }
  };

  const unregisterFields = field => {
    if (field.unregister) {
      field.unregister.forEach(unreg => {
        if (values[field.name] !== unreg.isNot) {
          unreg.fieldsToRemove.forEach(name => {
            unregister(name);
            values = _.omit(values, name);
          });
        }
      });
    }

    console.log(values);
  };

  return React.createElement(Form, {
    className: outerClassName
  }, React.createElement("div", {
    className: innerClassName
  }, formSchema.map((field, index) => {
    if (field.isConditional === true) {
      const shouldRender = checkCondition(field);
      return shouldRender ? React.createElement(Conditional, {
        register: register,
        field: field,
        unregister: unregister,
        key: index,
        values: values
      }, renderFormFields(field, handleChange, errors, values)) : null;
    }

    unregisterFields(field);
    recoverConditionalData(field);
    return React.createElement(React.Fragment, {
      key: index
    }, renderFormFields(field, handleChange, errors, values));
  })), renderSubmitButton(handleSubmit(submitForm), errors));
};

export default FormGenerator;