import './App.css';
//import {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import Nav from './Nav';
import Home from './Home';


function App() {
  return (
    <div className='app'>
      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
