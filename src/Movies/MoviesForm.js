import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from 'react-router-dom';

/*Input Component*/
function FormInput({labelname,changeFn,value}){
    return(<div className="form-component">
      <label className="label-style">{labelname}:</label>
      <TextField id="outlined-required" label={labelname} name={labelname} onChange={changeFn} value={value[labelname]} required></TextField>
      </div>);
  }
 /*Add Movies Form */
  function MoviesForm({movies,setMovies,labels}){
    const [movie,addMovieInfo]=useState({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""});
    const history=useHistory();
    const inputChange=(event)=>{addMovieInfo({...movie,[event.target.name]:event.target.value})};
    const submitHandler=(event)=>{event.preventDefault();const newList=[...movies,movie];setMovies(newList); history.push('/movies');};
    return (<div>
      <form className="form-style" onSubmit={submitHandler}>
        {labels.map((value,index)=><FormInput key={index} labelname={value} changeFn={inputChange} value={movie}/>)}
        <Button variant="contained" className="button-style" type="Submit">+Add Movie</Button>
      </form><br/>
    </div>);
  } 
  
  export {FormInput,MoviesForm};