import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import $ from 'jquery';
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";




const spotifyApi = new SpotifyWebApi();
var trackID;
var trackProgress;
var token ;
var minutes;
var seconds;




class Player extends Component {
  constructor(){
    super();
    
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', trackProgress: 0, minutes: 0, seconds: 0 },
      trackData: {
        key: "",
        bpm: ""
      },
      searchObject: [],
      selectedSongID: "",
      token: localStorage.getItem(token) || []
    }
    this.getAudioDetails = this.getAudioDetails.bind(this);
  }


  // getHashParams() {
  //   var hashParams = {};
  //   var e, r = /([^&;=]+)=?([^&;]*)/g,
  //     q = window.location.hash.substring(1);
  //   e = r.exec(q)
  //   while (e) {
  //     hashParams[e[1]] = decodeURIComponent(e[2]);
  //     e = r.exec(q);
  //   }
  //   return hashParams;
  // }

  getNowPlaying(){
    this.getToken()
    token = this.state.token
    spotifyApi.setAccessToken(token)
    spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
    trackID = response.item.id
    trackProgress = response.progress_ms/1000
    this.setState({
        nowPlaying: { 
        name: response.item.name, 
        albumArt: response.item.album.images[0].url,
        trackProgress: response.progress_ms/1000,
        minutes: Math.floor(trackProgress / 60),
        seconds: Math.floor(trackProgress -  (Math.floor(trackProgress/60) * 60))
        }
    });
    })
    this.getAudioDetails()
}

  getToken(){
    var { token } = "abc";
    var payload = this.props.addToken({ token });
    this.setState({
      token: payload.token
    }, () => {
      localStorage.setItem(token, token)
    })
  }

  getAudioDetails() {
    this.getToken()
    token = this.state.token
    spotifyApi.setAccessToken(token)
    var Url = "https://api.spotify.com/v1/audio-analysis/" + `${trackID}`
    fetch(Url, {
      method: "GET",
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
    .then((response) => {
      this.setState({
        trackData: {
          key: response.track.key,
          bpm: response.track.tempo
        }
      })
    })
  }

  getPause() {
    this.getToken()
    token = this.state.token
    spotifyApi.setAccessToken(token)
    spotifyApi.pause()
    this.getNowPlaying()
  }

  getPlay(){
    this.getToken()
    debugger
    token = this.state.token
    spotifyApi.setAccessToken(token)
    spotifyApi.play()
    this.getNowPlaying()
  }

  skipSong(){
    this.getToken()
    token = this.state.token
    spotifyApi.setAccessToken(token)
    spotifyApi.skipToNext()
    this.getNowPlaying()
  }

  previousSong(){
    this.getToken()
    token = this.state.token
    spotifyApi.setAccessToken(token)
    spotifyApi.skipToPrevious()
    this.getNowPlaying()
  }

  // seek(){
  //   this.getToken()
  //   token = this.state.token
  //   spotifyApi.setAccessToken(token)
  //   var newPosition = trackProgress + 30000
  //   var Url = "https://api.spotify.com/v1/me/player/seek?position_ms=" + `${newPosition}`
  //   $.ajax({
  //   url: Url,
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //   },
  //     type: "PUT",
  //     contentType: JSON,
  //     success: function(data){
  //       console.log("success")
  //     },
  //     error: function(error){
  //       console.log(`Error is ${error}`)
  //     }
  //   })
  // }

  // search(){
  //   $.ajax({
  //     url: "https://api.spotify.com/v1/search?q=abba&type=track&market=US&offset=0",
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     type: "GET",
  //     contentType: JSON,
  //   })
  //   .then ((data) => {
  //     debugger
  //       this.setState({
  //           searchObject: data.tracks.items
  //       })
  //   })
  // }

 

    componentDidMount(){
      this.interval = setInterval(() => this.getNowPlaying(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

  
    
  render() {
    return (
      <div className="App">
        <div class="SongInfo text-white">
        {/* <div class="d-flex justify-content-center"> */}
            <div class="col-sm-12 d-flex justify-content-center">
            Now Playing: { this.state.nowPlaying.name }
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            Current Position: {this.state.nowPlaying.minutes} minutes { this.state.nowPlaying.seconds} seconds
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            Key: { this.state.trackData.key }  
            </div>
            <div class="col-sm-12 d-flex justify-content-center">
            BPM: { this.state.trackData.bpm } 
            </div>
            <div class="col-sm-12 d-flex justify-content-center mb-md-3">
            <img src={this.state.nowPlaying.albumArt} alt="Album Art" style={{ height: 250, outerWidth: 250 }}/>
            </div>
        {/* </div> */}
        </div>
        <div class="btn-group d-flex justify-content-center mb-md-3">
            <div class="row">
            <div class="col-lg-3 d-flex justify-content-center">
                <button class="btn btn-default" onClick={() => this.previousSong()}>
                <img src="https://image.flaticon.com/icons/svg/149/149113.svg" alt="Previous Song" style={{ height: 50}}/>
                </button>
            </div>
            <div class="col-lg-3 d-flex justify-content-center" >
                <button class="btn btn-success" onClick={() => this.getPlay()}>
                    <img src="https://image.flaticon.com/icons/svg/0/375.svg" alt="Play" style={{ height: 50}}/>
                </button>
            </div>
            <div class="col-lg-3 d-flex justify-content-center">
                <button class="btn btn-danger" onClick={() => this.getPause()}>
                <img src="https://www.flaticon.com/premium-icon/icons/svg/1709/1709943.svg" alt="Pause" style={{ height: 50}}/>
                </button>
            </div>
            <div class="col-lg-3 d-flex justify-content-center">
                <button class="btn btn-default" onClick={() => this.skipSong()}>
                <img src="https://image.flaticon.com/icons/svg/149/149112.svg" alt="Skip Song" style={{ height: 50}}/>
                </button>
            </div>
          </div>
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