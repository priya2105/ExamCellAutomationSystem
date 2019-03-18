import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';

import{
  BrowserRouter as Router,Route,Link,Redirect
} from"react-router-dom";
export default class Student_Details extends Component {
  constructor(props){
    super(props);
    this.state={
    id:'',
    name:'',
    email:'',
    phone:'',
    dept:'',
    sem:'',
    name1:'',
    id1:'',
    phone1:'',
    email1:'',
    sem1:["1st","2nd","3rd","4th","5th","6th","7th","8th"],
    dept1:'',
    open:false,
   // value1:this.props.location.state.value1,
   // value2:this.props.location.state.value2,
    loading:false,
    message1:'',
    query: 'idle',
    }
    this.handleChange1=this.handleChange1.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.handleChange3=this.handleChange3.bind(this);
    this.handleChange4=this.handleChange4.bind(this);
    this.handleChange5=this.handleChange5.bind(this);
    this.handleChange6=this.handleChange6.bind(this);
   }
  
   submit()
   {
     this.setState({
      loading:true,
      open:true,
      id1:"",
      name1:"",
      phone1:"",
      dept1:"",
      email1:"",
      sem:""

     })
     fetch('http://localhost:8000/details',
     {
       method:'POST',
       headers:{
         Accept:'application/json',
         'Content-Type':'application/json'
       },
       body:JSON.stringify({
          id:this.state.id1,
          name:this.state.name1,
          phone:this.state.phone1,
          email:this.state.email1,
          dept:this.state.dept1,
          sem:this.state.sem
       }),
      })
       .then((response) => response.json())
       .then((responseJson)=>{
         console.log(responseJson);
         this.setState({
            loading:responseJson.loading,
            message1:responseJson.result,
         })
       })
       .catch((error)=>{
         console.error(error);
       });console.log(this.state.message1);
       this.setState({ open: true })
      }
handleChange1(event){
    this.setState({
      id1:event.target.value
    })
}
handleChange2(event){
    this.setState({
      name1:event.target.value
    })
}
   handleChange3(event){
     this.setState({
       phone1:event.target.value
     })
  }
  handleChange4(event){
    this.setState({
      email1:event.target.value
    })
}
handleChange5(event){
    this.setState({
      dept1:event.target.value
    })
}
handleChange6(event){
    this.setState({
      sem:event.target.value
    })
}
  handleClose (){
    this.setState({
      open:false,
     
    })
 }
render(){
  return (
    <div style={{height:"100vh"}}>
    <table className="body" style={{width:"100%",backgroundColor:'white',height:"100%"}}>
    <tr>

        <marquee style={{width:1400,height:70,color:"white"}}><h1>Exam Cell Automation</h1></marquee>
     
     <ul style={{listStyleType:"none"}}>
      <li style={{float:"left",marginLeft:10,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/user_dashboard'}}><b>Home</b></Link></li>
      <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/student_details'}}><b>Add Details</b></Link></li>
       <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>View Marks</b></Link></li>
      <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Notice Board</b></Link></li>
      
       <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Logout</b></Link></li>
      
</ul>
 </tr>
 <br/>
 <tr>
 <Card  style={{backgroundColor:"black",height:620,width:220,marginLeft:500,padding:60,opacity:0.7, paddingTop:15}}>
 <Grid container justify="center"><h3 style={{marginTop:"0",color:"White"}}>Student Details</h3></Grid>
<label style={{color:"white"}}>Student ID:<br></br> </label>
 <TextField style={{backgroundColor:"white"}} value={this.state.id1} onChange={this.handleChange1}
       id="outlined-email-input"
       placeholder="Student ID"
       type="text"
       name="Student ID"
       autoComplete="Student ID"
       margin="right"
       variant="outlined"
     />
 <br></br>
 <br></br>
 <label style={{color:"white"}}> Student Name:<br></br></label>
 <TextField style={{backgroundColor:"white"}} value={this.state.name1} onChange={this.handleChange2}
       id="outlined-email-input"
       placeholder="Student Name"
       type="text"
       name="Student Name"         
       autoComplete="Student Name"
       margin="Student Name"
       variant="outlined"
      
     />
     <br></br>
     <br></br>
     <label style={{color:"white"}}>Phone Number:<br></br></label>
 <TextField style={{backgroundColor:"white"}} value={this.state.phone1} onChange={this.handleChange3}
       id="outlined-email-input"
       placeholder="Phone Number"
       type="text"
       name="Phone Number"
       autoComplete="Phone Number"
       margin="Phone Number"
       variant="outlined"
     />
     <br></br>
     <br></br>
     <label style={{color:"white"}}>Email:<br></br></label>
 <TextField style={{backgroundColor:"white"}} value={this.state.email1} onChange={this.handleChange4}
       id="outlined-email-input"
       placeholder="Email"
       type="text"
       name="Email"
       autoComplete="Email"
       margin="Email"
       variant="outlined"
      
     />
     <br></br>
     <br></br>
     <label style={{color:"white"}}>Department:<br></br></label> 
 <TextField style={{backgroundColor:"white"}} value={this.state.dept1} onChange={this.handleChange5}
       id="outlined-email-input"
       placeholder="Department"
       type="text"
       name="Department"
       autoComplete="Department"
       margin="Department"
       variant="outlined"
     />
     <br></br>
     <br></br>
     <label style={{color:"white"}}>Semester:<br></br></label>
 <TextField style={{backgroundColor:"white",width:222}} value={this.state.sem} onChange={this.handleChange6}
       id="outlined-email-input"
       placeholder="Semester"
       select
       type="text"
       name="Semester"
       autoComplete="Semester"
       margin="Semester"
       variant="outlined"
     >
     {this.state.sem1.map(option => (
        <MenuItem key={option} value={option}>
        {option}
        </MenuItem>))}
        </TextField>
     <br></br>
     <br></br>
<CardActions><Grid container justify="center">
<Button variant="outlined" size="medium" color="primary" marginBottom=" 12" style={{color:"white"}}  onClick={this.submit.bind(this)} >
       Submit
     </Button>
     <Dialog
          open={this.state.open}
          onClose={this.handleClose}>
           <Grid container justify='center' style={{marginTop:10}}>
           <Fade
            in={this.state.loading}
        
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
           </Grid>
          <DialogTitle>{this.state.message1}</DialogTitle>
          <DialogActions>
            
            <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog></Grid>
     
     <br></br>
     <br></br>
    
   
     
   </CardActions>
  
<CardContent>

      </CardContent>
   </Card>
 </tr>

 </table>
 </div>
  );
}}
  