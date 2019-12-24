function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Form, Input, Select, InputNumber, DatePicker, Radio, Checkbox } from "antd";
const {
  Option
} = Select; //  types: text, number,textarea, email, money, percent, select, datepicker, radio, custom

const errorStyle = {
  margin: 0,
  padding: 0,
  paddingBottom: "2px",
  border: "1px solid red",
  width: "fit-content",
  height: "fit-content"
};
export const renderFormFields = (field, handleChange, errors, values) => {
  if (field.type === "text") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage
    }, React.createElement(Input, _extends({
      name: field.name,
      placeholder: field.placeholder,
      onChange: e => handleChange(field.name, e.target.value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "password") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage
    }, React.createElement(Input.Password, _extends({
      name: field.name,
      placeholder: field.placeholder,
      onChange: e => handleChange(field.name, e.target.value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "textarea") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage
    }, React.createElement(Input.TextArea, _extends({
      name: field.name,
      placeholder: field.placeholder,
      onChange: e => handleChange(field.name, e.target.value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "number") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage
    }, React.createElement(InputNumber, _extends({
      name: field.name,
      max: field.max,
      min: field.min,
      placeholder: field.placeholder,
      onChange: value => handleChange(field.name, value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "email") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(Input, _extends({
      placeholder: field.placeholder,
      type: "email",
      name: field.name,
      onChange: e => handleChange(field.name, e.target.value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "money") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(InputNumber, _extends({
      name: field.name,
      formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: value => value.replace(/\$\s?|(,*)/g, ""),
      onChange: value => handleChange(field.name, value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "percent") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(InputNumber, _extends({
      name: field.name,
      min: 0,
      max: 100,
      formatter: value => `${value}%`,
      parser: value => value.replace("%", ""),
      onChange: value => handleChange(field.name, value),
      value: values[field.name]
    }, field.fieldProps)));
  } else if (field.type === "select") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(Select, _extends({
      name: field.name,
      placeholder: field.placeholder,
      onChange: value => handleChange(field.name, value),
      value: values[field.name] ? values[field.name] : field.options[0]
    }, field.fieldProps, field.groupProps), field.options.map((option, index) => React.createElement(Option, _extends({}, field.fieldProps, {
      value: option,
      key: index
    }), option))));
  } else if (field.type === "radio") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(Radio.Group, _extends({
      name: field.name,
      onChange: event => {
        handleChange(field.name, event.target.value);
      },
      value: values[field.name]
    }, field.groupProps), field.options.map((option, index) => {
      if (field.groupProps && field.groupProps.buttonStyle === "solid") {
        return React.createElement(Radio.Button, _extends({
          key: index,
          value: option
        }, field.fieldProps), option);
      } else if (field.groupProps && field.groupProps.buttonStyle === "outline") {
        return React.createElement(Radio.Button, _extends({
          key: index,
          value: option
        }, field.fieldProps), option);
      }

      return React.createElement(Radio, _extends({
        key: index,
        value: option
      }, field.fieldProps), option);
    })));
  } else if (field.type === "checkbox") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(Checkbox, _extends({
      name: field.name,
      checked: values[field.name],
      onChange: e => handleChange(field.name, e.target.checked)
    }, field.fieldProps), field.checkboxText));
  } else if (field.type === "date") {
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement(DatePicker, _extends({
      value: values[field.name] ? values[field.name] : field.options[0],
      onChange: date => handleChange(field.name, date._d)
    }, field.fieldProps)));
  } else if (field.type === "custom") {
    const Component = field.component;
    return React.createElement(Form.Item, {
      label: field.label,
      validateStatus: errors[field.name] ? "error" : "",
      help: errors[field.name] && field.validation && field.validation.errorMessage,
      className: field.containerClassName
    }, React.createElement("div", {
      style: errors[field.name] && field.validation ? errorStyle : undefined
    }, React.createElement(Component, {
      onChange: value => handleChange(field.name, value),
      name: field.name,
      value: values[field.name]
    })));
  }

  return null;
};