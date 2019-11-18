import React from "react";
import ReactDOM from "react-dom";
import AlamaForm from "./AlamaForm";
import { sampleFormSchema } from "./sampleFormSchema";

ReactDOM.render(
  <AlamaForm
    formSchema={sampleFormSchema}
    submitButton={handleSubmit => (
      <button onClick={() => handleSubmit()}>Submit</button>
    )}
    onSubmit={data => {
      console.log(data);
    }}
  />,
  document.getElementById("root")
);
