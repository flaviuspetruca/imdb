import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Login = (handleLogin) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    //styling for the inputs
    const [userInput, setUserInput] = useState({borderColor: "#ced4da"});
    const [passwordInput, setPasswordInput] = useState({borderColor: "#ced4da"});


    const sendRequest = async () => {
        let ok = true;

        if(user === '' || user.length < 6){
            setUserInput({borderColor: "red"});
            ok = false;
        }
        
        if(password.length < 6){
            setPasswordInput({borderColor: "red"});
            ok = false;
        }
        
        if(ok === false)
            return ;

        const data = {username: user, password}
        const req = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(req.status === 200){
            const resp = await req.json();
            setIsLogged(true);
            handleLogin.setToken(resp.token);
            
        }
        else{
            setIsLogged('failed');
            setUserInput({borderColor: "red"});
            setPasswordInput({borderColor: "red"});
        }
    }

    //prevent form submision
   const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest();
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            style={userInput} 
                            placeholder="Enter username" 
                            onChange={e => {
                                            setUser(e.target.value); 
                                            setUserInput({borderColor: "#ced4da"}); 
                                            setPasswordInput({borderColor: "#ced4da"});
                                            setIsLogged(false);
                                            }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            style={passwordInput} 
                            placeholder="Enter password" 
                            onChange={e => { 
                                            setPassword(e.target.value); 
                                            setPasswordInput({borderColor: "#ced4da"});
                                            setUserInput({borderColor: "#ced4da"}); 
                                            setIsLogged(false);
                                            }
                            } 
                        />
                    </div>
                    {
                            isLogged === 'failed' ? 
                            <h5 className="text-center text-danger mx-3">Wrong username/password</h5>
                            :
                            <div></div>
                    }

                        <button type="submit" className="btn-block submit">Submit</button>
                    <p className="forgot-password text-right">
                        <Link to={"/forgotpassword"}>Forgot password?</Link>
                    </p>
                    <p className="forgot-password text-right">
                        <Link to={"/register"}>Don't have an account?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login;