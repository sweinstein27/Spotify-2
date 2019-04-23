// import React, { Component } from 'react'
// import SearchList from './SearchList';
// import SearchContainer from '../containers/SearchContainer'

// class Search extends Component {

//   state = {
//     query: "q=Muse&type=track&market=US&limit=10&offset=5"
//   }

//   handleSubmit = event => {
//     event.preventDefault()
//     this.props.search(this.state.query)
//   }

//   render() {
//     return(
//       <div>
//          <h1>"hi"</h1>
//       </div>
//   )
//   }

// }

// export default Search;

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { addToken } from "../js/actions/index";


// export class Search extends Component {
//   constructor() {
//     super();
//   }

  // componentDidMount() {
  //   this.props.addToken();
  // }

//   getToken(){
//     debugger
//   }

//   render() {
//     return (
      
//     //   <ul>
//     //   {this.props.tokens.map(el => (
//     //     <li key={el.id}>
//     //       {el.value}
//     //     </li>
//     //   ))}
//     // </ul>
//     <div>
//     <button onClick={() => this.getToken()}>
//       Get Token
//     </button>
//     <div>
//       Token: {this.props.value}
//     </div>
//   </div>
//     );
//   }
// }



// function mapStateToProps(state) {
//   return {
//     tokens: state.tokens
//   };
// }

// export default connect(
//   mapStateToProps,
//   { addToken }
// )(Search);


import React, { Component } from "react";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";
import $ from 'jquery';

var token

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchObject: [],
      query: "q=name:jude&type=track"
    }
  }

  search(){
    token = "" || this.props.token[0]
    var query = this.state.query
    $.ajax({
      url: "https://api.spotify.com/v1/search?" + `${query}`,
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


  
  render() {
    return (
      <div>
        <div>
          {this.props.token}
        </div>
        <div>
          <button onClick={() => this.search()}>
            search
          </button>
        </div>
        <div>
        <ul>
                {this.state.searchObject.map(object => (
                  <li>
                  <h2>
                    Song Title: {object.name}
                    <br></br>
                    Artist: {object.artists[0].name}
                    <br></br>
                  </h2>
                </li>
                ))}
                </ul>
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















