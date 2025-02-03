import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SRV_HOST } from './EnvVariables.js';

//backend server api link
const apiHost = SRV_HOST;

//main function
const ProductList =()=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[]);

    //load products
    const getProducts = async ()=>{
        let result = await fetch(`${apiHost}/products`);
        result = await result.json();
        setProducts(result);
    }

    //delete products event handler
    const deleteProduct = async (id)=>{
        let result = await fetch(`${apiHost}/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    //search product event handler 
    const searchHandle = async (event)=> {
        let key = event.target.value;
        if(key){
            let result = await fetch(`${apiHost}/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h3 className="register">Product List</h3>
            <input type="text" className="search-box" placeholder="Search product" 
                onChange={searchHandle}
            />
            <br/>
            <ul className="bold">
                <li>SL</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map ((item, index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick = {()=>deleteProduct(item._id)}>Delete</button> &nbsp;
                           
                            <Link to={"update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                ) : <h3 className="pnf-label">Product not found.</h3>
            }
        </div>
    )
}

export default ProductList;