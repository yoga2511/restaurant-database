import React, { Component,useState } from 'react'
import axios from "axios";
import {Avatar, Grid, TextField,Card,Button, Alert, LinearProgress} from '@mui/material';
import "./delete.css" ;
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
export default function DeleteRestaurant() {
    // const navigate=useNavigate();
    const[user,setUser]=useState({
        "id":""
    })
    const {id}=user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const x=user.id;
    await axios.delete(`http://localhost:8080/delete/${x}`);
    //   navigate("/Home");
  };
  return (
    <div><form onSubmit={(e) => onSubmit(e)}>
    <div className="cover">
        <h1>Delete Details</h1>
        <TextField fullwidth
            label="Id to be deleted"
            placeholder="Enter the id to be deleted"
            name="id"
            value={id}
            onChange={(e) => onInputChange(e)}
            InputProps={{
              style: { color: 'white' },
              classes: {
                input: 'white-placeholder' // CSS class for white placeholder text
              },
            }}
            InputLabelProps={{
              className: 'white-placeholder' // CSS class for white placeholder label
            }}
            style={{ width: '300px' }}/>
        <div style={{marginTop:50,marginLeft:-100}}>
        <button type="submit" className="login-btn" style={{backgroundColor:" #9D1D27",color:"white",paddingTop:"12px",fontSize:"large"}}>Delete</button>
        </div >        <div style={{marginTop:-37,marginLeft:100}}>

        <Link to='/lp'> <button type="submit" className="login-btn" style={{backgroundColor:" #9D1D27",color:"white",paddingTop:"12px",fontSize:"large"}}>Back</button></Link>
</div>
        </div >
        </form>
        </div>
  )
}