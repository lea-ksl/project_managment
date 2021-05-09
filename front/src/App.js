import React from "react";
import { Grommet, Box, Button,  } from "grommet";
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

import Login from "./features/session/Login";
import Projects from "./features/projects/Projects";
import Project from "./features/projects/Project";
import EditProject from "./features/projects/EditProject";
import Signup from "./features/session/Signup";
import store from "./app/store";


import fire from "./fire";

import connect from './socket-api';
import EditTask from "./features/tasks/EditTask";

connect("http://localhost:3001", store);

const theme = {
  global: {
    colors: {
      brand: '#cc0000',
      back: "#292929",
      card: "#bfdbf7",
      accent: "#994650",
      ok: '#00C781',
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
  console.log('logged in?', isLoggedIn);
  return (
    <Grommet theme={theme} full>
      <Router>
        {!isLoggedIn ? (   
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact>
              <Projects />
            </Route>
            <Route path="/projects/edit/:projectid">
              <EditProject />
            </Route>
            <Route path="/projects/:projectid">
              <Project />
            </Route>
            <Route path="/tasks/edit/:taskid">
              <EditTask />
            </Route>
          </Switch>
          )}
      </Router>
    </Grommet>
  );
}

export default App;
