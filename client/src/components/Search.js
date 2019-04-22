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

import React, { Component } from "react";
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";


export class Search extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.addToken();
  }

  getToken(){
    debugger
  }

  render() {
    return (
      
    //   <ul>
    //   {this.props.tokens.map(el => (
    //     <li key={el.id}>
    //       {el.value}
    //     </li>
    //   ))}
    // </ul>
    <div>
    <button onClick={() => this.getToken()}>
      Get Token
    </button>
  </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    tokens: state.tokens
  };
}

export default connect(
  mapStateToProps,
  { addToken }
)(Search);
















