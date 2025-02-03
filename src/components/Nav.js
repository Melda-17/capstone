import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Nav=()=>{

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const auth = localStorage.getItem("user");
    return(
        <div className="nav-container">
            <ul className="nav-ul">
                {
                    auth ? <>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/sales">View all sales</Link></li>
                        <li><Link onClick={logout} to="./login">Logout ({JSON.parse(auth).name})</Link></li>
                    </>
                    : <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Register</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Nav;