import React from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import Statistics from './Components/Statistics';
import UploadReceipt from './Components/UploadReceipt';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

function App() {

  const transitions = useTransition()
  
  return transitions.map(({props, key }) => (
    <Router>
      <div>
        <NavBar />
        <animated.div key={key} style={props}>
        <Switch>
          <Route exact path="/" render={Statistics}/>
          <Route exact path="/statistics" render={Statistics}/>
          <Route exact path="/upload-receipt" render={UploadReceipt}/>
        </Switch>
        </animated.div>
      </div>
    </Router>
  ));
}

export default App;
