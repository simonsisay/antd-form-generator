import moment from "moment";

export const sampleFormSchema = [
  {
    type: "text",
    name: "firstName",
    defaultValue: "Simon",
    required: true,
    placeholder: "First name",
    label: "First name",
    fieldProps: { disabled: false },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct",
      validate: value => value.toString().startsWith("A")
    }
  },
  {
    type: "number",
    name: "age",
    required: true,
    defaultValue: 21,
    placeholder: "Age",
    label: "Age",
    fieldProps: { disabled: false, style: { width: 300 } },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "percent",
    name: "profit",
    defaultValue: 20,
    required: true,
    placeholder: "Age",
    label: "Profit",
    fieldProps: { disabled: false, style: { width: 300 } },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "money",
    name: "salary",
    defaultValue: 2000,
    required: true,
    placeholder: "Age",
    label: "Salary",
    fieldProps: { disabled: false, style: { width: 300 } },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "email",
    name: "email",
    required: true,
    placeholder: "Email",
    label: "Email",
    fieldProps: { disabled: false },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct",
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
  },
  {
    type: "select",
    name: "sex",
    options: ["Male", "Female"],
    placeholder: "Gender",
    required: true,
    defaultValue: "Female",
    label: "Gender",
    fieldProps: { disabled: false },
    groupProps: { allowClear: true, size: "large" },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "radio",
    name: "gender",
    options: ["Male", "Female"],
    defaultValue: "Female",
    placeholder: "Gender",
    required: true,
    label: "Gender",
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    },
    groupProps: { buttonStyle: "outline", size: "large" },

    fieldProps: {
      disabled: false,
      style: { width: 150, textAlign: "center" }
    }
  },
  {
    type: "date",
    label: "Birthday",
    name: "birthDate",
    defaultValue: moment(new Date(), "YYYY/MM/DD"),
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    },
    fieldProps: { disabled: false, style: { width: 300 } }
  }
];
