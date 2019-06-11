import React, { Component } from 'react';
import Player from "../containers/Player";
import Search from "../containers/Search";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";
import $ from 'jquery';
import fetchSearches from "../services/SearchService"


var token;

class Home extends Component {
  constructor() {
    super();

    this.state = {
      searches: []
    }
  }

  getToken(){
    var { token } = "abc";
    debugger
    var payload = this.props.addToken({ token });
    this.setState({
      token: payload.token
    }, () => {
      localStorage.setItem(token, token)
    })
  }

  componentDidMount(){
    // this.getToken();
    fetch("http://localhost:3001/api/searches",{
      mode: "no-cors",
      accept: "application/json"
    })
            .then(response => {
              debugger
            } )
            .then(response => console.log(response))
  }



  render () {
    return(
      <div>
        <div>
          <div>
            <Player token={this.state.token} />
          </div>
          <div>
            <Search token={this.state.token} searches={this.state.searches}/>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(
  mapStateToProps,
  { addToken, fetchSearches }
)(Home);