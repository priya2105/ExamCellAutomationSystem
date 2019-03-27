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
export default class View_Marks extends Component {
    constructor(props){
        super(props);
        this.state={
           id:'',
           sem:'',
           shown:true,
           hidden:true,
           subject1:[],
           subject2:[],
           internal1:""
        }
         this.handlechange=this.handlechange.bind(this);
         this.handlechange1=this.handlechange1.bind(this);
        // this.handleChange2=this.handleChange2.bind(this);
       }
       show() {
        this.setState({
          show1: 'inline',
          show: 'none',
          empname: '',
          employee: '',
          hiden:false,
          shown: !this.state.shown,
          message:'',
        })
      }
       viewmarks()
       {
           this.setState({
      show1: 'none',
      show: 'inline'
    })
         fetch('http://localhost:8000/viewmarks',
         {
           method:'POST',
           headers:{
             Accept:'application/json',
             'Content-Type':'application/json'
           },
           body:JSON.stringify({
              id:this.state.id,
              sem:this.state.sem
              
           }),
          })
           .then((response) => response.json())
           .then((responseJson)=>{
             console.log(responseJson);
             this.setState({
                 shown:responseJson.shown,
                 message:responseJson.result,
                 subject1:responseJson.subject1,
                 subject2:responseJson.subject2,
                 internal1:responseJson.subject1[0].internal1
             })
           })
           .catch((error)=>{
             console.error(error);
            });console.log(this.state.internal1);
           
          
          }
          handlechange(event){
            this.setState({
              id:event.target.value
            })
          }
       handlechange1(event){
         this.setState({
           sem:event.target.value
         })
       }
       
    //   handleClose (){
    //     this.setState({
    //       open:false})
    //   }
    
       render(){
        var shown = {
            display: this.state.shown ? "block" : "none"
          };
      
          var hidden = {
            display: this.state.shown ? "none" : "block"
          }
        return (
            <div style={{height:"100vh"}}>
            <table className="body" style={{width:"100%",backgroundColor:'white',height:"100%"}}>
            <tr>

                <Typography style={{width:1400,height:70,color:"white"}}><h1>Exam Cell Automation</h1></Typography>
                <br/>
                <br/>
                
              
             <ul style={{listStyleType:"none"}}>
             <li style={{float:"left",marginLeft:10,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/user_dashboard', state:{id1:this.state.id1}}}><b>Home</b></Link></li>
             
              <li style={{float:"left",marginLeft:40,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/student_details', state:{id1:this.state.id1}}}><b>Add Details</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/', state:{id1:this.state.id1}}}><b>View Marks</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/', state:{id1:this.state.id1}}}><b>Notice</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/changepassuser', state:{id1:this.state.id1}}}><b>Change Password</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/', state:{id1:this.state.id1}}}><b>Logout</b></Link></li>
              
        </ul>
         </tr>
         <tr>
         <Grid container justify="center">
             <Card style={{height:250,width:180,padding:50, marginTop:0}}>
             <CardContent style={shown}>
      <Grid container justify="center">
      <h3>VIEW MARKS</h3>
    <TextField value={this.state.id} onChange={this.handlechange}
          id="outlined-email-input"
          label="ID"
          placeholder="Enter id"
          type="text"
          name="id"
          margin="id"
          variant="outlined"
        ></TextField>
        <br></br>
    
         <TextField value={this.state.sem} onChange={this.handlechange1}
          id="outlined-email-input"
          label="Semester"
          placeholder="sem"
          type="email"
          name="email"
          margin="password"
          variant="outlined"
        ></TextField>
        <br></br>
        </Grid>
   <CardActions>
          <Grid container justify="center">
            <Button variant="contained" size="small" color="primary" marginBottom=" 12"  onClick={this.viewmarks.bind(this)}>}> 
              Submit
            </Button>
             </Grid>
             </CardActions></CardContent>
             
                 <CardContent style={hidden}>

               <div> 
               {this.state.subject1.map(option => (
            <label>C_Programming:{option}</label>
           
          ))}
          </div>
      
           
       
                 </CardContent>
             </Card>
             </Grid>
         </tr>
        
         </table>
         </div>
        );
      }}
