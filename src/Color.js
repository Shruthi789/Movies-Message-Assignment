import {useState} from 'react';
import {BackButton} from "./BackButton.js";
function AddColor(){
    const [color,setColor]=useState("");
    const styles={backgroundColor:color};
    const [colors,setColors]=useState(["orange","red","violet"]);
    return(
      <div>
      <h1 className="heading">Color Box</h1>
      <div className="box-style">
      <input style={styles} onChange={(event)=>setColor(event.target.value)} placeholder="Enter a color"/>
      <button onClick={()=>{setColors([...colors,color])}}>Add Color</button>
      {colors.map((clr,index)=>(<ColorBox key={index} clr={clr}/>))}
      </div>
      <BackButton />
      </div>
    );
  }
  
  function ColorBox({clr}){
    const styles={
      backgroundColor:clr,
      height:"50px",
      width:"200px",
      margin:"10px 0px"
    };
    return <div style={styles}></div>
  }
  export {AddColor};