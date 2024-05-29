


import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../context/tokenContext";

function ResetPassword() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useContext(userContext);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string().required("New password is required"),
  });

  async function resetPassword(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      if (data.token) {
        // localStorage.setItem("userToken", data.token);
        // setUserToken(data.token);
        navigate("/signin");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <div className="my-3">
      <h3 className="text-main text-center">Reset Password</h3>
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
                  aria-describedby="emailHelp"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  onBlur={formik.handleBlur}
                  aria-describedby="newPasswordHelp"
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-danger">{formik.errors.newPassword}</p>
                )}
              </div>
              {serverError && <p className="text-danger">{serverError}</p>}
              <div className="col-md-12 d-flex align-items-center justify-content-end">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || isLoading}
                  className="btn btn-success text-light"
                >
                  Reset
                  {isLoading && (
                    <span>
                      <i className="fa-solid text-light fa-spinner fa-spin mx-2"></i>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
