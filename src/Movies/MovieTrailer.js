import { useParams} from "react-router-dom";
import {BackButton} from "../BackButton.js";

function MovieTrailer({list}){
    const {id}=useParams();
    const {name,trailer}=list[id];
    return (<div>
        <h1>Trailer of {name}</h1>
        <iframe width="853" height="480" src={trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br/>
        <BackButton />
    </div>)
}
export {MovieTrailer};