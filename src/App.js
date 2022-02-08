import { Switch,Route,Redirect } from "react-router-dom";
//import { useState } from 'react';
import {Home} from './Movies/Home';
import {Login} from './Users/Login';
import {SignUp} from './Users/SignUp';
import {ForgotPassword} from './Users/ForgotPassword';
import Paper from '@mui/material/Paper';


function App() {
  const paperStyle={borderRadius:"0px",
  minHeight:"100vh"};

  return (
    <Paper elevation={4} style={paperStyle}>
    <div>
       
       <Switch>
        <Route exact path="/"><Login/></Route>
        <Route exact path="/movies/home">
           <Home/>
        </Route>
        <Route exact path="/films/home">
          <Redirect to="/movies/home"/>
        </Route>
       <Route path="/signup"><SignUp/></Route>
        <Route path="/forgotpassword">
       <ForgotPassword/>
        </Route>
       </Switch>
    </div>
    </Paper>
  );
}


export default App;
