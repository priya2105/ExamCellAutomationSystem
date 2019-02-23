import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import{
    BrowserRouter as Router,Route,Link,Redirect
  } from"react-router-dom";
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
    id:'',
    password:'',
    id1:'',
    password1:'',
    redirect1: false,
    redirect2: false,
    key:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
   }
   submit(){
    fetch('http://localhost:8000/login',
                 {
                    method:'POST',
                    headers:{
                      Accept:'application/json',
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        id:this.state.id1,
                        password:this.state.password1,
                       redirect1:this.state.redirect1,
                       redirect2:this.state.redirect2
                         }),
                    })
                  .then((response) => response.json())
                 .then((responseJson) => {
                 console.log(responseJson);
                  this.setState({
                    redirect1:responseJson.result1,
                    redirect2:responseJson.result2,
                    key:responseJson.result,
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
      id1: event.target.value
    })
    console.log(this.state.id1);
     }
    handleChange1(event) {
      this.setState({
        password1: event.target.value
      })}
render(){
     if (this.state.redirect1 == true) {
         return <Redirect to={{
           pathname: '/admin_dashboard',
           state: {
           // id1:this.state.id1,
             //password1: this.state.password1
           }
         }} />
      }
      else if (this.state.redirect2 == true) {
        return <Redirect to={{
          pathname: '/user_dashboard',
        
        }} />
      }
  return (
    <div>
      <Grid container justify="center" style={{ background: 'url(https://images.unsplash.com/photo-1460518451285-97b6aa326961?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: 657}}>
         <marquee style={{width:1400,height:60,color:"white"}}><h1>EXAM CELL AUTOMATION</h1></marquee>
      <Card style={{height:200,width:220,margin:130,padding:60,background:"khadi",opacity:0.8,backgroundColor:"black" }}>
   <label  style={{color:"white"}} > ID:<br></br> </label>
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
    <label  style={{color:"white" }}> Password:<br></br></label>
    <TextField value={this.state.password1} onChange={this.handleChange1} style={{backgroundColor:"white"}}
          id="outlined-email-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="password"
          margin="password"
          variant="outlined"
        />
        <br></br>
        <br></br>
   <CardActions>
       <Grid container justify="center">
       <Button variant="outlined" size="medium" color="primary" marginBottom=" 12" style={{marginRight:20,color:"white"}} onClick={this.submit.bind(this)}>
          Login
        </Button>
       
        </Grid>
      </CardActions>
      </Card>
    </Grid>
    </div>
  );
}}
  