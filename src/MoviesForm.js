import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {labels} from './Movies.js';

/*Input Component*/
function FormInput({labelname,changeFn,value}){
    return(<div className="form-component">
      <label className="label-style">{labelname}:</label>
      <TextField id="outlined-required" label={labelname} name={labelname} onChange={changeFn} value={value[labelname]} required></TextField>
      </div>);
  }
 /*Movies Form and Components Display */
  function MoviesForm({list}){
    const [movie,addMovieInfo]=useState({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""});
    const [message,addMessage]=useState("");
    const inputChange=(event)=>{addMovieInfo({...movie,[event.target.name]:event.target.value})};
    const submitHandler=(event)=>{event.preventDefault();list.push(movie); addMovieInfo({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""}); addMessage("Movie added!!");};
    return (<div>
      <form className="form-style" onSubmit={submitHandler}>
        {labels.map((value,index)=><FormInput key={index} labelname={value} changeFn={inputChange} value={movie}/>)}
        <Button variant="contained" className="button-style" type="Submit">+Add Movie</Button>
      </form><br/>
      {message}
    </div>);
  } 
  
  export {FormInput,MoviesForm};