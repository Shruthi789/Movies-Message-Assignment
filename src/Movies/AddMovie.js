import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {moviesContext} from './Home.js';
import {FormComponent} from '../Form.js';
import {API} from '../APIInfo.js'

function AddMovie(){
    const {getMovies,url}=useContext(moviesContext);
    const history=useHistory();
    const initialValues={
      name:'',
      poster:'',
      summary:'',
      rating:'',
      cast:'',
      language:'',
      trailer:''
    }
    const submitHandler=(values)=>{ 
    const newMovie={
    name:values.name,
    poster:values.poster,
    summary:values.summary,
    rating:values.rating,
    cast:values.cast,
    language:values.language,
    trailer:values.trailer
    };
    fetch(`${API}/movies`,{
      method:'POST',
      headers:{
        'x-auth-token':localStorage.getItem('token'),
        'content-type':'application/json'
      },
      body:JSON.stringify([newMovie])
    })
    .then(()=>{
        getMovies();
        history.push(`${url}`);
    })
    .catch((error)=>console.log(error));
    }
   
    
    return (<FormComponent initialValues={initialValues} action="ADD" submitHandler={submitHandler}/> );
}

export {AddMovie};