import './App.css';
import {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import Nav from './Nav';
import Home from './Home';
import Table from './Table';
import Fixtures from './Fixtures';
import Clubs from './Clubs';
import Team from './Team';
import oops from './oops.jpeg'


function App() {
  useEffect(() => {
    if(!localStorage.getItem('league')){
      localStorage.setItem('league', 'eng')
      localStorage.setItem('league_name', 'Premier League')
    }
  }, [])
  return (
    <div className='app'>
      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/table'>
            <Table />
          </Route>
          <Route path='/fixtures'>
            <Fixtures />
          </Route>
          <Route path='/clubs' exact>
            <Clubs />
          </Route>
          <Route path='/clubs/:team_id'>
            <Team />
          </Route>
          <Route>
            <div>
            <h1>OOPS! There was a problem :(</h1>
              <img id='error_img' src={oops} alt='oops'></img>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
