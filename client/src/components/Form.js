import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addToken } from "../js/actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addToken: token  => dispatch(addToken(token))
  };
}
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { value } = "abc";
    const id = uuidv1();
    const payload = this.props.addToken({ value, id });
    this.setState({ value: payload.payload });
  }
  render() {
    var { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="text"
            className="form-control"
            id="value"
            value={value}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;