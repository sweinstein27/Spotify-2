import React, { Component } from "react";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";


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
    this.state.tokenValue = payload.token || ""
  }

  saveToken(payload){
    this.setState({ tokenValue: payload.token });
  }

  Login(){
    var { token } = "abc";
    var payload = this.props.addToken({ token });
    this.state.tokenValue = payload.token || ""
  }

  render() {
    return (
    <div onLoad={this.Login} class="d-flex justify-content-center">
    {/* <div>
        <button onClick={this.Login}>
            Login
        </button>
    </div> */}
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="token"></label>
          {/* <input
            type="text"
            className="form-control"
            id="value"
            value={value}
            onChange={this.handleChange}
          /> */}
        </div>
        <button type="submit" className="btn btn-success btn-lg mb-md-3">
          SAVE
        </button>
        <div>
            {/* <Search token={this.props.value} /> */}
        </div>
      </form>
    </div>
    );
  }
}
const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);
export default Form;
