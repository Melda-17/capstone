import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SRV_HOST } from './components/EnvVariables.js';

//backend server api link
const apiHost = SRV_HOST;
//main function
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    //button event handler
    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch(`${apiHost}/register`, {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputField" type="text" placeholder="Enter your name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputField" type="text" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputField" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}

export default Signup;