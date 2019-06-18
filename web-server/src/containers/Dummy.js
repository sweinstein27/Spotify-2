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
                        Get All Query
                    </button>
                </div>
                <div>
                   {this.state.searches.map(object => (
                       <div class="text-white">
                        <h3>
                            Query: {object.query}
                        </h3>
                       </div>
                   ))}
                </div>
            </div>
        )
    }

}
export default Dummy;
