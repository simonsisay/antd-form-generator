"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHookForm = _interopRequireDefault(require("react-hook-form"));

var _antd = require("antd");

require("antd/dist/antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Option = _antd.Select.Option; //   types: text, number, email, money, percent, select, datepicker, radio
//  should populate default ant design props.

var FormGenerator = function FormGenerator(_ref) {
  var formSchema = _ref.formSchema,
      defaultValues = _ref.defaultValues,
      renderSubmitButton = _ref.renderSubmitButton,
      submitFormAsync = _ref.submitFormAsync;

  var _useForm = (0, _reactHookForm.default)({
    mode: "onSubmit",
    reValidateMode: "onChange",
    submitFocusError: true,
    defaultValues: _objectSpread({}, defaultValues)
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      setValue = _useForm.setValue,
      errors = _useForm.errors,
      formState = _useForm.formState,
      triggerValidation = _useForm.triggerValidation;

  (0, _react.useEffect)(function () {
    formSchema.forEach(function (field) {
      register({
        name: field.name
      }, _objectSpread({}, field.validation));
    });
  }, [register, formSchema]);

  var handleChange = function handleChange(name, value) {
    return regeneratorRuntime.async(function handleChange$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(setValue(name, value));

          case 2:
            if (!(formState.submitCount !== 0)) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return regeneratorRuntime.awrap(triggerValidation());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var submitForm = function submitForm(data) {
    console.log(data);
    return submitFormAsync(data);
  };

  return _react.default.createElement(_antd.Form, null, _react.default.createElement("div", {
    className: "form-container"
  }, formSchema.map(function (field, index) {
    if (field.type === "text") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.Input, {
        name: field.name,
        placeholder: field.placeholder,
        onChange: function onChange(e) {
          return handleChange(field.name, e.target.value);
        },
        defaultValue: field.defaultValue
      }));
    } else if (field.type === "number") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.InputNumber, {
        name: field.name,
        max: field.max,
        min: field.min,
        placeholder: field.placeholder,
        onChange: function onChange(value) {
          return handleChange(field.name, value);
        },
        defaultValue: field.defaultValue
      }));
    } else if (field.type === "email") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.Input, {
        placeholder: field.placeholder,
        type: "email",
        name: field.name,
        onChange: function onChange(e) {
          return handleChange(field.name, e.target.value);
        },
        defaultValue: field.defaultValue
      }));
    } else if (field.type === "money") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.InputNumber, {
        name: field.name,
        formatter: function formatter(value) {
          return "$ ".concat(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        parser: function parser(value) {
          return value.replace(/\$\s?|(,*)/g, "");
        },
        onChange: function onChange(value) {
          return handleChange(field.name, value);
        },
        defaultValue: field.defaultValue
      }));
    } else if (field.type === "percent") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.InputNumber, {
        name: field.name,
        min: 0,
        max: 100,
        formatter: function formatter(value) {
          return "".concat(value, "%");
        },
        parser: function parser(value) {
          return value.replace("%", "");
        },
        onChange: function onChange(value) {
          return handleChange(field.name, value);
        },
        defaultValue: field.defaultValue
      }));
    } else if (field.type === "select") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.Select, {
        name: field.name,
        placeholder: field.placeholder,
        onChange: function onChange(value) {
          return handleChange(field.name, value);
        },
        defaultValue: field.defaultValue ? field.defaultValue : field.options[0]
      }, field.options.map(function (item, index) {
        return _react.default.createElement(Option, {
          key: index
        }, item);
      })));
    } else if (field.type === "radio") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.Radio.Group, _extends({
        name: field.name,
        onChange: function onChange(event) {
          handleChange(field.name, event.target.value);
        },
        defaultValue: field.defaultValue ? field.defaultValue : field.options[0]
      }, field.groupProps), field.options.map(function (option, index) {
        if (field.groupProps && field.groupProps.buttonStyle === "solid") {
          return _react.default.createElement(_antd.Radio.Button, {
            key: index,
            value: option
          }, option);
        } else if (field.groupProps && field.groupProps.buttonStyle === "outline") {
          return _react.default.createElement(_antd.Radio.Button, {
            key: index,
            value: option
          }, option);
        }

        return _react.default.createElement(_antd.Radio, _extends({
          key: index,
          value: option
        }, field.fieldProps), option);
      })));
    } else if (field.type === "date") {
      return _react.default.createElement(_antd.Form.Item, {
        key: index,
        label: field.label,
        validateStatus: errors[field.name] ? "error" : "",
        help: errors[field.name] && field.validation && field.validation.errorMessage,
        className: field.containerClassName
      }, _react.default.createElement(_antd.DatePicker, {
        defaultValue: field.defaultValue,
        onChange: function onChange(date) {
          return handleChange(field.name, date._d);
        }
      }));
    }

    return null;
  })), renderSubmitButton(handleSubmit(submitForm)));
};

var FormGeneratorWrapper = function FormGeneratorWrapper(_ref2) {
  var children = _ref2.children,
      formSchema = _ref2.formSchema;
  var defaultValues = {};
  formSchema.forEach(function (field) {
    if (!field.defaultValue && (field.type === "radio" || field.type === "select")) {
      // when a user is filling out the form if their choice is the default value
      // and they make no interaction with the field the default value should be the one submitted.
      defaultValues = _objectSpread({}, defaultValues, _defineProperty({}, field.name, field.options[0]));
    }

    if (field.defaultValue) {
      defaultValues = _objectSpread({}, defaultValues, _defineProperty({}, field.name, field.defaultValue));
    }
  });
  return _react.default.createElement(_react.default.Fragment, null, children(defaultValues));
};

var AlamaForm = function AlamaForm(_ref3) {
  var submitFormAsync = _ref3.submitFormAsync,
      formSchema = _ref3.formSchema,
      _renderSubmitButton = _ref3.renderSubmitButton;
  return _react.default.createElement(FormGeneratorWrapper, {
    formSchema: formSchema
  }, function (defaultValues) {
    return _react.default.createElement(FormGenerator, {
      formSchema: formSchema,
      defaultValues: defaultValues,
      submitFormAsync: submitFormAsync,
      renderSubmitButton: function renderSubmitButton(handleSubmit) {
        return _renderSubmitButton(handleSubmit);
      }
    });
  });
};

var _default = AlamaForm;
exports.default = _default;

//# sourceMappingURL=index.js.map