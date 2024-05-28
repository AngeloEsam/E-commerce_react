import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../context/cartContext";

function Checkout() {
  const { ckeckoutPayment } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let id = '65d5e3179c86f6003429bacd';

  async function payment(values) {
    setIsLoading(true);
    setErrorMessage('');
    try {
      console.log('fdbvbfdffb')
      const  data  = await ckeckoutPayment(id, values);
      console.log(data);
      if (data.data.status === 'success') {
        console.log('ggd')
        setIsLoading(false);
        window.location.href=data.data.session.url;
        // handle successful payment, e.g., redirect or show success message
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Payment failed. Please try again.');
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: ""
    },
    onSubmit: payment,
  });

  return (
    <div className="my-3">
      <h1 className="text-main text-center">Payment Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row mt-4">
          <div className="col-md-8 m-auto bg-light shadow p-4 ">
            <div className="row gy-4">
              <div className="col-md-12">
                <label htmlFor="details">Details:</label>
                <input
                  type="text"
                  name="details"
                  id="details"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.details}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
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
                />
              </div>
              {errorMessage && (
                <div className="col-md-12">
                  <div className="alert alert-danger">{errorMessage}</div>
                </div>
              )}
              <div className="col-md-12 d-flex align-items-center justify-content-end">
                <button
                  type="submit"
                  className="btn btn-success text-light"
                  disabled={isLoading}
                >
                  Pay
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

export default Checkout;
