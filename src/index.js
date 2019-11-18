import React from "react";
import ReactDOM from "react-dom";
import AntdFormGenerator from "./AntdFormGenerator";
import { sampleFormSchema } from "./sampleFormSchema";

ReactDOM.render(
  <AntdFormGenerator
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
