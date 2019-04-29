import React, { Component } from 'react';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
import Search from './Search'
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";



const spotifyApi = new SpotifyWebApi();
var trackID;
var ID;
var trackProgress;
var searchObject;
var token 
var isPlaying = true;


class Player extends Component {
  constructor(){
    super();
    
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
    var delayInMilliseconds = 10000;
    var counter = 0;
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
    trackID = response.item.id
    trackProgress = response.progress_ms*1000
    this.setState({
        nowPlaying: { 
        name: response.item.name, 
        albumArt: response.item.album.images[0].url,
        trackProgress: response.progress_ms/1000
        }
    });
    })
    this.getAudioDetails()
    // while (isPlaying = true && counter < 10) {
    // setTimeout(function() {
    //     this.getNowPlaying()
    //     counter++
    //     }, delayInMilliseconds);
    // }
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
    this.getNowPlaying()
  }

  getPlay(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.play()
    this.getNowPlaying()
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
    this.getNowPlaying()
  }

  previousSong(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    spotifyApi.skipToPrevious()
    this.getNowPlaying()
  }

  seek(){
    token = this.props.token[0]
    spotifyApi.setAccessToken(token)
    var newPosition = trackProgress + 30000
    var Url = "https://api.spotify.com/v1/me/player/seek?position_ms=" + `${newPosition}`
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
        <div class="SongInfo text-white">
        {/* <div class="d-flex justify-content-center"> */}
            <div class="col-sm-12 d-flex justify-content-center">
            Now Playing: { this.state.nowPlaying.name }
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            Current Position: { this.state.nowPlaying.trackProgress} seconds
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            Key: { this.state.trackData.key }  
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            BPM: { this.state.trackData.bpm } 
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            <img src={this.state.nowPlaying.albumArt} style={{ height: 250, outerWidth: 250 }}/>
            </div>
        {/* </div> */}
        </div>
        <div className="ControlButtons">
            <div class="container-fluid">
            <div class="row">
            <div class="col-lg-3 d-flex justify-content-center">
                <button class="btn btn-default" onClick={() => this.previousSong()}>
                <img src="https://image.flaticon.com/icons/svg/149/149113.svg" style={{ height: 150}}/>
                </button>
            </div>
            <div class="col-lg-3 d-flex justify-content-center" >
                <button class="btn btn-success" onClick={() => this.getPlay()}>
                    <img src="https://image.flaticon.com/icons/svg/0/375.svg" style={{ height: 150}}/>
                </button>
            </div>
            <div class="col-lg-3 d-flex justify-content-center">
                <button class="btn btn-danger" onClick={() => this.getPause()}>
                <img src="https://www.flaticon.com/premium-icon/icons/svg/1709/1709943.svg" style={{ height: 150}}/>
                </button>
            </div>
            <div class="col-lg-3 d-flex justify-content-center">
                <button class="btn btn-default" onClick={() => this.skipSong()}>
                <img src="https://image.flaticon.com/icons/svg/149/149112.svg" style={{ height: 150}}/>
                </button>
            </div>
            </div>
            </div>
            {/* <div>
                <button onClick={() => this.me()}>
                    User Info
                </button>
            </div> */}
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