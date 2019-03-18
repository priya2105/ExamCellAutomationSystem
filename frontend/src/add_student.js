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
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import{
  BrowserRouter as Router,Route,Link,Redirect
} from"react-router-dom";
import './style.css';
export default class Add_student extends Component {
    constructor(props){
        super(props);
        this.state={
          email:"",
          id1:"",
          message:"",
          loading:false,
          open:false
        }
        this.handleChange1=this.handleChange1.bind(this);
        this.handleChange=this.handleChange.bind(this);
       }
       submit()
       {
         this.setState({
         id1:"",
          email:"",
          loading:true,
          open:true
         })
         fetch('http://localhost:8000/add_student',
         {
           method:'POST',
           headers:{
             Accept:'application/json',
             'Content-Type':'application/json'
           },
           body:JSON.stringify({
             id1:this.state.id1,
             email:this.state.email
              
           }),
          })
           .then((response) => response.json())
           .then((responseJson)=>{
             console.log(responseJson);
             this.setState({
              message1:responseJson.result,
              message:responseJson.key,
              loading:responseJson.loading,

             })
           })
           .catch((error)=>{
             console.error(error);
           });console.log(this.state.message1);
           this.setState({ open: true })
          }
          handleChange(event){
            this.setState({
              id1:event.target.value
            })
          }
       handleChange1(event){
         this.setState({
          email:event.target.value
         })
       }
       handleClose (){
        this.setState({
          open:false,
          message:''})
          
      }
       render(){
        return (
            <div style={{height:"100vh"}}>
            <table className="body" style={{width:"100%",backgroundColor:'white',height:"100%"}}>
            <tr>

                <marquee style={{width:1400,height:70,color:"white"}}><h1>Exam Cell Automation</h1></marquee>
            <br/>
                <br/>
                
              
             <ul style={{listStyleType:"none"}}>
             <li style={{float:"left",marginLeft:10,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/admin_dashboard'}}><b>Home</b></Link></li>
             
              <li style={{float:"left",marginLeft:40,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_student'}}><b>Add Student</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_marks'}}><b>Add Marks</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>View Student</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Add Admin</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Logout</b></Link></li>
              
        </ul>
         </tr>
         <tr>
         <Grid container justify="center"> 
         <Card style={{height:200,width:220,margin:130,padding:60,background:"khadi",opacity:0.8,backgroundColor:"black" }}>
   <label  style={{color:"white"}} > Registration ID:<br></br> </label>
    <TextField value={this.state.id1} onChange={this.handleChange} style={{backgroundColor:"white"} }
          id="outlined-email-input"
          label="ID"
          type="text"
          name="ID"
          autoComplete="ID"
          margin="right"
          variant="outlined"
         
        ></TextField>
    <br></br>
    <br></br>
    <label  style={{color:"white" }}> Email-ID:<br></br></label>
    <TextField value={this.state.email} onChange={this.handleChange1} style={{backgroundColor:"white"}}
          id="outlined-email-input"
          label="Email"
          type="text"
          name="email"
          autoComplete="email"
          margin="right"
          variant="outlined"
        />
        <br></br>
        <br></br>
   <CardActions>
       <Grid container justify="center">
       <Button variant="outlined" size="medium" color="primary" marginBottom=" 12" marginLeft="100" style={{marginRight:20,color:"white"}} onClick={this.submit.bind(this)}>
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
          <DialogTitle>{this.state.message}</DialogTitle>
          <DialogActions>
            
            <Button onClick={this.handleClose.bind(this)} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        </Grid>
      </CardActions>
     </Card>
       </Grid>
       </tr></table>
 </div>
       
        );
      }}
