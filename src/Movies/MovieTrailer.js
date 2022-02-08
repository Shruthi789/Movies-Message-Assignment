import { useState,useEffect } from "react";
import { useParams} from "react-router-dom";
import {BackButton} from "../BackButton.js";
import {API} from '../APIInfo.js'

function MovieTrailer(){
    const {id}=useParams();
    localStorage.setItem('movieID',id);
  const [movie, setMovie] = useState(null);
useEffect(()=>{
  const ID=localStorage.getItem('movieID');
  const getMovie = () => {
    fetch(`${API}/movies/${ID}`)
      .then((response) => response.json())
      .then((res) => {
        setMovie(res);
      })
      .catch((error) => console.log(error));
  };
  getMovie();
},[]);

return (<div>{movie?<TrailerDisplay movie={movie}/>:<h2>Loading...</h2>}</div>)     
}

function TrailerDisplay({movie}){
    const {name,trailer}=movie;
    return (<div>
        <h1>Trailer of {name}</h1>
        <iframe width="853" height="480" src={trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br/>
        <BackButton />
    </div>)

}
export {MovieTrailer};