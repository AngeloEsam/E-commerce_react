import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { toast } from 'react-toastify';
function Details() {
  let { id } = useParams();
  const {addToCart,setCartNumber}=useContext(cartContext)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id);

  async function getProduct() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data);
      setProduct(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  async function addToMyCart(id){
    const { data } = await addToCart(id);
    if(data.status==='success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems)
    }
    console.log(data.data)
  }
  if (loading)
    return (
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
    );
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          {product && (
            <img src={product.imageCover} alt="cover" className="w-100" />
          )}
        </div>
        <div className="col-md-9 d-flex justify-content-around flex-column">
          <div>
            <h2>{product && product.title}</h2>
            <p>{product && product.description}</p>
          </div>
          <div>
            <p>{product && product.category.name}</p>
            <div className="d-flex justify-content-between">
              <p>
                <span className="text-main">Price:</span>
                {product && product.price}EG
              </p>
              <p>
                <span className="text-main">
                  {product && product.ratingsAverage}
                </span>
                <i className="fa-solid fa-star rating-color"></i>
              </p>
            </div>
            <button className="btn bg-main text-light w-100" onClick={()=>{addToMyCart(product._id)}}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
