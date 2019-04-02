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
import MenuItem from '@material-ui/core/MenuItem';
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
           semester:["1","2","3","4","5","6","7","8"],
           shown:true,
           subject1:[],
           subject2:[],
           subject3:[],
           subject4:[],
           subject5:[],
           subject6:[]
          
        }
         this.handlechange=this.handlechange.bind(this);
         this.handlechange1=this.handlechange1.bind(this);
        // this.handleChange2=this.handleChange2.bind(this);
       }
       
       viewmarks()
       {
           this.setState({
            shown: !this.state.shown
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
                 
                 message:responseJson.result,
                 subject1:responseJson.result1,
                 subject2:responseJson.result2,
                 subject3:responseJson.result3,
                 subject4:responseJson.result4,
                 subject5:responseJson.result5,
                 subject6:responseJson.result6
                
             })
           })
           .catch((error)=>{
             console.error(error);
            });console.log(this.state.subject1);
            this.setState({
              shown: !this.state.shown,
            });
          
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
         <tr><div>
         <Grid container justify="center">
             
           <Card style={shown }>  <CardContent style={{height:250,width:380, marginTop:0}}>
      <Grid container justify="center">
      <h3>VIEW MARKS</h3></Grid>

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
          select
          placeholder="sem"
          type="email"
          name="email"
          margin="password"
          variant="outlined"
          style={{width:210}}
        >  {this.state.semester.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}</TextField>
        <br></br>
        
   <CardActions>
          <Grid container justify="center">
            <Button variant="contained" size="small" color="primary" marginBottom=" 12"  onClick={this.viewmarks.bind(this)}> 
              Submit
            </Button>
             </Grid>
             </CardActions></CardContent></Card>
             
             <Card  style={hidden}>   <CardContent style={{height:350,width:800, marginTop:0}}>
               <h1>SEMESTER-1</h1>
               <div> 
               <table style={{width:"100%"}}>
  <tr>
    <th>Marks</th>
    <th>c_programming</th> 
    <th>applied_maths1</th>
    <th>bce</th>
    <th>applied_chem</th>
    <th>english</th>
    <th>professional_ethics</th>
  </tr>
  <tr>
    <td>internal1</td>
    <td> {this.state.subject1[0]}   </td> 
    <td> {this.state.subject2[0]}   </td> 
    <td> {this.state.subject3[0]}   </td> 
    <td> {this.state.subject4[0]}   </td> 
    <td> {this.state.subject5[0]}   </td> 
    <td> {this.state.subject6[0]}   </td> 
  </tr>
  <tr>
    <td>internal2</td>
    <td>{this.state.subject1[1]}</td>
    <td> {this.state.subject2[1]}   </td> 
    <td> {this.state.subject3[1]}   </td> 
    <td>{this.state.subject4[1]}</td>
    <td> {this.state.subject5[1]}   </td> 
    <td> {this.state.subject6[1]}   </td> 
  </tr>
  <tr>
    <td>quiz</td>
    <td>{this.state.subject1[2]}</td> 
    <td> {this.state.subject2[2]}   </td> 
    <td> {this.state.subject3[2]}   </td> 
    <td>{this.state.subject4[2]}</td> 
    <td> {this.state.subject5[2]}   </td> 
    <td> {this.state.subject6[2]}   </td> 
  </tr>
  <tr>
    <td>surprise_test</td>
    <td>{this.state.subject1[3]}</td>
    <td> {this.state.subject2[3]}   </td> 
    <td> {this.state.subject3[3]}   </td> 
    <td>{this.state.subject4[3]}</td>
    <td> {this.state.subject5[3]}   </td> 
    <td> {this.state.subject6[3]}   </td> 
  </tr>
  <tr>
    <td>assignment</td>
    <td>{this.state.subject1[4]}</td>
    <td> {this.state.subject2[4]}   </td> 
    <td> {this.state.subject3[4]}   </td> 
    <td>{this.state.subject4[4]}</td>
    <td> {this.state.subject5[4]}   </td> 
    <td> {this.state.subject6[4]}   </td> 
  </tr>
  <tr>
    <td>attendence</td>
    <td>{this.state.subject1[5]}</td>
    <td> {this.state.subject2[5]}   </td> 
    <td> {this.state.subject3[5]}   </td> 
    <td>{this.state.subject4[5]}</td>
    <td> {this.state.subject5[5]}   </td> 
    <td> {this.state.subject6[5]}   </td> 
  </tr>
</table>
          </div>
                 </CardContent></Card> 
             
             </Grid>
             </div></tr>
        
         </table>
         </div>
        );
      }}
