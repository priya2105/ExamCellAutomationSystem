import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin_Dashboard from './admin_dashboard';
import Add_student from './add_student';
import User_Dashboard from './user_dashboard'
import Add_Marks from './add_marks';

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
         <Route exact path='/add_student' component={Add_student}/>
         <Route exact path='/user_dashboard' component={User_Dashboard}/>
  <Route exact path='/' component={Login}/> 
  <Route exact path='/student_details' component={Student_Details}/> 
      </div>
      </Router>
     
    );
  }
}

export default App;
