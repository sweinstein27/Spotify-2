import React, { Component } from 'react';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
import SearchList from './SearchList'
import Search from './Search'
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";



const spotifyApi = new SpotifyWebApi();
var trackID;
var ID;
var trackProgress;
var searchObject;
var token 


class Player extends Component {
  constructor(){
    super();
    // const params = this.getHashParams();
    // token = params.access_token;
    
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      trackData: {
        key: "",
        bpm: ""
      },
      searchObject: [],
      selectedSongID: ""
    }
  }


  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        trackID = response.item.id
        trackProgress = response.progress_ms
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0],
              trackProgress: response.progress_ms
            }
        });
      })
  }

  getAudioDetails() {
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    var Url = "https://api.spotify.com/v1/audio-analysis/" + `${trackID}`
    $.ajax({
      url: Url,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: "GET",
      contentType: JSON,
      // success: function(data){
      //   this.setState({
      //     trackData: {
      //       key: data.track.key,
      //       bpm: data.track.tempo
      //     }
      //   })
      //   debugger
      //   console.log(data)
      // },
      // error: function(data){
      //   debugger
      //   console.log(data.responseText)
      // }
    })
    .then ((response) => {
      this.setState({
        trackData: {
          key: response.track.key,
          bpm: response.track.tempo
        }
      })
    })
  }

  getPause() {
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.pause()
  }

  getPlay(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.play()
  }

  me(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.getMe()
    .then((response) => {
      ID = response.id
    })
  }
  
  skipSong(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.skipToNext()
  }

  previousSong(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.skipToPrevious()
  }

  seek(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    var newPosition = trackProgress + 30000
    var Url = "https://api.spotify.com/v1/me/player/seek?position_ms=" + `${newPosition}`
    debugger
    $.ajax({
    url: Url,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
      type: "PUT",
      contentType: JSON,
      success: function(data){
        console.log("success")
      },
      error: function(error){
        console.log(`Error is ${error}`)
      }
    })
  }

  search(){
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=abba&type=track&market=US&offset=0",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: "GET",
      contentType: JSON,
    })
    .then ((data) => {
      debugger
        this.setState({
            searchObject: data.tracks.items
        })
    })
  }

  // songInfo(object){
  //  debugger
  // }

 

    // componentDidMount(){
    //     this.search()
    // }
  
    
  render() {
    return (
      <div className="App">
        <div>
           token: {this.props.token}
         </div>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          Current Possition: { this.state.nowPlaying.trackProgress}
        </div>
        <div>
          Key: { this.state.trackData.key }  
        </div>
        <div>
          BPM: { this.state.trackData.bpm } 
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        <div>
          <button onClick={() => this.getAudioDetails()}>
            Audio Details
          </button>
        </div>
        <div>
          <button onClick={() => this.getPlay()}>
            Play
          </button>
        </div>
        <div>
          <button onClick={() => this.getPause()}>
            Pause
          </button>
        </div>
        <div>
          <button onClick={() => this.skipSong()}>
            Next Song
          </button>
        </div>
        <div>
          <button onClick={() => this.previousSong()}>
            Previous Song
          </button>
        </div>
        <div>
          <button onClick={() => this.seek()}>
            Seek Forward
          </button>
        </div>
        <div>
          <button onClick={() => this.me()}>
            User Info
          </button>
        </div>
        
      </div>
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
  )(Player);