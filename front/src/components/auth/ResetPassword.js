import React, { useState } from 'react';
import { useParams, useHistory } from "react-router-dom";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [sent, setSent] = useState('false');

    const [passwordInput, setPasswordInput] = useState({borderColor: "#ced4da"});
    
    const token = useParams();
    const history = useHistory();

    const sendRequest = async() => {
        if(password !== repassword || password.length < 6){
            setPasswordInput({borderColor: "red"});
            return;
        }

        const data = {password, token: token.token}
        const req = await fetch("http://localhost:3000/resetpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200){
            setSent("Sent");
            setPasswordInput({borderColor: "green"});
            await sleep(2000)
            history.push('/');
        }
        else{
            setSent("NotSent");
            setPasswordInput({borderColor: "red"});
        }
        
        //make request
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return ( 
    <form onSubmit={handleSubmit}>
        <h3>Set your new password</h3>

        <div className="form-group">
            <label>New password</label>
            <input type="password" 
                className="form-control" 
                placeholder="Enter new password"  
                style={passwordInput}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Confirm new password</label>
            <input type="password" 
                className="form-control" 
                placeholder="Confirm new password"  
                style={passwordInput}
                onChange={e => setRePassword(e.target.value)}
            />
        </div>
        { 
            sent === "NotSent" ? 
            <h5 className="text-center text-danger mx-3">Couldn't set new password</h5>
            :
            sent === "Sent"? 
            <h5 className="text-center text-success mx-3">Password updated!</h5>
            :<div></div>
        }

        <button type="submit" className="btn-block submit" onClick={sendRequest}>Submit</button>

    </form>
    );
}
 
export default ResetPassword;