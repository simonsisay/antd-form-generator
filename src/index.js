import React from "react";
import ReactDOM from "react-dom";
import AlamaForm from "./AlamaForm";
import { sampleFormSchema } from "./sampleFormSchema";

ReactDOM.render(
  <AlamaForm
    formSchema={sampleFormSchema}
    renderSubmitButton={handleSubmit => (
      <button onClick={() => handleSubmit()}>Submit</button>
    )}
    submitFormAsync={data => {
      console.log(data);
    }}
  />,
  document.getElementById("root")
);
