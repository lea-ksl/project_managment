import React from "react";
import { Grommet, Box, Button,  } from "grommet";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from "./features/session/Login";
import Projects from "./features/projects/Projects";
import Poles from "./features/poles/Poles"
import Tasks from "./features/tasks/Tasks"
//import Users from "./features/users/Users";
import store from "./app/store";


import fire from "./fire";

import connect from './socket-api';

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
        
        {!isLoggedIn
          ? (   
              <Route path="/" exact>
                <Login />
              </Route>
          ) 
          : (
            <Switch>
            <Route path="/" exact>
                <Projects />
              </Route>
             <Route path="/poles" exact>
             <Poles />
           </Route>
           <Route path="/tasks" exact>
             <Tasks />
           </Route> 
           </Switch>
          )}
      </Router>
 
    </Grommet>
  );
}

export default App;
