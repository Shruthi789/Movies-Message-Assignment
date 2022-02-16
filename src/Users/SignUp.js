import {BackButton} from '../BackButton.js';
import {SignUpForm} from '../Form.js'
import {API} from '../APIInfo.js';
import {useState} from 'react';
function SignUp(){
    const [message,setMessage]=useState("");
    const submitHandler=(values)=>{
        fetch(`${API}/users/signup`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res)=>res.json())
        .then((value)=>{console.log(value);values.username="";values.password=""; values.usertype="";setMessage('Sign Up Successful! Revert to the login page and login');})
        .catch((error)=>{console.log(error);values.username="";values.password=""; values.usertype="";setMessage("Invalid Credentials"); });
    };
    return(<div>
          <SignUpForm submitHandler={submitHandler}/>
          <p className="message-style">{message}</p>
            <br/>
    <BackButton/>
    </div>);
}

export {SignUp};