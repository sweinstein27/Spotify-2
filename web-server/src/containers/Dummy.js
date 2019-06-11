import React, { Component } from 'react';
import { connect } from "react-redux";
import fetchSearches from "../services/SearchService"

class Dummy extends Component {

    getSearches(){
        fetch("http://localhost:3001/api/searches",{
          mode: "no-cors",
          accept: "application/json"
        })
        .then(response => {
            debugger
        })
      }


    render() {
        return(
            <div>
                <button onClick={() => this.getSearches()}>
                    search query
                </button>
            </div>
        )
    }

}
export default Dummy;
