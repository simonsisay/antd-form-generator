const inputStyles = {
  width: 334,
  height: 40
};
const radioStyle = {
  textAlign: "center",
  borderColor: "#51BAF7"
};

const getConditionalForm = (array, isConditional, conditions) => {
  let form = [];
  array.forEach(item => {
    form = [...form, { ...item,
      isConditional,
      conditions
    }];
  });
  return form;
};

const loanForms = [{
  type: "number",
  name: "approximateValue",
  label: "Approximate property value",
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Enter a number for this field."
  }
}, {
  type: "number",
  name: "purchasePostcode",
  label: "What is the postcode of the property you intend to buy?",
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Enter a number for this field."
  }
}, {
  type: "radio",
  name: "interestPreference",
  label: "Interest rate preference",
  options: ["Fixed", "Variable", "No preference"],
  groupProps: {
    buttonStyle: "solid",
    size: "large"
  },
  fieldProps: {
    disabled: false,
    style: radioStyle
  },
  validation: {
    required: true
  }
}, {
  type: "textarea",
  name: "additionalRequirements",
  label: "Additional requirements",
  fieldProps: {
    style: { ...inputStyles,
      height: 100
    }
  },
  validation: {
    required: false
  }
}];
export const sampleFormSchema = [{
  type: "select",
  label: "Loan type",
  name: "loanType",
  options: ["Home Loan", "Car Loan", "Personal Loan"],
  unregister: {
    isNot: "Home Loan",
    remove: "homePurpose"
  },
  register: {
    name: "homePurpose",
    value: "Buying next home"
  },
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Invalid option added"
  }
}, {
  type: "select",
  name: "homePurpose",
  label: "Loan Purpose",
  isConditional: true,
  conditions: [{
    when: "loanType",
    is: "Home Loan"
  }],
  fieldProps: {
    style: inputStyles
  },
  options: ["Buying next home", "Refinance", "Investing", "First home buyer", "Construction"]
}, ...getConditionalForm(loanForms, true, [{
  when: "homePurpose",
  is: "Buying next home"
}]), ...getConditionalForm(loanForms, true, [{
  when: "homePurpose",
  is: "Investing"
}]), ...getConditionalForm(loanForms, true, [{
  when: "homePurpose",
  is: "First home buyer"
}]), ...getConditionalForm(loanForms, true, [{
  when: "homePurpose",
  is: "Construction"
}]), {
  type: "percent",
  name: "currentInterestRate",
  label: "What interest rate are you paying currently?*",
  isConditional: true,
  conditions: [{
    when: "homePurpose",
    is: "Refinance"
  }],
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Please add your current loan balance"
  }
}, {
  type: "select",
  name: "ageOfCar",
  label: "Age of car",
  isConditional: true,
  conditions: [{
    when: "loanType",
    is: "Car Loan"
  }],
  options: ["New", "Used"],
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Invalid option added"
  }
}, {
  type: "select",
  name: "loanSecurity",
  label: "Loan security",
  isConditional: true,
  conditions: [{
    when: "loanType",
    is: "Car Loan"
  }],
  options: ["Secured", "Unsecured"],
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Invalid option added"
  }
}, {
  type: "money",
  name: "loanBalance",
  label: "Balance on existing loan*",
  isConditional: true,
  conditions: [{
    when: "homePurpose",
    is: "Refinance"
  }],
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Please add your current loan balance"
  }
}, ...getConditionalForm(loanForms, true, [{
  when: "homePurpose",
  is: "Refinance"
}]), {
  type: "select",
  name: "personalPurpose",
  label: "Loan Purpose",
  isConditional: true,
  conditions: [{
    when: "loanType",
    is: "Personal Loan"
  }],
  fieldProps: {
    style: inputStyles
  },
  options: ["Vehicle Purchase", "Broker Origination Fee", "Boost Cashflow", "Business Starting Up", "Child & Dependent-related Expenses", "Computers, Laptops and Phones", "Cosmetic Laster Treatment", "Council, Water Rates or Body Corporate Fees", "Debt Consolidation", "Dental", "Event Tickets", "Food", "Furniture", "Gifts", "Holiday", "Household Bills", "Insurance Payments", "Medical Bills", "Motorcycle Purchase", "Professional Services", "Purchase Stock/Equipment", "Purchase of Other Assets for Business Use", "Relocation", "Rent", "School Fees", "Short-term Loan Repayment", "Sports Gear", "Tattoo Removal", "Transport & Petrol", "Tuition Fees", "Wedding", "Other"],
  validation: {
    required: true,
    errorMessage: "Invalid option added"
  }
},
/******************/
{
  type: "money",
  label: "Loan Amount",
  name: "amount",
  fieldProps: {
    style: inputStyles
  },
  validation: {
    required: true,
    errorMessage: "Please make sure you add a valid amount"
  }
}];