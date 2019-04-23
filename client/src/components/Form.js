import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addToken } from "../js/actions/index";
import { Search } from "./Search";

function mapDispatchToProps(dispatch) {
  return {
    addToken: token  => dispatch(addToken(token))
  };
}

function mapStateToProps(state) {
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: " ",
      tokenValue: " "
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ token: event.target.value.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    var { token } = "abc";
    var payload = this.props.addToken({ token });
    debugger
    this.saveToken(payload)
  }

  saveToken(payload){
    this.setState({ token: payload.payload });
  }

  render() {
    var { token } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="token">token</label>
          {/* <input
            type="text"
            className="form-control"
            id="value"
            value={value}
            onChange={this.handleChange}
          /> */}
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
        <div>
            <Search token={this.props.value} />
        </div>
      </form>
    );
  }
}
const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
export default Form;