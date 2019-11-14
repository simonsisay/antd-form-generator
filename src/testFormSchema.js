import moment from "moment";

export const formSchema = [
  {
    type: "text",
    name: "firstName",
    defaultValue: "Simon",
    required: true,
    placeholder: "First name",
    containerClassName: null,
    label: "First name",
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
    containerClassName: null,
    label: "Age",
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
    containerClassName: null,
    label: "Profit",
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
    containerClassName: null,
    label: "Salary",
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
    containerClassName: null,
    label: "Email",
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
    containerClassName: "input-field",
    label: "Gender",
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
    containerClassName: "input-field",
    label: "Gender",
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    },
    groupProps: { buttonStyle: "outline", size: "large" },
    fieldProps: { disabled: false }
  },
  {
    type: "date",
    label: "Birthday",
    name: "birthDate",
    defaultValue: moment(new Date(), "YYYY/MM/DD"),
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  }
];

export const defaultValues = {
  firstName: "Abebe",
  age: 20
};
