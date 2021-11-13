// import logo from './logo.svg';
import {MoviesList} from './MoviesDisplay.js';
import {WrongURL} from './WrongURL.js';
import {Initial_Movies} from './Movies.js';
import {MoviesForm} from './MoviesForm.js';
import {AddColor} from './Color.js';
import {MovieTrailer} from './MovieTrailer.js';
import { Switch,Route,Link,Redirect } from "react-router-dom";
import {EditMovie} from './EditMovie.js';
import {DeleteMovie} from './DeleteMovie.js';
import './App.css';

function App() {
  return (
    <div>
       <ul className="navBar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/color-game">Color Game
           </Link></li>
        <li><Link to="/movies">Movies List</Link></li>
        <li><Link to="/movies/add">Add Movies</Link></li>
      </ul>
       <Switch>
       <Route exact path="/">
         <br/>
         <h1 className="heading">Welcome to the Movies Dashboard!</h1>
        </Route>
        <Route exact path="/movies"><MoviesList list={Initial_Movies}/></Route>
        <Route exact path="/films">
          <Redirect to="/movies"/>
        </Route>
       <Route path="/movies/add"><MoviesForm list={Initial_Movies}/></Route>
       <Route exact path="/films/add">
          <Redirect to="/movies/add"/>
        </Route>
       <Route path="/color-game">
       <AddColor/>
        </Route>
        <Route path="/movie-trailers/:id">
       <MovieTrailer list={Initial_Movies}/>
        </Route>
        <Route path="/movies/edit/:id">
       <EditMovie list={Initial_Movies}/>
        </Route>
        <Route path="/movies/delete/:id">
       <DeleteMovie list={Initial_Movies}/>
        </Route>
        <Route path="**">
       <WrongURL/>
        </Route>
       </Switch>
    </div>
  );
}


export default App;
