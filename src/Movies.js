import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.css';
/*Movies Component*/
function Movies({ name, poster, summary, rating, cast }) {
  const [showSummary,setSummary]=useState(false);
  const [showCast,setCast]=useState(false);
  return (
    <div className="movie-data">
      <img src={poster} className="movie-poster" alt="MovieImage" /> <br />
      <div className="movie-spec">
        <h4 className="movie-name">{name}</h4>
        <h4 className="movie-rating">⭐ {rating} </h4>
      </div>
      <div className="movie-info">
      <Button variant="contained" className="button-style" onClick={()=>{setSummary(!showSummary)}}>{showSummary?"Hide":"Show"} Summary</Button>
      {showSummary?<p className="movie-summary">{summary} </p>:""}<br/>
      <Button variant="contained" className="button-style" onClick={()=>{setCast(!showCast)}}>{showCast?"Hide":"Show"} Cast</Button>
      {showCast?<p className="movie-cast"> {cast} </p>:""}
      </div>
      <br/>
      <Counter />
    </div>
  );
}
/*Counter Component*/
function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setdisLike] = useState(0);
  return (<div className="like-button-style">
    <Button variant="text" onClick={() => setLike(like + 1)}>👍 {like}</Button>
    <Button variant="text" onClick={() => setdisLike(dislike + 1)}>👎 {dislike}</Button>
  </div>)
}
  /*Displaying the Movie components */
  function MoviesList({list}) {
    return (<div className="movies-arrangement">
      {list.map(({
        name,
        poster,
        summary,
        rating,
        cast
      },index) => <Movies key={index} name={name} poster={poster} summary={summary} rating={rating} cast={cast} />)}
    </div>);
  } 
  /*Input Component*/
  function FormInput({labelname,changeFn,value}){
    return(<div className="form-component">
      <label className="label-style">{labelname}:</label>
      <TextField id="outlined-required" label={labelname} name={labelname} onChange={changeFn} value={value[labelname]} required></TextField>
      </div>);
  }
 /*Movies Form and Components Display */
  function MoviesForm(){
    const [movie,addMovieInfo]=useState({name:"",poster:"",summary:"",rating:"",cast:""});
    const [movies,addMovie]=useState([{
      name: "Interstellar",
      poster:
        "https://thefilmstage.com/wp-content/uploads/2014/09/interstellar_poster.jpg",
      summary:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: "8.6",
      cast: "Matthew McConaughey,Anne Hathaway,Jessica Chastain,Bill Irwin,Ellen Burstyn,Michael Caine"
    },
    {
      name: "Alvin and the Chipmunks",
      poster:
        "https://fanart.tv/fanart/movies/55301/movieposter/alvin-and-the-chipmunks-chipwrecked-56b79ff0afb57.jpg",
      summary:
        "Three musical chipmunks are discovered by an aspiring songwriter who wants to use their amazing singing abilities to become famous.",
      rating: "8.6",
      cast: "Jason Lee,David Cross,Cameron Richardson,Justin Long,Matthew Gray Gubler,Jesse McCartney"
    },
    {
      name: "Avengers",
      poster:
        "https://www.themoviedb.org/t/p/original/pdhOE0NAZaPzjsgTvatRP1xFhG3.jpg",
      summary:
        "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      rating: "8.0",
      cast: "Robert Downey Jr.,Chris Evans,Mark Ruffalo,Chris Hemsworth,Scarlett Johansson,Jeremy Renner,Tom Hiddleston,Clark Gregg,Cobie Smulders,Stellan Skarsgård,Samuel L. Jackson"
    },
    {
      name: "Avatar",
      poster:
        "https://www.themoviedb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
      summary:
        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      rating: "7.8",
      cast: "Sam Worthington,Zoe Saldana,Stephen Lang,Michelle Rodriguez,Sigourney Weaver"
    },
    {
      name: "Harry Potter & the Deathly Hallows",
      poster:
        "https://tonights.tv/wp-content/uploads/movies/poster/12445-poster.jpg",
      summary:
        "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
      rating: "8.1",
      cast: 
        "Daniel Radcliffe,Rupert Grint,Emma Watson,Helena Bonham Carter,Robbie Coltrane,Warwick Davis,Ralph Fiennes,Michael Gambon,John Hurt,Jason Isaacs,Gary Oldman,Alan Rickman,Maggie Smith,David Thewlis,Julie Walters"
      
    },
    {
      name: "Kanaa",
      poster:
        "https://www.weekendpopcorn.com/wp-content/uploads/2018/12/kanaa-posters-5-768x1024.jpg",
      summary:
        "A woman who hails from a middle-class family background aims to excel in the competitive world of cricket with the help of her supportive father.",
      rating: "7.8",
      cast:"Aishwarya Rajesh,Sathyaraj,Darshan,Sivakarthikeyan"
    }]);
    const labels=["name","poster","summary","rating","cast"];
    const inputChange=(event)=>{addMovieInfo({...movie,[event.target.name]:event.target.value})};
    const submitHandler=(event)=>{event.preventDefault();addMovie([...movies,movie]); addMovieInfo({name:"",poster:"",summary:"",rating:"",cast:""});};
    return (<div>
      <form className="form-style" onSubmit={submitHandler}>
        {labels.map((value,index)=><FormInput key={index} labelname={value} changeFn={inputChange} value={movie}/>)}
        <Button variant="contained" className="button-style" type="Submit">+Add Movie</Button>
      </form><br/>
      <MoviesList list={movies}/>
      
    </div>);
  } 

  export {MoviesForm};