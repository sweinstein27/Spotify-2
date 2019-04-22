import React from "react";
import Token from "./Token.js";
import Form from "./Form.js";
import Test from "./Test.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "./Search.js";
import Player from "./Player.js";
import Header from "./Header.js"
import Home from "./Home.js"

// function Header() {
//     return (
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/search">Search</Link>
//         </li>
//         <li>
//           <Link to="/Player">Player</Link>
//         </li>
//       </ul>
//     );
// }

// function App() {
//     return (
//     <Router>
//       <div>
//         <Header />

//         <Route exact path="/" component={Home} />
//         <Route path="/search" component={Search} />
//         <Route path="/player" component={Player} />
//       </div>
//     </Router>
//     )
// };
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchPushed: false,
            playerPushed: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            searchPushed: !this.state.searchPushed,
            playerPushed: !this.state.playerPushed

        });
    }
    render() {
        return (
            <Router>
            <div>
            <Header 
                    handleClick={this.handleClick} 
                    searchPushed={this.state.searchPushed}
                    playerPushed={this.state.playerPushed} />

                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/player" component={Player} />
            </div>
            </Router>
           
        );
    }
}

// function Home() {
//     return(
//   <div className="row mt-5">
//     <div className="col-md-4 offset-md-1">
//     {/* <h2>Token</h2> */}
//       <Token/>
//     </div>
//     <div className="col-md-4 offset-md-1">
//       <h2>Add a new Token</h2>
//       <Form />
//     </div>
//     <div className="col-md-4 offset-md-1">
//       {/* <h2>API Token</h2> */}
//       <Test />
//     </div>
//     <div>
//         <a href='http://localhost:8888' > Login to Spotify </a>
//     </div>
//   </div>
//     )
// }





export default App;