import { useParams } from "react-router-dom";
import { FormInput } from "./MoviesForm.js";
import {useState} from 'react';
import {BackButton} from "../BackButton.js";
import Button from '@mui/material/Button';

function EditMovie({movies,setMovies,labels}){
        const {id}=useParams();
        const [movie,addMovieInfo]=useState(movies[id]);
        const [message,addMessage]=useState("");
        const inputChange=(event)=>{addMovieInfo({...movie,[event.target.name]:event.target.value})};
        const submitHandler=(event)=>{event.preventDefault();const newList=[...movies]; newList[id]=movie; setMovies(newList); addMovieInfo({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""}); addMessage("Movie edited!!");};
        return (<div>
          <form className="form-style" onSubmit={submitHandler}>
            {labels.map((value,index)=><FormInput key={index} labelname={value} changeFn={inputChange} value={movie}/>)}
            <Button variant="contained" className="button-style" type="Submit">+Update Movie</Button>
          </form><br/>
          {message} <br/>
          <BackButton />
        </div>); 
}
export {EditMovie};