import CustomNumberInput from "./customNumberInput";
import moment from "moment";

const inputStyles = {
  width: 334,
  height: 48
};

export const sampleFormSchema = [
  {
    type: "password",
    name: "firstName",
    required: true,
    placeholder: "Password",
    label: "First name",
    fieldProps: { disabled: false, style: inputStyles },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct",
      validate: value => value.toString().startsWith("A")
    }
  }
];

export const sampleFormSchema = [
  {
    type: "text",
    name: "firstName",
    defaultValue: "Simon",
    required: true,
    placeholder: "First name",
    label: "First name",
    fieldProps: { disabled: false, style: inputStyles },
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
    type: "textarea",
    name: "details",
    required: true,
    defaultValue: 21,
    placeholder: "details",
    label: "Details",
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
    name: "expense",
    defaultValue: 2000,
    required: true,
    placeholder: "Age",
    label: "Expense",
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
  },
  {
    type: "select",
    name: "employment",
    options: ["Employed", "Self Employed", "Unemployed"],
    required: true,
    label: "Employment",
    fieldProps: { disabled: false },
    groupProps: { allowClear: true, size: "large" },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "money",
    name: "income",
    isConditional: true,
    when: "employment",
    is: "Employed",
    defaultValue: 0,
    required: true,
    placeholder: "Age",
    label: "Income",
    fieldProps: { disabled: false, style: { width: 300 } },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "text",
    name: "Company",
    isConditional: true,
    when: "employment",
    is: "Employed",
    placeholder: "Age",
    label: "Company",
    fieldProps: { disabled: false, style: { width: 300 } },
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    }
  },
  {
    type: "custom",
    name: "phone",
    label: "Phone",
    component: CustomNumberInput,
    validation: {
      required: true,
      errorMessage: "Please make sure you entered a valid phone number",
      validate: value => value.length > 10
    }
  }
];
