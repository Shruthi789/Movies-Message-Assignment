import { useParams } from "react-router-dom";
import { FormInput } from "./MoviesForm.js";
import {useState} from 'react';
import {BackButton} from "../BackButton.js";
import Button from '@mui/material/Button';

function EditMovie({labels}){
        const {id}=useParams();
       const [movie,addMovieInfo]=useState({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""});
        const [message,addMessage]=useState("");
        const getMovie=()=>{fetch(`https://61988dae164fa60017c230ed.mockapi.io/movies/${id}`)
        .then((res)=>res.json())
        .then((data)=>{console.log(data);addMovieInfo(data);})
        .catch((error)=>console.log(error))};
        const inputChange=(event)=>{addMovieInfo({...movie,[event.target.name]:event.target.value})};
        const submitHandler=(event)=>{event.preventDefault();
                                     fetch(`https://61988dae164fa60017c230ed.mockapi.io/movies/${id}`,{
                                       method:'PUT',
                                       headers:{
                                         'Content-type':'application/json'
                                       },
                                       body:JSON.stringify(movie)
                                     })
                                      .then(()=>{
                                          addMovieInfo({name:"",poster:"",summary:"",rating:"",cast:"",trailer:""});
                                          addMessage("Movie edited!!");
                                        })
                                        .catch((error)=>console.log(error));
                                      };
        getMovie();
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