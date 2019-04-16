import React from "react";
import Token from "./Token.js";
import Form from "./Form.js"

const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Token</h2>
      <Token/>
    </div>
    <div className="col-md-4 offset-md-1">
      <h2>Add a new Token</h2>
      <Form />
    </div>
  </div>
);

export default App;