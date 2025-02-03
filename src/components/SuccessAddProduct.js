import React from "react";
import {useNavigate} from "react-router-dom";



const SuccessAddProduct =()=>{

    const navigate = useNavigate();

    const gotoAddProduct = async ()=>{
        navigate("/add");
    }

    return (
        <div className="register">

            <h3 className="success">Product added successfully.</h3>
            
            <button onClick={gotoAddProduct} className="appButton" type = "button">Add Another Product</button>
        
        </div>
    )
}

export default SuccessAddProduct;