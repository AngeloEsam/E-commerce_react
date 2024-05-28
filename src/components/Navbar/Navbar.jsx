import React, { useContext,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/tokenContext";
import { cartContext } from "../../context/cartContext";

function Navbar() {
  const { cartNumber,getCart,setCartNumber } = useContext(cartContext);
  let { userToken, setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  //console.log(userToken);
  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/signin");
  } 

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setCartNumber(data.numOfCartItems)
    
    })();
  }, [setCartNumber,getCart]);
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="home">
          <i className="fa-solid text-main fa-cart-shopping"></i>
          <span style={{ fontWeight: "bold" }}>FreshCart</span>
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken !== null ? (
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="product">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="category">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">
                  Brands
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken == null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="signup">
                    Resgister
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="signin">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            {userToken !== null ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <i className="fa-brands fa-facebook mx-3"></i>
                  <i className="fa-brands fa-twitter mx-3"></i>
                  <i className="fa-brands fa-instagram mx-3"></i>
                  <i className="fa-brands fa-linkedin mx-3"></i>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                   <i className="fa-solid fa-cart-shopping text-main"></i>
                   <span className="badge bg-main text-light">{cartNumber}</span>
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  <Link className="nav-link">Logout</Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
