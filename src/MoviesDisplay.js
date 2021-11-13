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
import './App.css';
/*Movies Component*/
function Movies({ name, poster, summary, rating, cast,id }) {
  const [showDetails,setDetails]=useState(false);
  const history=useHistory();
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
        <h4 className="movie-name">{name}  <IconButton aria-label="expandIcon" size="small" color="primary" onClick={() => setDetails(!showDetails)}>{showDetails?<ExpandLessIcon/>:<ExpandMoreIcon/>}</IconButton> <IconButton aria-label="infoIcon" size="small" color="primary" onClick={() =>{history.push(`/movie-trailers/${id}`)}}><InfoIcon/></IconButton></h4>
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
      <EditandDelete id={id}/>
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
/*Counter Component*/
function EditandDelete({id}) {
  const editHistory=useHistory();
  const deleteHistory=useHistory();
  return (<div className="like-button-style">
    <IconButton aria-label="editIcon" size="small" color="primary" onClick={() => {editHistory.push(`/movies/edit/${id}`)}}><EditIcon/></IconButton>
    <IconButton aria-label="deleteIcon" size="small" color="primary" onClick={() => {deleteHistory.push(`/movies/delete/${id}`)}}><DeleteIcon/></IconButton> </div>
  );
}
  /*Displaying the Movie components */
  function MoviesList({list}) {
    return (
    <div>
    <h1 className="heading">Movie List</h1>
    <div className="movies-arrangement">
      {list.map(({
        name,
        poster,
        summary,
        rating,
        cast
      },index) => <Movies key={index} name={name} poster={poster} summary={summary} rating={rating} cast={cast} id={index} />)}
    </div>
    </div>);
  } 
  export {MoviesList};
  

 