import React from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import Statistics from './Components/Statistics';
import UploadReceipt from './Components/UploadReceipt';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={Statistics}/>
          <Route exact path="/statistics" render={Statistics}/>
          <Route exact path="/upload-receipt" render={UploadReceipt}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
