import React from "react";
import "./App.css";
import Start from "./components/memorygame/start/Start";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import SpaceInvader from "./components/space-invader/SpaceInvader";
class App extends React.Component {
  state = {
    response: ""
  };
  async componentDidMount() {
    //testing 
   await axios.get("/api").then((res) => res)
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            {/* <Start /> */}
            <Route exact path="/spaceinvader" component={SpaceInvader} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

