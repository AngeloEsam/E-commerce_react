import axios from "axios";
import { createContext, useState } from "react";

export const cartContext = createContext();
export default function CartContextProvider(props) {
   let baseUrl = 'https://ecommerce.routemisr.com'

    const [cartNumber, setCartNumber] = useState(0);
  function addToCart(id) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }

  function getCart() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  function updateCart(id,count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  function deleteCart(id) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  }
  function  ckeckoutPayment(id,formData){
    return  axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    {
       shippingAddress:formData
    },
    {
         headers:{
          token: localStorage.getItem("userToken"),
        },
     
     })

    }        

  
  return (
    <cartContext.Provider value={{ addToCart,cartNumber,setCartNumber ,getCart,updateCart,deleteCart,ckeckoutPayment}}>
      {props.children}
    </cartContext.Provider>
  );
}
