import React from "react";
import { Form, Input, Select, InputNumber, DatePicker, Radio } from "antd";
const { Option } = Select;

//  types: text, number,textarea, email, money, percent, select, datepicker, radio, custom

const errorStyle = {
  margin: 0,
  padding: 0,
  paddingBottom: "2px",
  border: "1px solid red",
  width: "fit-content",
  height: "fit-content"
};

export const renderFormFields = (field, handleChange, errors) => {
  if (field.type === "text") {
    return (
      <Form.Item
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
  } else if (field.type === "passord") {
    return (
      <Form.Item
        label={field.label}
        validateStatus={errors[field.name] ? "error" : ""}
        help={errors[field.name] && field.validation.errorMessage}
      >
        <Input.Password
          name={field.name}
          placeholder={field.placeholder}
          onChange={e => handleChange(field.name, e.target.value)}
          defaultValue={field.defaultValue}
          {...field.fieldProps}
        />
      </Form.Item>
    );
  } else if (field.type === "textarea") {
    return (
      <Form.Item
        label={field.label}
        validateStatus={errors[field.name] ? "error" : ""}
        help={errors[field.name] && field.validation.errorMessage}
      >
        <Input.TextArea
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
          {...field.fieldProps}
          {...field.groupProps}
        >
          {field.options.map((option, index) => (
            <Option {...field.fieldProps} value={option} key={index}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  } else if (field.type === "radio") {
    return (
      <Form.Item
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
            if (field.groupProps && field.groupProps.buttonStyle === "solid") {
              return (
                <Radio.Button key={index} value={option} {...field.fieldProps}>
                  {option}
                </Radio.Button>
              );
            } else if (
              field.groupProps &&
              field.groupProps.buttonStyle === "outline"
            ) {
              return (
                <Radio.Button key={index} value={option} {...field.fieldProps}>
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
  } else if (field.type === "custom") {
    const Component = field.component;

    return (
      <Form.Item
        label={field.label}
        validateStatus={errors[field.name] ? "error" : ""}
        help={
          errors[field.name] &&
          field.validation &&
          field.validation.errorMessage
        }
        className={field.containerClassName}
      >
        <div
          style={
            errors[field.name] && field.validation ? errorStyle : undefined
          }
        >
          <Component
            onChange={value => handleChange(field.name, value)}
            name={field.name}
            value={field.defaultValue}
          />
        </div>
      </Form.Item>
    );
  }
  return null;
};
