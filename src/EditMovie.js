import { useParams,Link } from "react-router-dom";
import { labels } from './Movies.js';
import { FormInput } from "./MoviesForm.js";
import {useState} from 'react';
import Button from '@mui/material/Button';

function EditMovie({list}){
        const {id}=useParams();
        const [movie,addMovieInfo]=useState(list[id]);
        const [message,addMessage]=useState("");
        const inputChange=(event)=>{addMovieInfo({...movie,[event.target.name]:event.target.value})};
        const submitHandler=(event)=>{event.preventDefault();list[id]=movie; addMovieInfo({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""}); addMessage("Movie edited!!");};
        return (<div>
          <form className="form-style" onSubmit={submitHandler}>
            {labels.map((value,index)=><FormInput key={index} labelname={value} changeFn={inputChange} value={movie}/>)}
            <Button variant="contained" className="button-style" type="Submit">+Update Movie</Button>
          </form><br/>
          {message} <br/>
          <Link to='/movies'>Click here to navigate back to the Movie List</Link>
        </div>); 
}
export {EditMovie};