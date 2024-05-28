import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //custom validation
  function validate(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is Required";
    } else if (values.name.length < 3) {
      errors.name = "Name must be 3 characters or more";
    } else if (values.name.length > 10) {
      errors.name = "Name must be 10 characters or less";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } 
    // else if (!/^[A-Z][a-z0-9]{6,8}$/i.test(values.password)) {
    //   errors.password = "Invalid password";
    // }

    if (!values.rePassword) {
      errors.rePassword = "Confirm Password is Required";
    }
    if (values.password !== values.rePassword) {
      errors.rePassword = "Password and Confirm Password must match";
    }
    if (!values.phone) {
      errors.phone = "Phone is Required";
    }
    //  else if (!/^01[1250][0-9]{8}$/i.test(values.phone)) {
    //   errors.phone = "Phone number is not valid";
    // }
    return errors;
  }



  async function signup(values) {
    try {
      setIsLoading(true);
      // console.log(values);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      
      if (data.message === "success") {
        console.log(data)
        navigate('/signin');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response)
      setServerError(error.response.data.message);
      setIsLoading(false);
    }
  }

  
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validate: validate,
    onSubmit: signup,
  });
  return (
    <div className="my-3">
      <h1 className="text-main text-center">Register Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mt-4">
          <div className="col-md-8 m-auto bg-light shadow p-4 ">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="userName">Name:</label>
                <input
                  type="text"
                  id="userName"
                  name="name"
                  onBlur={formik.handleBlur}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : (
                  ""
                )}
              </div>
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
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : (
                  ""
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
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="rePassword">Confirm Password:</label>
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <p className="text-danger">{formik.errors.rePassword}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <p className="text-danger">{formik.errors.phone}</p>
                ) : (
                  ""
                )}
              </div>
              {serverError !== null ? <p className="text-danger">{serverError}</p> : ""}
              <div className="col-md-12 d-flex align-items-center justify-content-end ">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn btn-success text-light"
                >
                  Register
                  {isLoading ? (
                    <span>
                      <i className="fa-solid text-light fa-spinner fa-spin mx-2"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>
              <p className="text-muted">
                Already have an account?
                <Link to="/signin" className="text-main mx-1">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
