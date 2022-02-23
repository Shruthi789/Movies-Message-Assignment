import { Route,Switch,useHistory,useRouteMatch } from "react-router-dom";
import { useState,createContext,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from '@mui/material/Button';
import {API} from '../APIInfo.js'
import {MoviesList} from './MoviesDisplay.js';
import {EditMovie} from './EditMovie.js';
import {AddMovie} from './AddMovie.js';
import {MovieTrailer} from './MovieTrailer.js';
import {WrongURL} from '../WrongURL.js';
import Paper from '@mui/material/Paper';

export const moviesContext= createContext({});


function Home() {
  const [mode,setMode]=useState('light');
  const [movies, setMovies]=useState([]);
  const getMovies=()=>{
      fetch(`${API}/movies`,{
        method:'GET',
           headers:{
       'x-auth-token':localStorage.getItem('token'),
       'role':localStorage.getItem('type')
    }
   })
      .then((res)=>res.json())
      .then((data)=>setMovies(data))
      .catch((error)=>console.log(error));
   };
  useEffect(getMovies,[]);
  const {path,url} = useRouteMatch();
  const obj={movies,getMovies,setMovies,url};
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
      <Paper elevation={4} style={paperStyle}>
     <moviesContext.Provider value={obj}>
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div className="navBar">
         <h4>Hi, {localStorage.getItem('name')}!</h4>
        <Button color="inherit"  onClick={()=>{history.push(`${url}`)}} variant="text">Movies List</Button>
        {localStorage.getItem('type')==='Admin'?<Button color="inherit"  onClick={()=>{history.push(`${url}/add`)}} variant="text">Add Movies</Button>:" "}
        <IconButton aria-label="brightnessToggle" color="inherit" onClick={brightnessChange}>
         {(mode==='light')?<Brightness4Icon />:<Brightness5Icon />}
        </IconButton>
        <Button color="inherit"  onClick={()=>{history.push('/')}} variant="text">Log Out</Button>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Switch>
    <Route exact path={path}>
        <MoviesList/>
      </Route>
      <Route path={`${path}/add`}>
          <AddMovie/>
        </Route>
        <Route path={`${path}/edit/:id`}>
          <EditMovie/>
        </Route>
        <Route path={`${path}/movie-trailers/:id`}>
          <MovieTrailer/>
        </Route>
        <Route path={`${path}/**`}>
          <WrongURL/>
        </Route>
    </Switch>
    </div>
    </moviesContext.Provider>
    </Paper>
    </ThemeProvider>
  );
}




export {Home};
