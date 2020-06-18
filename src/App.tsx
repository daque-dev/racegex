import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.scss";
import Play from "./Play/Play";
import Home from "./Home/Home";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/play/:room">
            <Play />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/play">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Join = () => {
  let room = prompt("room");
  if (!room) {
    alert("No room received");
  }

  return (
    <div>
      <Redirect to={room ? `/play/${room}` : "/home"} />
    </div>
  );
};

export default App;
