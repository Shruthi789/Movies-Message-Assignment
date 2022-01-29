import { useParams } from "react-router-dom";
import {useEffect, useState,useContext} from 'react';
import {BackButton} from "../BackButton.js";
import {FormComponent} from './Form.js';
import {moviesContext} from '../App';
import {API} from './APIInfo.js'

function EditMovie(){
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
     return (<div>{movie?<UpdateMovie movie={movie}/>:<h2>Loading...</h2>}</div>)  
}
function UpdateMovie({movie}){
  const {_id,name,poster,summary,rating,cast,language,trailer}=movie;
  const [message,addMessage]=useState("");
  const {getMovies}=useContext(moviesContext);
  const initialValues= {
    name:name,
    poster:poster,
    summary:summary,
    rating:rating,
    cast:cast,
    language:language,
    trailer:trailer
  };
  const submitHandler=(values)=>{
                        const editedMovie={
                                           name:values.name,
                                           poster:values.poster,
                                           summary:values.summary,
                                           rating:values.rating,
                                           cast:values.cast,
                                           language:values.language,
                                           trailer:values.trailer 
                                         };
                               fetch(`${API}/movies/${_id}`,{
                                 method:'PUT',
                                 headers:{
                                   'Content-type':'application/json'
                                 },
                                 body:JSON.stringify(editedMovie)
                               })
                                .then(()=>{
                                  values.name=""
                                  values.poster=""
                                  values.summary=""
                                  values.rating=""  
                                  values.cast=""
                                  values.language=""
                                  values.trailer=""
                                  addMessage("Movie edited!!");
                                  getMovies();
                                  })
                                  .catch((error)=>console.log(error));
                                };
  return (<div>
    <FormComponent initialValues={initialValues} action="EDIT" submitHandler={submitHandler}/>
    <p className="message-style">{message}</p>
    <div>
    <BackButton/>
    </div>  
    </div>); 

}
export {EditMovie};