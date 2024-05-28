import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Cart() {
  const [data, setData] = useState([]);
  const [cartPrice, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  let { getCart, updateCart, deleteCart ,setCartNumber} = useContext(cartContext);
  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setData(data.data.products);
      setPrice(data.data.totalCartPrice);
      setLoading(false);
    })();
  }, []);
  async function removeProduct(id) {
    let { data } = await deleteCart(id);
    setData(data.data.products);
    setPrice(data.data.totalCartPrice);
    setCartNumber(data.numOfCartItems)
    console.log(data);
  }
  async function editProduct(id, count) {
    let { data } = await updateCart(id, count);
    setData(data.data.products);
    setPrice(data.data.totalCartPrice);
    setCartNumber(data.numOfCartItems)
    console.log(data);
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
    <div className="container">
      <h2 className="text-center text-main ">Shopping Cart</h2>
      <Link to='/checkout' >
        <button className="btn bg-main text-light">onlinePayment</button>
      </Link>
      <div className="row">
        <div className="colo-md-11 bg-main-light shadow my-5 p-5 m-auto">
          <h3>
            <span className="fw-bold text-main ">Total Price: </span>
            {cartPrice}
          </h3>
          {data.map((product) => (
            <div className="row border-bottom py-5" key={product._id}>
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt="cover"
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product.product.title}</h5>
                  <p>{product.price}</p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      removeProduct(product.product._id);
                    }}
                  >
                    <i className="fa-regular fa-trash-can"></i> Remove
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      editProduct(product.product._id, product.count + 1);
                    }}
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      if (product.count > 1) {
                        editProduct(product.product._id, product.count - 1); 
                      } else {
                        removeProduct(product.product._id); 
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
