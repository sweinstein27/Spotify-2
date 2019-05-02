import React, { Component } from 'react';
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";

class Login extends Component {
    constructor() {
        super();
    
        this.state = {
          tokenval: ""
        }
        this.login = this.login.bind(this);
    }

    login(){
        debugger
        window.location.href = "http://localhost:8888"
    }

    saveToken(){
        // var { token } = "abc";
        // // var payload = this.props.addToken({ token });
        // this.state.token = payload.token
    }

    componentWillMount(){
        this.saveToken()
    }

   
   render(){
        return(
            <div>
                <button onClick={() => this.login()}>
                    Log
                </button>
            </div>
            
        )
    }
}

  
const mapStateToProps = (state) => {
    return {
      token: state.token
    };
  }
  
  export default connect(mapStateToProps)(Login);