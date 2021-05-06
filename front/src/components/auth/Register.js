import React, { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [registered, setRegistered] = useState('');

    //styling for the inputs
    const [userInput, setUserInput] = useState({borderColor: "#ced4da"});
    const [emailInput, setEmailInput] = useState({borderColor: "#ced4da"});
    const [passwordInput, setPasswordInput] = useState({borderColor: "#ced4da"});
    
    const submitForm = async() => {
        let ok = true;
        if(username === ''){
            setUserInput({borderColor: "red"});
            ok = false;
        }
        
        if(email === '' || email.indexOf('@') === -1){
            setEmailInput({borderColor: "red"});
            ok = false;
        }

        if(password !== repassword || password.length < 6){
            setPasswordInput({borderColor: "red"});
            ok = false;
        }
        
        
        if(ok === false)
            return;
        
        //make the request
        const data = {username, email, password}

        const req = await fetch("http://localhost:3000/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200){
            setUserInput({borderColor: "green"});
            setEmailInput({borderColor: "green"});
            setPasswordInput({borderColor: "green"});
            setRegistered(true);
        }
        else{
            setRegistered(false);
            setUserInput({borderColor: "red"});
            setEmailInput({borderColor: "red"});
            setPasswordInput({borderColor: "red"});
        }
    }
    //prevent form submision
    function handleSubmit(event) {
        event.preventDefault();
    }
    
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                <div className="container-fluid"> 
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control"
                            style={userInput} 
                            placeholder="Username" 
                            onChange={e => {setUsername(e.target.value); setUserInput({borderColor: "#ced4da"})}}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            style={emailInput} 
                            placeholder="Enter email" 
                            onChange={e => {setEmail(e.target.value); setEmailInput({borderColor: "#ced4da"})}}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            style={passwordInput} 
                            placeholder="Enter password" 
                            onChange={e => { setPassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Retype Password</label>
                        <input 
                            type="password" 
                            className="form-control " 
                            style={passwordInput} 
                            placeholder="Retype password" 
                            onChange={e => { setRePassword(e.target.value); setPasswordInput({borderColor: "#ced4da"})}}
                        />
                    </div>
                    {
                        registered === false ? 
                        <h5 className="text-center text-danger">Could not register!</h5>
                        :
                        registered === true ?
                        <h5 className="text-center text-success">Check your email!</h5>
                        :<div></div>
                    }
                    <button type="submit" className="btn-block submit" onClick={submitForm}>Sign Up</button>
                    <p className="forgot-password text-right">
                        <Link to={"/login"}>Already registered sign in?</Link>
                    </p>
                </div>
                </form>
            </div>
        </div>
    );
}
 
export default Register;