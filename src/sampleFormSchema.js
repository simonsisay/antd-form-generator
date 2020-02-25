const inputStyles = {
  width: 334,
  height: 40
};

// const radioStyle = {
//   textAlign: "center",
//   borderColor: "#51BAF7"
// };

// const getConditionalForm = (array, isConditional, conditions) => {
//   let form = [];
//   array.forEach(item => {
//     form = [...form, { ...item, isConditional, conditions }];
//   });
//   return form;
// };

// const formSchema = [
//   {
//     type: "number",
//     name: "approximateValue",
//     label: "Approximate property value",
//     fieldProps: { style: inputStyles },
//     validation: {
//       required: true,
//       errorMessage: "Enter a number for this field."
//     }
//   },
//   {
//     type: "number",
//     name: "purchasePostcode",
//     label: "What is the postcode of the property you intend to buy?",
//     fieldProps: { style: inputStyles },
//     validation: {
//       required: true,
//       errorMessage: "Enter a number for this field."
//     },
//     isConditional: true,
//     conditions: [{ when: "employment", is: "Employed" }]
//   },
//   {
//     type: "radio",
//     name: "interestPreference",
//     label: "Interest rate preference",
//     options: ["Fixed", "Variable", "No preference"],
//     groupProps: { buttonStyle: "solid", size: "large" },
//     fieldProps: {
//       disabled: false,
//       style: radioStyle
//     },
//     validation: {
//       required: true
//     }
//   },
//   {
//     type: "textarea",
//     name: "additionalRequirements",
//     label: "Additional requirements",
//     fieldProps: { style: { ...inputStyles, height: 100 } },
//     validation: {
//       required: false
//     }
//   }
// ];

export const sampleFormSchema = [
  {
    type: "money",
    label: "Cash Savings",
    name: "savings",
    value: 245,
    fieldProps: { style: inputStyles },

    validation: {
      required: true,
      errorMessage: "Please make sure you added a valid amount"
    }
  }
  // {
  //   type: "radio",
  //   label: "Income Type",
  //   options: ["Employed", "Self Employed", "Other"],
  //   name: "employment",

  //   groupProps: { buttonStyle: "solid", size: "large" },
  //   unregister: [
  //     {
  //       isNot: "Employed",
  //       fieldsToRemove: [
  //         "employmentCategory",
  //         "tax",
  //         "employmentForm",
  //         "employmentType"
  //       ]
  //     },
  //     {
  //       isNot: "Self Employed",
  //       fieldsToRemove: [
  //         "employmentCategory",
  //         "tax",
  //         "employmentForm",
  //         "employmentType"
  //       ]
  //     }
  //   ],
  //   fieldProps: {
  //     disabled: false,
  //     style: radioStyle
  //   },
  //   validation: {
  //     required: true,
  //     errorMessage: "Invalid option added"
  //   }
  // }
];
