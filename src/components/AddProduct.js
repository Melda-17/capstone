import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SRV_HOST } from "./EnvVariables.js";

// Backend server API link
const apiHost = SRV_HOST;

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    // Button event handler
    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
            console.error("User ID not found in localStorage.");
            return;
        }

        const userId = user._id;
        console.warn("Adding product:", name, price, category, company, userId);

        try {
            await fetch(`${apiHost}/add-product`, {
                method: "POST",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            navigate("/addanother");
        } catch (error) {
            console.error("Error adding product:", error.message);
        }
    };

    return (
        <div className="register">
            <h1>Add Product</h1>
            <input
                className="inputField"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="invalid-input">Enter valid name</span>}

            <input
                className="inputField"
                type="text"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid-input">Enter valid price</span>}

            <input
                className="inputField"
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="invalid-input">Enter valid category</span>}

            <input
                className="inputField"
                type="text"
                placeholder="Enter product company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="invalid-input">Enter valid company</span>}

            <button onClick={addProduct} className="appButton" type="button">
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;
