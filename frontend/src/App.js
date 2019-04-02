import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Admin_Dashboard from './admin_dashboard';
import View_Marks from './view_marks'
import Add_student from './add_student';
import User_Dashboard from './user_dashboard'
import Add_Marks from './add_marks';
import Add_Notice from './add_notice';
import View_Notice from './view_notice';
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
         <Route exact path='/add_marks' component={Add_Marks}/>
         <Route exact path='/view_marks' component={View_Marks}/>
         <Route exact path='/user_dashboard' component={User_Dashboard}/>
  <Route exact path='/' component={Login}/> 
  <Route exact path='/student_details' component={Student_Details}/> 
  <Route exact path='/add_notice' component={Add_Notice}/> 
  <Route exact path='/view_notice' component={View_Notice}/>
  
      </div>
      </Router>
     
    );
  }
}

export default App;
