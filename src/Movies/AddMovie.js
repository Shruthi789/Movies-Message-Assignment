import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {moviesContext} from '../App.js';
import {FormComponent} from './Form.js';
import {API} from './APIInfo.js'

function AddMovie(){
    const {getMovies}=useContext(moviesContext);
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
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjU1ODFmNmM2YWJmYzBjNmI5NmY4OCIsImlhdCI6MTY0MzQ2OTI5M30.f60i4OFqYtX0zwQYXFRFLGUTYtn2tezkFemuiLeFeVA',
        'content-type':'application/json'
      },
      body:JSON.stringify(newMovie)
    })
    .then(()=>{
        getMovies();
        history.push('/movies');
    })
    .catch((error)=>console.log(error));
    }
   
    
    return (<FormComponent initialValues={initialValues} action="ADD" submitHandler={submitHandler}/> );
}

export {AddMovie};