import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import{
    BrowserRouter as Router,Route,Link,Redirect
  } from"react-router-dom";
export default class View_Notice extends Component {
  constructor(props){
    super(props);
    this.state={
    notice:"",
    date:""
    }
   
   }
   notice(event){
       this.setState({
       notice:event.target.value

       })
   }
   date(event){
    this.setState({
    date:event.target.value

    })
}
   submit(){
    fetch('http://localhost:8000/addnotice',
                 {
                    method:'POST',
                    headers:{
                      Accept:'application/json',
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        notice:this.state.notice,
                        date:this.state.date
                       
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
                 }); 
                 console.log(this.state.id1);
                 console.log(this.state.password1);
  }
  handleChange(event) {
    this.setState({
    
    })
    
     }
   
  
render(){
     
      return (
        <div>
          <Grid container justify="center" style={{ background: 'url(https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: 750}}>
             <marquee style={{width:1400,height:60,color:"white"}}><h1>EXAM CELL AUTOMATION</h1></marquee>
             <br/>
                <br/>
                
              
             <ul style={{listStyleType:"none"}}>
             <li style={{float:"left",marginLeft:10,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/admin_dashboard'}}><b>Home</b></Link></li>
             
              <li style={{float:"left",marginLeft:40,}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_student'}}><b>Add Student</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/add_marks'}}><b>Add Marks</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>View Student</b></Link></li>
              <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Add Admin</b></Link></li>
              
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'addnotice'}}><b>Notice Board</b></Link></li>
               <li style={{float:"left",marginLeft:50}}><Link style={{color:"white",textDecoration:"none"}} to={{pathname:'/'}}><b>Logout</b></Link></li>
              
        </ul>
        
          <Card style={{height:200,width:220,margin:130,marginTop:50,padding:60,background:"khadi",opacity:0.8,backgroundColor:"black" }}>
       <label  style={{color:"white"}} > View Notice:<br></br><br></br> </label>
       <label  style={{color:"white" }}> Date:
    <TextField value={this.state.date} onChange={this.date.bind(this)} style={{backgroundColor:"white",height:40,width:100} }
          id="outlined-email-input"
          label=""
          type="Date"
         
          name=""
          autoComplete=""
          margin=""
          variant="outlined"
        />
        <br></br></label>
        {/* <textarea name="body"
                    onChange={this.notice.bind(this)}
                    value={this.state.notice} style={{backgroundColor:"white",height:200,width:210} } 
              label="Notice"
              type="text"
              name=""
              autoComplete=""
              margin="right"
            //   variant="outlined"
             
            ></textarea> */}

        <br></br>
       <br></br>
       
        
       <CardActions>
           <Grid container justify="center">
           <Button variant="outlined" size="medium" color="primary" marginBottom=" 12" style={{marginRight:20,color:"white"}} onClick={this.submit.bind(this)}>
              View Notice
            </Button>
           
            </Grid>
          </CardActions>
          </Card>
        </Grid>
        </div>
      );
    }}