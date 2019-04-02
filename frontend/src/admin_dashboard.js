import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import{
  BrowserRouter as Router,Route,Link,Redirect
} from"react-router-dom";
import './style.css';
export default class Admin_Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
           // open:false
        }
        // this.handleChange1=this.handleChange1.bind(this);
        // this.handleChange=this.handleChange.bind(this);
        // this.handleChange2=this.handleChange2.bind(this);
       }
       submit()
       {
         fetch('http://localhost:8000/mail',
         {
           method:'POST',
           headers:{
             Accept:'application/json',
             'Content-Type':'application/json'
           },
           body:JSON.stringify({
              name1:this.state.name,
              mail:this.state.email,
              empid:this.state.empid
              
           }),
          })
           .then((response) => response.json())
           .then((responseJson)=>{
             console.log(responseJson);
             this.setState({
                message1:responseJson.key
             })
           })
           .catch((error)=>{
             console.error(error);
           });console.log(this.state.message1);
           this.setState({ open: true })
          }
          handleChange(event){
            this.setState({
              empid:event.target.value
            })
          }
       handleChange1(event){
         this.setState({
           name:event.target.value
         })
       }
       handleChange2(event){
        this.setState({
            email:event.target.value
        })
      }
      handleClose (){
        this.setState({
          open:false})
      }
    
       render(){
        return (
            <div style={{height:"100vh"}}>
            <table className="body" style={{width:"100%",backgroundColor:'white',height:"100%"}}>
            <tr>

                <Typography style={{width:1400,height:70,color:"white"}}><h1>Exam Cell Automation</h1></Typography>
                <br/>
                <br/>
                
              
             <ul style={{listStyleType:"none"}}>
             <li style={{float:"left",marginLeft:10,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/admin_dashboard'}}><b>Home</b></Link></li>
             
              <li style={{float:"left",marginLeft:40,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_student'}}><b>Add Student</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_marks'}}><b>Add Marks</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>View Student</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Add Admin</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_notice'}}><b>Add Notice</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Logout</b></Link></li>
              
        </ul>
         </tr>
         <tr>
             <Card style={{backgroundColor:"grey", height:100,width:"100%",opacity:0.5}}>
                 <marquee style={{color:"black",marginTop:40,fontSize:"x-large"}}><i><b>Welcome Admin</b></i></marquee>
             </Card>
         </tr>
        
         </table>
         </div>
        );
      }}
