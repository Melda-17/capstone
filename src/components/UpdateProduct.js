import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SRV_HOST } from './EnvVariables.js';

//backend server api link
const apiHost = SRV_HOST;

const UpdateProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");

    const [error, setError] = React.useState();

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`${apiHost}/product/${params.id}`);

        result = await result.json();
        console.warn(result);

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);

        let result = await fetch (`${apiHost}/product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        if(result){
            navigate("/");
        }
    }

    return (
        <div className="register">
            <h1>Update Product</h1>
            <input className="inputField" type="text" placeholder="Enter product name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="invalid-input">Enter valid name</span>}

            <input className="inputField" type="text" placeholder="Enter product price"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid-input">Enter valid price</span>}

            <input className="inputField" type="text" placeholder="Enter product category"
                value={category} onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="invalid-input">Enter valid category</span>}

            <input className="inputField" type="text" placeholder="Enter product company"
                value={company} onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="invalid-input">Enter valid company</span>}

            <button onClick={updateProduct} className="appButton" type="button">Update</button>

        </div>
    )
}

export default UpdateProduct;