import React, { Component } from "react";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";
import $ from 'jquery';

var token;

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchObject: [],
      query: "jude"
    }
    this.seeSong = this.seeSong.bind(this);
  }

  getToken(){
    var { token } = "abc";
    var payload = this.props.addToken({ token });
    this.setState({
      token: payload.token
    })
  }

  search(){
    this.getToken()
    token = this.state.token
    var query = prompt("Please enter track name") || this.state.query
    $.ajax({
      url: "https://api.spotify.com/v1/search?" + "q=name:" + `${query}` + "&type=track",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: "GET",
      contentType: JSON,
    })
    .then ((data) => {
        this.setState({
            searchObject: data.tracks.items
        })
    })
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
              <img src={object.album.images[0].url} alt="Album Art" style={{ height: 150 }}/>
              <br></br>
              Song Title: {object.name}
              <br></br>
              Artist: {object.artists[0].name}
              <br></br>
              <a href={object.preview_url}>Preview Song</a>
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















