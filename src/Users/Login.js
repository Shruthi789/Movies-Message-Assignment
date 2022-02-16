import {API} from '../APIInfo';
import {LoginForm} from '../Form';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login(){
    const [message,setMessage]=useState("");
    const history=useHistory();
    const submitHandler=(values)=>{
        fetch(`${API}/users/signin`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res)=>res.json())
        .then(({msg,token,type})=>{console.log(msg,token,type); localStorage.setItem('token',token); localStorage.setItem('type',type); history.push('/movies');})
        .catch((error)=>{console.log(error);values.username="";values.password="";setMessage("Invalid Credentials"); });
    };
    return( <div>
        <div>
            <img src="https://www.pngmart.com/files/5/Movie-PNG-Image.png" alt="Movies" height="100" width="100"/>
        </div>
        <Divider orientation="vertical" flexItem />
        <div>
            <LoginForm submitHandler={submitHandler}/>
            {message}
            <br/>
            <Link to="/forgotpassword">Forgot Password?</Link> <p>New User? <Link to="/signup"> Sign up</Link></p>
        </div>
    </div>);
}

export {Login};