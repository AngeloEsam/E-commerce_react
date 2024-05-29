import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is Required"),
  });
  async function sendCode(values) {
    setIsLoading(true);
   const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
   if(data.statusMsg==='success'){
    setIsLoading(false)
    document.querySelector('.forgotPassword').classList.add('d-none')
    document.querySelector('.verifyCode').classList.remove('d-none')

   }
    console.log(data);
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });
  const validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Reset Code is Required"),
  });
  async function verify(values) {
    setIsLoading(true);
   const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
   if(data.status==='Success'){
    setIsLoading(false)
    navigate('/resetPassword')
   }
    console.log(data);
  }
  const formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema2,
    onSubmit: verify,
  });

  return (
    <>
      <div className="my-3 forgotPassword">
        <h3 className="text-main text-center">Forgot Password</h3>
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
                <div className="col-md-12 d-flex align-items-center justify-content-end ">
                  <button
                    type="submit"
                    className="btn bg-main text-light"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Send Code
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
      <div className="my-3 verifyCode d-none">
        <h3 className="text-main text-center">Verify Code</h3>
        <form onSubmit={formik2.handleSubmit}>
          <div className="row mt-4">
            <div className="col-md-8 m-auto bg-light shadow p-4 ">
              <div className="row gy-4">
                <div className="col-md-12">
                  <label htmlFor="resetCode">Verify Code:</label>
                  <input
                    type="text"
                    name="resetCode"
                    id="resetCode"
                    className="form-control"
                    onChange={formik2.handleChange}
                    value={formik2.values.resetCode}
                    onBlur={formik2.handleBlur}
                  />
                  {formik2.errors.resetCode && formik2.touched.resetCode && (
                    <p className="text-danger">{formik2.errors.resetCode}</p>
                  )}
                </div>
                <div className="col-md-12 d-flex align-items-center justify-content-end ">
                  <button
                    type="submit"
                    className="btn bg-main text-light"
                    disabled={!(formik2.dirty && formik2.isValid)}
                  >
                    Send Code
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
    </>
  );
}

export default ForgotPassword;
