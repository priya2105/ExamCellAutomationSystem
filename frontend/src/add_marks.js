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
import { timingSafeEqual } from 'crypto';
export default class Add_Marks extends Component {
    constructor(props){
        super(props);
        this.state={
           semesters:["1st","2nd","3rd","4th","5th","6th","7th","8th"],
           semester:"",
           int1:0,
           int2:0,
           quiz:0,
           surprise:0,
           attendance:0,
           id:"",
           total:0,
           sub1:["c_programming","Applied_mathematics I","Basic_Civil_Engineering","Applied_chemistry","English_Communication","Professional_Ethics"],
           sub2:["Data_Structue","Basic_electrical_engg","Applied_mathematics_II","Basic_mechanical_engg","EVS","Applied_physics"],
           sub3:["Discrete Structure","System Programming"],
           sub4:["FLAT","DAA"],
           sub5:["Ecom","OS"],
           sub6:["CNDC","IWT"],
           sub7:["Soft Computing","IOT"],
           sub8:["OE1","OE2"],
           sub:[],
           regdid:[],
           subject:"",
        }
        // this.handleChange1=this.handleChange1.bind(this);
        // this.handleChange=this.handleChange.bind(this);
        // this.handleChange2=this.handleChange2.bind(this);
       }
    sem(event){
      fetch('http://localhost:8000/semester',
      {
         method:'POST',
         headers:{
           Accept:'application/json',
           'Content-Type':'application/json'
         },
         
         body:JSON.stringify({
            semester:event.target.value
         }),

         
     })
       
      .then((response) => response.json())
      .then((responseJson) => {
      
    
      console.log(responseJson);
       this.setState({
        regdid:responseJson.result
        
      })
     
      
     
    })
      
      .catch((error) =>{
        console.error(error);
      }); console.log(this.state.usrname);
     
      console.log(this.state.regdid)
this.setState({
semester:event.target.value
})
if(event.target.value=="1st"){
    this.setState({
           sub:this.state.sub1
    })
}
else if(event.target.value=="2nd"){
    this.setState({
        sub:this.state.sub2
 })
}
else if(event.target.value=="3rd"){
    this.setState({
        sub:this.state.sub3
 })
}else if(event.target.value=="4th"){
    this.setState({
        sub:this.state.sub4
 })
}
else if(event.target.value=="5th"){
    this.setState({
        sub:this.state.sub5
 })
}
else if(event.target.value=="6th"){
    this.setState({
        sub:this.state.sub6
 })
}
else if(event.target.value=="7th"){
    this.setState({
        sub:this.state.sub7
 })
}
else if(event.target.value=="8th"){
    this.setState({
        sub:this.state.sub8
 })
}
    }
    regid(event){
      this.setState({
        id:event.target.value
      })
  }
    subject(event){
        this.setState({
            subject:event.target.value
        })
    }
    clear(){
      this.setState({
        subject:"",
        semester:"",
        id:"",
        int1:0,
           int2:0,
           quiz:0,
           surprise:0,
           attendance:0,
           total:0,
    })
    }
    int1(event){
        
        this.setState({
            int1:event.target.value
            });
            this.state.total=parseInt(event.target.value)+parseInt(this.state.int2)+parseInt(this.state.quiz)+parseInt(this.state.surprise)+parseInt(this.state.attendance)
            this.setState({
                //total:this.state.int1+this.state.int2+this.state.quiz+this.state.surprise+this.state.attendance,
                total:this.state.total
                });
                console.log(this.state.int1);
                console.log(this.state.total);
    }
    int2(event){
        
        this.setState({
            int2:event.target.value
            });
            this.state.total=parseInt(this.state.int1)+parseInt(event.target.value)+parseInt(this.state.quiz)+parseInt(this.state.surprise)+parseInt(this.state.attendance)
            this.setState({
               // total:this.state.int1+this.state.int2+this.state.quiz+this.state.surprise+this.state.attendance,
                total:this.state.total
                });
                console.log(this.state.int2);
                console.log(this.state.total);
    }
    quiz(event){
       
        this.setState({
            quiz:event.target.value
            });
            this.state.total=parseInt(this.state.int1)+parseInt(this.state.int2)+parseInt(event.target.value)+parseInt(this.state.surprise)+parseInt(this.state.attendance)
            this.setState({
              //  total:this.state.int1+this.state.int2+this.state.quiz+this.state.surprise+this.state.attendance,
                total:this.state.total
                });
                console.log(this.state.total);
    }
    surprise(event){
       
        this.setState({
            surprise:event.target.value
            });
            this.state.total=parseInt(this.state.int1)+parseInt(this.state.int2)+parseInt(this.state.quiz)+parseInt(event.targetvalue)+parseInt(this.state.attendance)
            this.setState({
              //  total:this.state.int1+this.state.int2+this.state.quiz+this.state.surprise+this.state.attendance,
                total:this.state.total
                });
                console.log(this.state.total);
    }
    attendance(event){
       
        this.setState({
            attendance:event.target.value
            });
            this.state.total=parseInt(this.state.int1)+parseInt(this.state.int2)+parseInt(this.state.quiz)+parseInt(this.state.surprise)+parseInt(event.target.value)
            this.setState({
                total:this.state.total
                });console.log(this.state.total);
    }
    submit(){
        fetch('http://localhost:8000/addmarks',
        {
           method:'POST',
           headers:{
             Accept:'application/json',
             'Content-Type':'application/json'
           },
           
           body:JSON.stringify({
              semester:this.state.semester,
              id:this.state.id,
              subject:this.state.subject,
              int1:this.state.int1,
              int2:this.state.int2,
              quiz:this.state.quiz,
              surprise:this.state.surprise,
              attendance:this.state.attendance,
              total:this.state.total
           }),

           
       })
         
        .then((response) => response.json())
        .then((responseJson) => {
        
      
        console.log(responseJson);
         this.setState({
          
        })
       
        
       
      })
        
        .catch((error) =>{
          console.error(error);
        }); console.log(this.state.usrname);
       
       
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
              
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Logout</b></Link></li>
              
        </ul>
         </tr>
         <tr><Card style={{backgroundColor:"black", height:300,width:"70%",marginLeft:220,opacity:0.7}}>
         <br></br>
         <Grid container justify="center"></Grid>
        <Grid container justify="center" spacing={24}>
        <Grid item xs={12}>
        <TextField
          id="semester"
          label="semester"
          select
          placeholder=""
          value={this.state.semester}
          onChange={this.sem.bind(this)}
          style={{marginLeft:10, width:175,backgroundColor:"white"}}
        >
       {this.state.semesters.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
           
        </TextField>
        <TextField
          id="student_id"
          label="Student_ID"
          select
          placeholder="Select"
          value={this.state.id}
          onChange={this.regid.bind(this)}

          style={{marginLeft:10, width:175,backgroundColor:"white"}}
        >
          {this.state.regdid.map(option => (
            <MenuItem key={option.RegdID} value={option.RegdID}>
              {option.RegdID}
            </MenuItem>
          ))}
        
        </TextField>
        <TextField
          id="subject"
          label="Subject"
          select
          placeholder="Select"
         
          value={this.state.subject}
          onChange={this.subject.bind(this)}
          style={{marginLeft:10, width:175,backgroundColor:"white"}}
        >
        {this.state.sub.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        
        </TextField>
        <br></br>
        <hr></hr>
        </Grid> 
        </Grid>
        <Grid container spacing={12}>
        <Grid container justify="center" textAlign="center" xs={2}  >
        <label style={{color:"white"}}>Internal1</label>
        </Grid>
        <Grid container justify="center" textAlign="center" xs={2}>
        <label style={{color:"white"}}>Internal2</label>
        </Grid>
        <Grid container justify="center" textAlign="center" xs={2} >
        <label style={{color:"white"}}>Quiz</label>
        </Grid>
        <Grid container justify="center"textAlign="center" xs={2}>
        <label style={{color:"white"}}>Surprise Test</label>
        </Grid>
        <Grid container justify="center" textAlign="center" xs={2}>
        <label style={{color:"white"}}>Attendance</label>
        </Grid>
        
        <Grid container justify="center" textAlign="center" xs={2}>
        <label style={{color:"white"}}>Total</label>
        </Grid>
        <br></br>
        <br></br>
        </Grid>
        <Grid container spacing={12}>
        <Grid container justify="center" textAlign="center" xs={2}  >
       <TextField  value={this.state.int1} onChange={this.int1.bind(this)} style={{marginLeft:10, width:120,backgroundColor:"white"}}></TextField>
        </Grid>
        <Grid container justify="center" textAlign="center" xs={2}>
        <TextField  value={this.state.int2} onChange={this.int2.bind(this)} style={{marginLeft:10, width:120,backgroundColor:"white"}}></TextField>
        </Grid>
        <Grid container justify="center" textAlign="center" xs={2} >
        <TextField  value={this.state.quiz} onChange={this.quiz.bind(this)} style={{marginLeft:10, width:120,backgroundColor:"white"}}></TextField>
        </Grid>
        <Grid container justify="center"textAlign="center" xs={2}>
        <TextField  value={this.state.surprise} onChange={this.surprise.bind(this)} style={{marginLeft:10, width:120,backgroundColor:"white"}}></TextField>
        </Grid>
        <Grid container justify="center" textAlign="center" xs={2}>
        <TextField  value={this.state.attendance} onChange={this.attendance.bind(this)} style={{marginLeft:10, width:120,backgroundColor:"white"}}></TextField>
        </Grid>
        
        <Grid container justify="center" textAlign="center" xs={2}>
         <label style={{color:"white"}}>{this.state.total}</label>
        </Grid>
       
        </Grid>
        <br></br>
         <br></br>
         
        
        <Button style={{marginTop:10, fontSize:12,color:"black",marginLeft:30, backgroundColor:"grey"}} onClick={this.submit.bind(this)} >Submit</Button>
        <Button style={{marginTop:10, fontSize:12,color:"black",marginLeft:60, backgroundColor:"grey"}} onClick={this.clear.bind(this)} >Clear</Button>
        
        </Card>
         </tr>
         <br></br>
         <br></br>
        
         </table>
         </div>
        );
      }}
