import React, { Component } from "react";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";
import $ from 'jquery';

var token;
var value;
var token; 
var context_uri;
var data;
var query;
var Url;


export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchObject: [],
      query: "jude"
    }
    this.seeSong = this.seeSong.bind(this);
    this.switchSong = this.switchSong.bind(this);
  }


  search(){
    token = this.props.token[0]
    query = prompt("Please enter album name") || this.state.query
    Url = "https://api.spotify.com/v1/search?" + "q=name:" + `${query}` + "&type=album"
    debugger
    fetch(Url,{
      method: "GET",
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then(response => response.json())
    .then ((response) => {
      debugger
        this.setState({
            searchObject: response.albums.items
        })
    })
}

switchSong(event) {
  token = this.props.token[0]
  context_uri = event.target.value
  data = {context_uri: context_uri}
  var Url = "https://api.spotify.com/v1/me/player/play" 
    fetch(Url, {
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }).then(
      this.setState({
        searchObject: []
      })
    )
    
}

seeSong(event){
  event.preventDefault();
  token = "" || this.props.token[0]
  var url=event.target[0].value
  $.ajax({
    url: url,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    type: "GET",
    contentType: JSON,
  })
  .then((data) => {
  })
}


  
  render() {
    return (
      <div>
        <div class="btn-group d-flex justify-content-center">
          <button class="btn btn-default  mb-md-3" onClick={() => this.search()}>
            search
          </button>
          <br>
          </br>
        </div>
        <div class="d-flex justify-content-center">
        <div class="row">
          {this.state.searchObject.map(object => (
            <div class="col-sm-3 text-white">
             <h3>
              <img src={object.images[0].url} alt="Album Art" style={{ height: 150 }}/>
              <br></br>
              Song Title: {object.name}
              <br></br>
              Artist: {object.artists[0].name}
              <br></br>
              <button class="btn-group d-flex" id="trackvalurl" value={object.uri} onClick={(event) => this.switchSong(event)} >
                Play Song
              </button>
              <br></br>
            </h3>
            </div>
          ))}
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
)(Search);















