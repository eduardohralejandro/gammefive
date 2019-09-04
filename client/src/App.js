import React from "react";
import "./App.css";
import Start from "./components/memorygame/start/Start";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Boxlayout from "./components/off-theline/Boxlayout";
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
            <Route exact path="/offtheline" component={Boxlayout} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

