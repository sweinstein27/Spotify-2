import React, { Component } from 'react';
import { connect } from "react-redux";
import fetchSearches from "../services/SearchService"

class Dummy extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searches: []
        }
        
    }

    getSearches(){
        fetch("http://localhost:3001/api/searches")
        .then(response => response.json())
        .then(response => {
            this.setState({
                searches:response
            })
        })
    }


    render() {
        return(
            <div>
                <div>
                    <button onClick={() => this.getSearches()}>
                        search query
                    </button>
                </div>
                <div>
                   {this.state.searches.map(o => {
                       query: {o.query}
                   })}
                </div>
            </div>
        )
    }

}
export default Dummy;
