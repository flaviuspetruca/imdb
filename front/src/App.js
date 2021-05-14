import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Confirm from './components/auth/Confirm';
import DashBoard from './components/DashBoard';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import NotFound from './components/NotFound';
import BookInfo from './components/BookInfo';
import NavBar from './components/NavBar';
import Category from './components/Category';
import Users from './components/Users';
import User from './components/User';
import Analytics from './components/Analytics';

function App() {

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  
  const [token, setToken] = useState(getToken());
  
  const handleLogin = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  }

  const logOut = () =>{
    localStorage.removeItem('token');
    setToken('');
  } 

  useEffect(() => {
    const islogged = async() => {
        const data = {token};
        const req = await fetch(`http://localhost:3000/islogged`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 401){
            logOut();
        }
        if(req.status === 200)
          console.log("here");
    }

    islogged();
}, [token])

  if(!token)
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/confirm/:token" component={Confirm}/>
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/resetpass/:token" component={ResetPassword} />
        <Route component={() => <Login setToken={handleLogin}/>} />
        </Switch>
      </Router>
    </div>
  );
  else
  return (
    <div className="App">
      <Router>
      <NavBar logOut={logOut}/>
      <Switch>       
      <Route path="/" exact component={() => <DashBoard logOut={logOut}/>} />
      <Route path="/book/:id" component={BookInfo}/>
      <Route path="/category/:category" component={() => <Category logOut={logOut}/>}/>
      <Route path="/users" component={Users}/>
      <Route path="/user/:username" component={User}/>
      <Route path="/analytics" component={Analytics}/>
      <Route component={NotFound} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
