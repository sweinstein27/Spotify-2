import React from "react";
import Token from "./Token.js";
import Form from "./Form.js";
import Player from "./Player";
import Search from "./Search";
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


function Home() {
  return(
<div className="app">
  <div>
          <a href='http://localhost:8888'> Login to Spotify </a>
  </div>
  <div>
    <div>
    <Player/>
    </div>
    <div>
    <h2>Add a new Token</h2>
    <Form/>
    </div>
    <div>
    <Search/>
    </div>
  </div>
</div>
  )
}

export default Home;