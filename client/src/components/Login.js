import React, { Component } from 'react';
import { connect } from "react-redux";
import { addToken } from "../js/actions/index";

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          tokenval: ""
        }
        this.login = this.login.bind(this);
        this.saveToken = this.saveToken.bind(this);
    }

    login(){
        debugger
        window.location.href = "http://localhost:8888"
    }

    saveToken(){
        debugger
        var { token } = "abc";
        var payload = this.props.addToken({ token });
        this.state.token = payload.token
    }

    // componentWillMount(){
    //     this.saveToken()
    // }

   
   render(){
        return(
            <div>
                <div>
                    <button onClick={() => this.login()}>
                        Log
                    </button>
                </div>
                <div>
                    <h1> hi </h1>
                </div>
            </div>
            
        )
    }
}

  
const mapStateToProps = (state) => {
    return {
      token: state.token
    };
  }
  
//   export default connect(mapStateToProps)(Login);

export default Login;