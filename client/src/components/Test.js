import React, { Component } from "react";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";


export class Test extends Component {
  constructor() {
    super();
  }
//   componentDidMount() {
//     // calling the new action creator
//     this.props.addToken();
//   }
  
  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.token.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.value}
          </li>
        ))}
      </ul>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.token
  };
}
export default connect(
  mapStateToProps,
  { addToken }
)(Test);