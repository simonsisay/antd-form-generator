import React, { useEffect } from "react";
import useForm from "react-hook-form";
import "antd/dist/antd.css";
import { Form, Input, Select, InputNumber, DatePicker, Radio } from "antd";

const { Option } = Select;

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
    console.log(data);
    return submitFormAsync(data);
  };

  return (
    <Form className={containerClassName}>
      <div className={fieldsContainerClassName}>
        {formSchema.map((field, index) => {
          if (field.type === "text") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
              >
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={e => handleChange(field.name, e.target.value)}
                  defaultValue={field.defaultValue}
                  {...field.fieldProps}
                />
              </Form.Item>
            );
          } else if (field.type === "number") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
              >
                <InputNumber
                  name={field.name}
                  max={field.max}
                  min={field.min}
                  placeholder={field.placeholder}
                  onChange={value => handleChange(field.name, value)}
                  defaultValue={field.defaultValue}
                  {...field.fieldProps}
                />
              </Form.Item>
            );
          } else if (field.type === "email") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
                className={field.containerClassName}
              >
                <Input
                  placeholder={field.placeholder}
                  type="email"
                  name={field.name}
                  onChange={e => handleChange(field.name, e.target.value)}
                  defaultValue={field.defaultValue}
                  {...field.fieldProps}
                />
              </Form.Item>
            );
          } else if (field.type === "money") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
                className={field.containerClassName}
              >
                <InputNumber
                  name={field.name}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={value => handleChange(field.name, value)}
                  defaultValue={field.defaultValue}
                  {...field.fieldProps}
                />
              </Form.Item>
            );
          } else if (field.type === "percent") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
                className={field.containerClassName}
              >
                <InputNumber
                  name={field.name}
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => value.replace("%", "")}
                  onChange={value => handleChange(field.name, value)}
                  defaultValue={field.defaultValue}
                  {...field.fieldProps}
                />
              </Form.Item>
            );
          } else if (field.type === "select") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
                className={field.containerClassName}
              >
                <Select
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={value => handleChange(field.name, value)}
                  defaultValue={
                    field.defaultValue ? field.defaultValue : field.options[0]
                  }
                  {...field.groupProps}
                >
                  {field.options.map((item, index) => (
                    <Option {...field.fieldProps} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            );
          } else if (field.type === "radio") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={
                  errors[field.name] &&
                  field.validation &&
                  field.validation.errorMessage
                }
                className={field.containerClassName}
              >
                <Radio.Group
                  name={field.name}
                  onChange={event => {
                    handleChange(field.name, event.target.value);
                  }}
                  defaultValue={
                    field.defaultValue ? field.defaultValue : field.options[0]
                  }
                  {...field.groupProps}
                >
                  {field.options.map((option, index) => {
                    if (
                      field.groupProps &&
                      field.groupProps.buttonStyle === "solid"
                    ) {
                      return (
                        <Radio.Button
                          key={index}
                          value={option}
                          {...field.fieldProps}
                        >
                          {option}
                        </Radio.Button>
                      );
                    } else if (
                      field.groupProps &&
                      field.groupProps.buttonStyle === "outline"
                    ) {
                      return (
                        <Radio.Button
                          key={index}
                          value={option}
                          {...field.fieldProps}
                        >
                          {option}
                        </Radio.Button>
                      );
                    }
                    return (
                      <Radio key={index} value={option} {...field.fieldProps}>
                        {option}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            );
          } else if (field.type === "date") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={
                  errors[field.name] &&
                  field.validation &&
                  field.validation.errorMessage
                }
                className={field.containerClassName}
              >
                <DatePicker
                  defaultValue={field.defaultValue}
                  onChange={date => handleChange(field.name, date._d)}
                  {...field.fieldProps}
                />
              </Form.Item>
            );
          }
          return null;
        })}
      </div>
      {renderSubmitButton(handleSubmit(submitForm))}
    </Form>
  );
};

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
