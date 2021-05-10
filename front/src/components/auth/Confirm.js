import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';

const Confirm = () => {

    const token = useParams().token;
    const [isRegistered, setIsRegistered] = useState('');
    const confirmAccount = async() => {
        const req = await fetch(`http://localhost:3000/confirm/${token}`);
        if(req.status === 200){
            setIsRegistered(true);
        }
        else
            setIsRegistered(false);
        
    } 

    useEffect(() => {confirmAccount()}, []);
    return ( 
        <div className="auth-wrapper">
            <div className="auth-inner">
                {
                    isRegistered === ''?
                        <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                        </div>
                    :isRegistered === true?
                    <div>
                        <h5 className="text-center">Registered Successfully</h5>
                        <p className="forgot-password text-right">
                        <Link to="/"><button className="btn-block submit">Go to login</button></Link>
                        </p>
                    </div>
                    :
                    <>
                    <h5 className="text-center text-danger">Couldn't Register! Verification mail might have expired!</h5>
                    <Link to="/"><button className="btn-block submit">Back Home</button></Link>
                    </>
                }
            </div>
        </div>
    );
}
 
export default Confirm;