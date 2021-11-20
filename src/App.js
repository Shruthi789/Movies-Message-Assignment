// import logo from './logo.svg';
import {MoviesList} from './Movies/MoviesDisplay.js';
import {WrongURL} from './WrongURL.js';
import {Initial_Movies} from './Movies/Movies.js';
import {MoviesForm} from './Movies/MoviesForm.js';
import {AddColor} from './Color.js';
import {MovieTrailer} from './Movies/MovieTrailer.js';
import { Switch,Route,Redirect,useHistory } from "react-router-dom";
import {EditMovie} from './Movies/EditMovie.js';
import './App.css';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from '@mui/material/Button';


function App() {
  const [movies, setMovies]=useState(Initial_Movies);
  const [mode,setMode]=useState('light');
  const labels=["name","poster","summary","rating","cast","trailer"];
  const history=useHistory();
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const brightnessChange=()=>{const value=mode==='light'?'dark':'light'; setMode(value);};
  return (
    <ThemeProvider theme={theme}>
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className="navBar">
        <Button color="inherit" onClick={()=>{history.push('/')}} variant="text">Home</Button>
        <Button color="inherit"  onClick={()=>{history.push('/color-game')}} variant="text">Color Game</Button>
        <Button color="inherit"  onClick={()=>{history.push('/movies')}} variant="text">Movies List</Button>
        <Button color="inherit"  onClick={()=>{history.push('/movies/add')}} variant="text">Add Movies</Button>
        <IconButton aria-label="brightnessToggle" color="inherit" onClick={brightnessChange}>
         {(mode==='light')?<Brightness5Icon />:<Brightness4Icon />}
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
        <Route exact path="/movies"><MoviesList movies={movies} setMovies={setMovies}/></Route>
        <Route exact path="/films">
          <Redirect to="/movies"/>
        </Route>
       <Route path="/movies/add"><MoviesForm movies={movies} setMovies={setMovies} labels={labels}/></Route>
       <Route exact path="/films/add">
          <Redirect to="/movies/add"/>
        </Route>
       <Route path="/color-game">
       <AddColor/>
        </Route>
        <Route path="/movie-trailers/:id">
       <MovieTrailer list={movies}/>
        </Route>
        <Route path="/movies/edit/:id">
       <EditMovie movies={movies} setMovies={setMovies} labels={labels}/>
        </Route>
        <Route path="**">
       <WrongURL/>
        </Route>
       </Switch>
    </div>
    </ThemeProvider>
  );
}


export default App;
