import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SRV_HOST } from './EnvVariables.js';

//backend server api link
const apiHost = SRV_HOST;

//login main function
const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    //login even handler
    const handleLogin = async () => {
        let result = await fetch(`${apiHost}/login`, {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);

        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate("/")
        } else {
            alert("Please enter correct details");
        }
    }

    return (
        <div className="register">
            <h1>Login</h1>
            <input className="inputField" type="text" placeholder="Enter email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputField" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login;