import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.scss";
import Navbar from "./Navbar";

const Home = lazy(() => import("./Home/Home"));
const Play = lazy(() => import("./Play/Play"));
const Learn = lazy(() => import("./Learn/Learn"));

function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          <Navbar />

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
              <Route exact path="/learn" component={Learn} />
              <Route exact path="/learn/:levelId" component={Learn} />
              <Route exact path="/learn/:levelId/:lessonId" component={Learn} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </Suspense>
    </>
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
