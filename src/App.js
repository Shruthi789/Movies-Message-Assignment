import { Switch,Route,Redirect} from "react-router-dom";
import {Home} from './Movies/Home';
import {Login} from './Users/Login';
import {SignUp} from './Users/SignUp';
import {ForgotPassword} from './Users/ForgotPassword';
import {WrongURL} from './WrongURL.js';

function App() {
  return (
    <div>
       
       <Switch>
        <Route exact path="/"><Login/></Route>
        <Route path="/movies"><Home/></Route>
        <Route path="/films">
          <Redirect to="/movies"/>
        </Route>
       <Route path="/signup"><SignUp/></Route>
        <Route path="/forgotpassword">
       <ForgotPassword/>
        </Route>
        <Route path="**">
       <WrongURL/>
        </Route>
       </Switch>
    </div>
  );
}


export default App;
