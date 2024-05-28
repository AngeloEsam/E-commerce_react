
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { userContext } from "../../context/tokenContext";
//import { jwtDecode } from "jwt-decode";
function Signin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let {setUserToken}=useContext(userContext)

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required('Password is Required')
  });

  async function signin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success") {
        setIsLoading(false)
        // const decode = jwtDecode(data.token)
        // console.log(decode)
        localStorage.setItem('userToken',data.token)
        // localStorage.setItem('idToken',decode?.id)

        console.log(data)
        setUserToken(data.token)
       
        navigate('/home');
      }
    } catch (error) {
      setServerError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: signin,
  });

  return (
    <div className="my-3">
      <h1 className="text-main text-center">Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mt-4">
          <div className="col-md-8 m-auto bg-light shadow p-4 ">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </div>
              {serverError && <p className="text-danger">{serverError}</p>}
              <div className="col-md-12 d-flex align-items-center justify-content-end ">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn btn-success text-light"
                >
                  Login
                  {isLoading && (
                    <span>
                      <i className="fa-solid text-light fa-spinner fa-spin mx-2"></i>
                    </span>
                  )}
                </button>
              </div>
              <p className="text-muted">
                Have an account?
                <Link to="/signup" className="text-main mx-1">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signin;
