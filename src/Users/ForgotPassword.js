import {BackButton} from '../BackButton.js';
import {ChangePassword} from '../Form.js';
import {SendOTPForm} from '../Form.js';
import {useState} from 'react';
import {API} from '../APIInfo.js';
function ForgotPassword(){
    const [showPChange,setShowPChange]=useState(false);
    const [email,setEmail]=useState("");
    const [showMessage,setMessage]=useState("");
    const submitHandlerEmail=(values)=>{
        fetch(`${API}/users/send-email`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then((res)=>res.json())
        .then((value)=>{console.log(value); setShowPChange(true); setEmail(values.email);})
        .catch((error)=>{console.log(error); });
    };
    const submitHandlerCPassword=(values)=>{
        const data={...values,email};
        console.log(data);
        fetch(`${API}/users/change-password`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then((res)=>res.json())
        .then((value)=>{console.log(value);})
        .catch((error)=>{console.log(error); });
    };
    return(<div>{showPChange?<ChangePassword submitHandler={submitHandlerCPassword} setChange={setShowPChange}/>:<SendOTPForm submitHandler={submitHandlerEmail}/>}<BackButton/></div>);
}

export {ForgotPassword};