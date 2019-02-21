import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin_Dashboard from './admin_dashboard';
import{
  BrowserRouter as Router,Route,Link,Redirect
} from"react-router-dom";
import Login from './login';
class App extends Component {
  render() {
    return (
      <Router>
         <div className="App">
         <Route exact path='/' component={Admin_Dashboard}/>
  <Route exact path='/login' component={Login}/> 
      </div>
      </Router>
     
    );
  }
}

export default App;
