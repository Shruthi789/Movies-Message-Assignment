import {MoviesList} from './Movies/MoviesDisplay.js';
import {WrongURL} from './WrongURL.js';
import {AddMovie} from './Movies/AddMovie.js';
import {MovieTrailer} from './Movies/MovieTrailer.js';
import { Switch,Route,Redirect,useHistory } from "react-router-dom";
import {EditMovie} from './Movies/EditMovie.js';
import './App.css';
import { useState,createContext,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {API} from './Movies/APIInfo.js'

export const moviesContext= createContext({});
 

function App() {
  const [mode,setMode]=useState('light');
  const [movies, setMovies]=useState([]);
  const getMovies=()=>{
      fetch(`${API}/movies`,{
        method:'GET',
           headers:{
       'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU1ODFmNmM2YWJmYzBjNmI5NmY4OCIsImlhdCI6MTY0MzQ2OTI5M30.f60i4OFqYtX0zwQYXFRFLGUTYtn2tezkFemuiLeFeVA'
    }
   })
      .then((res)=>res.json())
      .then((data)=>setMovies(data))
      .catch((error)=>console.log(error));
   };
  useEffect(getMovies,[]);
  const obj={movies,getMovies};
  const history=useHistory();
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const brightnessChange=()=>{const value=mode==='light'?'dark':'light'; setMode(value);};
  const paperStyle={borderRadius:"0px",
    minHeight:"100vh"};
  
  return (
    <ThemeProvider theme={theme}>
     <moviesContext.Provider value={obj}>
    <Paper elevation={4} style={paperStyle}>
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className="navBar">
        <Button color="inherit" onClick={()=>{history.push('/')}} variant="text">Home</Button>
        <Button color="inherit"  onClick={()=>{history.push('/movies')}} variant="text">Movies List</Button>
        <Button color="inherit"  onClick={()=>{history.push('/movies/add')}} variant="text">Add Movies</Button>
        <IconButton aria-label="brightnessToggle" color="inherit" onClick={brightnessChange}>
         {(mode==='light')?<Brightness4Icon />:<Brightness5Icon />}
        </IconButton>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
       
       <Switch>
       <Route exact path="/">
         <br/>
         <h1 className="heading">Welcome to the Movies Dashboard!</h1>
        </Route>
        <Route exact path="/movies"><MoviesList/></Route>
        <Route exact path="/films">
          <Redirect to="/movies"/>
        </Route>
       <Route path="/movies/add"><AddMovie/></Route>
       <Route exact path="/films/add">
          <Redirect to="/movies/add"/>
        </Route>
        <Route path="/movie-trailers/:id">
       <MovieTrailer/>
        </Route>
        <Route path="/movies/edit/:id">
       <EditMovie/>
        </Route>
       <Route path="**">
       <WrongURL/>
        </Route>
       </Switch>
    </div>
    </Paper>
    </moviesContext.Provider>
    </ThemeProvider>
  );
}


export default App;
