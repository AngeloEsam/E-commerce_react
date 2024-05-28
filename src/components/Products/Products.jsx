import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { toast } from 'react-toastify';
function Products() {
  const {addToCart,setCartNumber}=useContext(cartContext)
  const [productList, setProducts] = useState([]);

  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    // console.log(data.data)
    setProducts(data.data);
  
  }
  useEffect(() => {
    getProducts();
  }, []); 
  async function addToMyCart(id){
    const { data } = await addToCart(id);
    if(data.status==='success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
    console.log(data.data)
  }
  return (
    <div className="row">
      {productList.length > 0 ? (
        <>
          {productList.map((product) => {
            return (
              <div className="col-md-3" key={product._id}>
                <div className="product p-5">
                  <Link to={`/details/${product._id}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                    />
                    <p className="text-main">{product.category.name}</p>
                    <h6 className="text-dark">{product.title}</h6>
                    <div className="d-flex justify-content-between">
                      <p className="text-dark">{product.price}EG</p>
                      <p className="text-dark">
                        {product.ratingsAverage}
                        <i className="fa-solid fa-star rating-color"></i>
                      </p>
                    </div>
                  </Link>
                  <button className="btn bg-main text-light w-100" onClick={()=>{addToMyCart(product._id)}}>
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
}

export default Products;
