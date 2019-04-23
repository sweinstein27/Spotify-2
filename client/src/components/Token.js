import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.token };
};
const ConnectedToken = ({ token }) => (
  <ul className="list-group list-group-flush">
    {token.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.value}
      </li>
    ))}
  </ul>
);
const Token = connect(mapStateToProps)(ConnectedToken);

export default Token;