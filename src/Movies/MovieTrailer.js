import { useState } from "react";
import { useParams} from "react-router-dom";
import {BackButton} from "../BackButton.js";

function MovieTrailer(){
    const {id}=useParams();
    const [movie,setMovie]=useState({});
    const getMovie=()=>{fetch(`https://61988dae164fa60017c230ed.mockapi.io/movies/${id}`)
    .then((res)=>res.json())
    .then((data)=>{console.log(data);setMovie(data);})
    .catch((error)=>console.log(error))};
    getMovie();
    const {name,trailer}=movie;
    return (<div>
        <h1>Trailer of {name}</h1>
        <iframe width="853" height="480" src={trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br/>
        <BackButton />
    </div>)
}
export {MovieTrailer};