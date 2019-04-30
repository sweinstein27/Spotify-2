import React, { Component } from 'react';
import Token from "./Token.js";
import Form from "./Form.js";
import Player from "./Player";
import Search from "./Search";
import SpotifyWebApi from 'spotify-web-api-js';
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";

const spotifyApi = new SpotifyWebApi();


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