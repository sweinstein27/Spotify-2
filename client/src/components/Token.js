import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { tokens: state.tokens };
};
const ConnectedToken = ({ tokens }) => (
  <ul className="list-group list-group-flush">
    {tokens.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.value}
      </li>
    ))}
  </ul>
);
const Token = connect(mapStateToProps)(ConnectedToken);

export default Token;