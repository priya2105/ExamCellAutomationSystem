import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin_Dashboard from './admin_dashboard';
import{
  BrowserRouter as Router,Route,Link,Redirect
} from"react-router-dom";
import Login from './login';
import Student_Details from './student_details';
class App extends Component {
  render() {
    return (
      <Router>
         <div className="App">
         <Route exact path='/admin_dashboard' component={Admin_Dashboard}/>
  <Route exact path='/' component={Login}/> 
  <Route exact path='/student_details' component={Student_Details}/> 
      </div>
      </Router>
     
    );
  }
}

export default App;
