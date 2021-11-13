import { useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteMovie({list}){
    const {id}=useParams();
    const history=useHistory();
    const[movieList,addMovieList]=useState(list);
    const newList=()=>{movieList.splice(id,1); addMovieList(movieList); list=movieList; history.push('/movies'); alert('The Movie record has been deleted');  };
    return (<div>
             <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={newList}>
                 Delete the movie {list[id].name}
            </Button><br/>
    </div>);
}
export {DeleteMovie};