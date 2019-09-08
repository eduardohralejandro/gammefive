import React from "react";
import Start from "./components/memorygame/start/Start";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/HomePage/home/Home";
import Navbar from "./components/HomePage/navbar/Navbar";
import axios from "axios";
import SpaceInvader from "./components/space-invader/SpaceInvader";
class App extends React.Component {
  state = {
    response: ""
  };

  async componentDidMount() {
    //testing
    await axios.get("/api").then(res => res);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/start" component={Start} />
            <Route exact path="/spaceinvader" component={SpaceInvader} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

