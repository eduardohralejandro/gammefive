import React from "react";
import Start from "./components/memorygame/start/Start";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/HomePage/home/Home";
import Navbar from "./components/HomePage/navbar/Navbar";
import SpaceInvader from "./components/space-invader/SpaceInvader";
import Contact from './components/contact/Contact'
class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/start" component={Start} />
            <Route exact path="/spaceinvader" component={SpaceInvader} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

