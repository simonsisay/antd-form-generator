# antd-form-generator

This is a simple library built on top of [ant-design](http://ant.design) and [react-hook-form](https://react-hook-form.com)
That will generate an ant design form when given a valid schema.

**Installation**
  
  npm install antd-form-generator 
  
  
  yarn add antd-form-generator
  


**_Usage_**

```javascript
import FormGenerator from "antd-form-generator";

ReactDOM.render(
  <FormGenerator
    innerClassName={"fields-container"}
    outerClassName={"form-container"}
    formSchema={[
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
      }
    ]}
    onSubmit={data => {
      // api call done here
      console.log(data);
    }}
    renderFooter={handleSubmit => (
      <button className="button" onClick={() => handleSubmit()}>
        Submit
      </button>
    )}
  />,
  document.getElementById("root")
);
```

\***\*The Schema\*\***

The form schema should be structured like [this](https://github.com/simonsisay/react-hook-form-antdesign/blob/master/src/sampleFormSchema.js)

The following are all the available types of form-fields.
...\*

- text
- number
- email
- money
- percent
- select
- textarea
- custom
- datepicker
- radio
  \*\*

You can pass

```javascript
[
 {
  type: "text",  // type of field
   name: "firstName", // name
   defaultValue: "Simon", // default value for the input.
   required: true,
   placeholder: "First name",
   label: "First name",
   fieldProps: { disabled: false },  // ant design props.
   validation: {  // validation object needs to be passed like this.
     required: true,
     errorMessage: "Please make sure your input is correct",
     validate: value => value.toString().startsWith("A")  // You can also pass a custom validation function.
   }
 },
 {
   type: "radio",
   name: "gender",
   options: ["Male", "Female"],  // this is an array of options for the radio.
   defaultValue: "Female",
   placeholder: "Gender",
   required: true,
   label: "Gender",
   validation: {
     required: true,
     errorMessage: "Please make sure your input is correct"
   },
   groupProps: { buttonStyle: "outline", size: "large" },
   // prop for the options container like
     <Radio.Group {...field.groupProps}><Radio /></Radio.Group>
    or
     <Select {...field.groupProps}><Option /></Select>

   fieldProps: {  // This one is for the individual options.
     disabled: false,
     style: { width: 150, textAlign: "center" }
   }
 }
]
```

\***_Styling_**

There are two props that we can pass to the component for styling

```javascript
<FormGenerator
  // the following props are best suited to do the form layout.
  innerClassName={"fields-container"} // wraps all inputs
  outerClassName={"form-container"} // wraps the whole form including the submit button passed as a render prop
/>
```

Other than that, we can pass a style object to each field inside the fieldProps object like

```javascript
    {
      type: "number",
      name: "age",
      fieldProps: {style: { width: 300, backgroundColor:"lightgrey", height:50, border:"none" } }
    }
```

**_Submitting form_**

The submitFormAsync prop takes a function that gets the user's inputs as an argument.

```javascript
<FormGenerator
  onSubmit={data => {
    // user's valid inputs. this function won't get fired unless all validations have passed.
    console.log(data);
  }}
/>
```

\***_Submit Button_**

Submit Button is passed as a renderProp through a prop named: renderFooter
This will allow you to have a button of any type, with your own customized styling and layout.
Only exposing the click handler function for you.

```javascript
<FormGenerator
  renderFooter={handleSubmit => (
    <MyButton onClick={() => handleSubmit()}>Submit Form</MyButton>
  )}
/>
```

# Advanced Usage

## Conditional Fields.

Whenever you have a form field that you want to render conditionally based on another input's value, you can add a property 
`isConditional:true` on the schema of that field. After that, add a conditons property that expects an array of "condition objects". A Condition Object has two properties. "when" and "is". 
if we had this condition object`{when:"firstName", is:"Simon"}` then, that field would only render if the field "firstName" has a value of "Simon".


```
  {
    type: "textarea",
    name: "licenseName",
    isConditional: true,
    conditions: [{ when: "age", is: 18 }],
    fieldProps: {
      placeholder: "Name/Address/Company on License",
      style: { ...inputStyle, height: 120 }
    },
    validation: {
      required: true,
      errorMessage: "Please make sure you added a valid license name"
    }
  }
  
```
This above field will render only when age is 18. You can add a number of conditoins to the array and the field would only render if all conditions pass.



| Props          | description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| formSchema     | The json or array of objects of form structure                                   |
| outerClassName | a className for the the element that wraps the form fields and the submit button |
| innerClassName | a className for the fields container. Usually used to layout the form fields     |
| onSubmit       | submitHandler for the form. Gets the user's valid inputs as an argument          |
| renderFooter   | takes the submit button component as a renderProp. Example is shown above.       |
