import React from "react";
import "./App.css";
import Start from "./components/memorygame/start/Start";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/HomePage/home/Home'
import Navbar from './components/HomePage/navbar/Navbar'
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
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/start" component={Start} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

