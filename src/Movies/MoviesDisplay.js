import { useState } from 'react';
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
//import '../App.css';
/*Movies Component*/
function Movies({ name, poster, summary, rating, cast,editButton,deleteButton,trailerButton }) {
  const [showDetails,setDetails]=useState(false);
  return (
    <Card sx={{ maxWidth: 445 }}>
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
                {cast}
                </p>:""}
     
      </div>
      </CardContent>
      <CardActions className="card-actions">
      <Counter />
      {editButton}
      {deleteButton}
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
  function MoviesList({movies,setMovies}) {
    const editHistory=useHistory();
    const history=useHistory();
    const deleteAction=(rIndex)=>{const newArray=movies.filter((mv,index)=>index!==rIndex); setMovies(newArray);};
    return (
    <div>
    <h1 className="heading">Movie List</h1>
    <div className="movies-arrangement">
      {movies.map(({
        name,
        poster,
        summary,
        rating,
        cast
      },index) => <Movies key={index} name={name} poster={poster} summary={summary} rating={rating} cast={cast} deleteButton={ <IconButton aria-label="deleteIcon" size="small" color="error" onClick={() => {deleteAction(index)}}><DeleteIcon/></IconButton>} editButton={<IconButton aria-label="editIcon" size="small" color="primary" onClick={() => {editHistory.push(`/movies/edit/${index}`)}}><EditIcon/></IconButton>} trailerButton={<IconButton aria-label="infoIcon" size="small" color="primary" onClick={() =>{history.push(`/movie-trailers/${index}`)}}><InfoIcon/></IconButton>}/>)}
    </div>
    </div>);
  } 
  export {MoviesList};
  

 