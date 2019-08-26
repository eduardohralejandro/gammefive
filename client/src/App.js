import React from "react";
import "./App.css";
import Start from "./components/memorygame/start/Start";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
class App extends React.Component {
  state = {
    response: ""
  };
  async componentDidMount() {
    //testing 
   const getData = await axios.get("/api").then((res) => console.log(res) )
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Start />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

