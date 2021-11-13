import {  Link } from "react-router-dom";
function WrongURL(){
    return (<div>
        <img src="https://thumbs.dreamstime.com/b/error-page-not-found-illustration-magnifying-glass-b-error-page-not-found-illustration-magnifying-glass-blue-117619951.jpg" alt="Error404NotFound"/><br/>
        <Link to="/">Click Here to navigate back to the home page</Link>
    </div>);
}
export {WrongURL};