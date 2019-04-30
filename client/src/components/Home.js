import React, { Component } from 'react';
import Player from "./Player";
import Search from "./Search";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";
import $ from 'jquery';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      tokenValue: ""
    }
  }


  render () {
    return(
      <div className="app">
        <div>
                <a href='http://localhost:8888' class="text-white"> Login to Spotify </a>
        </div>
        <div>
          <div>
            <Player/>
          </div>
          <div>
            <Search/>
          </div>
        </div>
      </div>
    )
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
)(Home);