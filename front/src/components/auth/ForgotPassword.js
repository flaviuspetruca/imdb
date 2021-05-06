import React, {useState} from "react"

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [sent, setSent] = useState('false');

    const [emailInput, setEmailInput] = useState({borderColor: "#ced4da"});
    //prevent form submision
    function handleSubmit(event) {
        event.preventDefault();
    }
    //localhost/resetpass

    const sendRequest = async() => {
        if(email === '' || email.indexOf('@') === -1){
            setEmailInput({borderColor: "red"});
            return;
        }
        const data = {email}
        const req = await fetch("http://localhost:3000/forgotpass", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 200){
            setSent('Sent');
            setEmailInput({borderColor: "green"});
        }
        else{
            setSent("NotSent");
            setEmailInput({borderColor: "red"});
        }
        //make request
    }

    return (
        <form onSubmit={handleSubmit}>
                <h3>Forgot password?</h3>

                <div className="form-group">
                    <label>Enter your email address</label>
                    <input type="email" 
                        className="form-control" 
                        placeholder="Enter email"  
                        style={emailInput}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                { 
                    sent === "NotSent" ? 
                    <h5 className="text-center text-danger mx-3">Couldn't Reset ResetPassword</h5>
                    :
                    sent === "Sent"? 
                    <h5 className="text-center text-success mx-3">Check your email!</h5>
                    :<div></div>
                }
                    <button type="submit" className="btn-block submit" onClick={sendRequest}>Submit</button>

            </form>   
    );
}
 
export default ForgotPassword;