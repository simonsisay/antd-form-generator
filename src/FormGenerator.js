import React, { useEffect } from "react";
import useForm from "react-hook-form";
import { Form, Input, Select, InputNumber, DatePicker, Radio } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

// types: text, number, email, money, percent, select, datepicker, radio
// should populate default ant design props.

const FormGenerator = ({
  formSchema,
  defaultValues,
  renderSubmitButton,
  submitFormAsync
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
    return submitFormAsync(data);
  };

  return (
    <Form>
      <div className="form-container">
        {formSchema.map((field, index) => {
          if (field.type === "text") {
            return (
              <Form.Item
                key={index}
                label={field.label}
                validateStatus={errors[field.name] ? "error" : ""}
                help={errors[field.name] && field.validation.errorMessage}
                className={field.containerClassName}
              >
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={e => handleChange(field.name, e.target.value)}
                  defaultValue={field.defaultValue}
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
                className={field.containerClassName}
              >
                <InputNumber
                  name={field.name}
                  max={field.max}
                  min={field.min}
                  placeholder={field.placeholder}
                  onChange={value => handleChange(field.name, value)}
                  defaultValue={field.defaultValue}
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
                  defaultValue={field.defaultValue}
                >
                  {field.options.map((item, index) => (
                    <Option key={index}>{item}</Option>
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
                        <Radio.Button key={index} value={option}>
                          {option}
                        </Radio.Button>
                      );
                    } else if (
                      field.groupProps &&
                      field.groupProps.buttonStyle === "outline"
                    ) {
                      return (
                        <Radio.Button key={index} value={option}>
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

export default FormGenerator;
