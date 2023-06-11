import React from 'react';
import './home.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <>
    <div className='home1'>      
      <div className='head1'>
        <h1>The Restaurant Database</h1>
      </div>
      <div className='buttons'>
        
        <Button variant='contained' color='warning'><Link to='/lg'>Login</Link></Button>
        <Button variant='contained' color='warning'><Link to='/su'>Signup</Link></Button>
        <Button variant='contained' color='warning'><Link to='/lp'>Restaurant Details</Link></Button>

      </div>
    </div>


    </>

  );
}

export default Navigation;
