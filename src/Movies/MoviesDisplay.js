import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from 'react-router';
import {moviesContext} from './Home.js';
import {FilterForm} from '../Form.js';
import {API} from '../APIInfo.js'
//import '../App.css';
/*Movies Component*/
function Movies({ name, poster, summary, rating, cast,language,editButton,deleteButton,trailerButton }) {
  const [showDetails,setDetails]=useState(false);
  return (
    <Card sx={{ minWidth:340}}>
      <CardMedia
        component="img"
        image={poster}
        alt="MovieImage"
        className="movie-poster"
      />
     <CardContent>
      <div className="movie-spec">
        <h4 className="movie-name">{name}  <IconButton aria-label="expandIcon" size="small" color="primary" onClick={() => setDetails(!showDetails)}>{showDetails?<ExpandLessIcon/>:<ExpandMoreIcon/>}</IconButton> </h4> {trailerButton}
        <h4 className="movie-rating">⭐ {rating} </h4>
      </div>
      <div className="movie-info">
      {showDetails?<p className="movie-details"><span className="title">Summary:</span>
                {summary} <br/><br/>
                <span className="title">Cast:</span>
                {cast} <br/><br/>
                <span className="title">Language:</span>
                {language}
                </p>:""}
     
      </div>
      </CardContent>
      <CardActions className="card-actions">
      <Counter />
      {localStorage.getItem('type')==='Admin'?
      <span>{editButton}
      {deleteButton}
      </span>
      :""}
      </CardActions>
    </Card>
  );
}
/*Counter Component*/
function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setdisLike] = useState(0);
  return (<div className="like-button-style">
    <IconButton aria-label="likes" size="small" color="primary" onClick={() => setLike(like + 1)}><Badge badgeContent={like} color="primary">👍 </Badge></IconButton>
    <IconButton aria-label="dislikes" size="small" color="primary" onClick={() => setdisLike(dislike + 1)}><Badge badgeContent={dislike} color="error">👎</Badge></IconButton> </div>
  );
}

  /*Displaying the Movie components */
  function MoviesList() {
   const history=useHistory();
    const {movies,getMovies,setMovies,url}=useContext(moviesContext);
    const [message,setMessage]=useState("");
    const deleteAction=(id)=>{
    fetch(`${API}/movies/${id}`,{method:'DELETE',headers:{'x-auth-token':localStorage.getItem('token')}})
    .then(()=>getMovies())
    .catch((error)=>console.log(error));
    };
    const submitHandler=(values)=>{
       const {language,rating}=values;
       let submit_URL=`${API}/movies`;
       if(language && rating){
          submit_URL+=`?language=${language}&rating=${rating}`;
       }
       else if(rating){
         submit_URL+=`?rating=${rating}`;
       }
       else if(language){
         submit_URL+=`?language=${language}`;
       }
      fetch(`${submit_URL}`,{
        method:'GET',
        headers:{
       'x-auth-token':localStorage.getItem('token'),
      'role':localStorage.getItem('type')
    },
    })
          .then((res)=>res.json())
         .then((values)=>{setMovies(values);setMessage("")})
         .catch(()=>{setMessage("Movie(s) not found")});
    };
    return (
    <div>
    {movies.length!==0?
    <div>
    <h1 className="heading">Movie List</h1>
    <FilterForm submitHandler={submitHandler}/>
    {message.length===0?
    <div className="movies-arrangement">
      {movies.map(({
        name,
        poster,
        summary,
        rating,
        cast,
        language,
        _id
      }) => <Movies key={_id} name={name} poster={poster} summary={summary} rating={rating} language={language} cast={cast} deleteButton={ <IconButton aria-label="deleteIcon" size="small" color="error" onClick={() => {deleteAction(_id)}}><DeleteIcon/></IconButton>} editButton={<IconButton aria-label="editIcon" size="small" color="primary" onClick={() => {history.push(`${url}/edit/${_id}`)}}><EditIcon/></IconButton>} trailerButton={<IconButton aria-label="infoIcon" size="small" color="primary" onClick={() =>{history.push(`${url}/movie-trailers/${_id}`)}}><InfoIcon/></IconButton>}/>)}
    </div>:<h4>{message}</h4>}
    </div>:<h2>Loading...</h2>}
    </div>);
  } 
  export {MoviesList};
  

 