import moment from "moment";

const inputStyles = {
  width: 334,
  height: 40
};

const radioStyle = {
  textAlign: "center",
  borderColor: "#51BAF7"
};

const employmentDetailsForm = [
  {
    type: "money",
    label: "Income amount",
    name: "incomeAmount",
    fieldProps: { style: inputStyles },
    validation: {
      required: true,
      errorMessage: "Please make sure you add a valid amount"
    }
  },
  {
    type: "radio",
    name: "frequency",
    label: "Income frequency",
    options: ["Weekly", "Fortnightly", "Monthly", "Annually"],
    validation: {
      required: true,
      errorMessage: "Please make sure your input is correct"
    },
    groupProps: { buttonStyle: "solid", size: "large" },

    fieldProps: {
      style: radioStyle
    }
  },
  {
    type: "radio",
    name: "employmentType",
    options: ["Permanent", "Casual", "Contract"],
    label: "Employment Type",

    groupProps: { buttonStyle: "solid", size: "large" },

    fieldProps: {
      disabled: false,
      style: radioStyle
    },
    validation: {
      required: true,
      errorMessage: "Invalid option added"
    }
  },
  {
    type: "radio",
    name: "tax",
    label: "Is the income amount stated before or after tax?",
    options: ["Before tax", "After tax"],
    groupProps: { buttonStyle: "solid", size: "large" },

    fieldProps: {
      disabled: false,
      style: radioStyle
    },

    validation: {
      required: true,
      errorMessage: "Invalid option added"
    }
  },
  {
    type: "radio",
    name: "employmentCategory",
    label: "Employment Category",
    options: ["Full time", "Part time"],
    groupProps: { buttonStyle: "solid", size: "large" },

    fieldProps: {
      disabled: false,
      style: radioStyle
    },

    validation: {
      required: true,
      errorMessage: "Invalid option added"
    }
  },
  {
    type: "date",
    label: "Start Date",
    name: "employmentFrom",
    defaultValue: moment(new Date(), "YYYY/MM/DD"),
    fieldProps: { style: inputStyles },

    validation: {
      required: true,
      errorMessage: "Please make sure you added a valid date"
    }
  }
];

const getConditionalForm = (isConditional, when, is) => {
  let form = [];
  employmentDetailsForm.forEach(item => {
    form = [...form, { ...item, isConditional, is, when }];
  });
  return form;
};

export const sampleFormSchema = [
  {
    type: "money",
    label: "Cash Savings",
    name: "savings",
    fieldProps: { style: inputStyles },

    validation: {
      required: true,
      errorMessage: "Please make sure you added a valid amount"
    }
  },
  {
    type: "radio",
    label: "Income Type",
    options: ["Employed", "Self Employed", "Other"],
    name: "employment",

    groupProps: { buttonStyle: "solid", size: "large" },

    fieldProps: {
      disabled: false,
      style: radioStyle
    },
    validation: {
      required: true,
      errorMessage: "Invalid option added"
    }
  },

  ...getConditionalForm(true, "employment", "Employed"),
  ...getConditionalForm(true, "employment", "Self Employed"),
  ...getConditionalForm(true, "employment", "Other").slice(0, 2)
];
