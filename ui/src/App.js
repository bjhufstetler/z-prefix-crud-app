import React from 'react';
import {Button, TextField} from '@mui/material'
import './App.css'

export const App = () => {
  return(
    <>
      <div>
        <TextField 
          id='username'
          label="Username:"
          variant='outlined'
          defaultValue="Username"/>
      </div>
      <div>
        <TextField 
          label="Password:"
          variant='outlined'
          defaultValue="********"/>
      </div>
      <div>
        <Button
        variant='contained'>
          Login
        </Button>
      </div>
      <div>
        <Button
        variant='contained'>
          Create
        </Button>
      </div>
    </>
  )
};