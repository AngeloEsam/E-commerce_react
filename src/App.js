import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./context/tokenContext";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import Details from "./components/Details/Details";
import CartContextProvider from "./context/cartContext";
import { ToastContainer } from 'react-toastify';
import Checkout from "./components/checkout/checkout";
import Orders from "./components/orders/orders";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import ResetPassword from "./components/resetPassword/resetPassword";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoutes>
            <Category />
          </ProtectedRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
     
      {
        path: "brands",
        element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRoutes>
            <Details />
          </ProtectedRoutes>
        ),
      },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer theme="colored"/>
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
