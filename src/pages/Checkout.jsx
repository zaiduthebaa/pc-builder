import React, { useState } from "react";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const validateForm = (formData) => {
  const errors = {};
  if (formData.firstName.trim() === "") {
    errors.firstName = true;
  }
  if (formData.lastName.trim() === "") {
    errors.lastName = true;
  }
  if (formData.address.trim() === "") {
    errors.address = true;
  }
  if (formData.zip.trim() === "") {
    errors.zip = true;
  }
  if (formData.state === "") {
    errors.state = true;
  }
  return Object.values(errors).some((error) => error);
};

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      address: "",
      zip: "",
      state: "",
    });

    const [formErrors, setFormErrors] = useState({
      firstName: false,
      lastName: false,
      address: false,
      zip: false,
      state: false,
    });

    const handleFieldChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormErrors({
        ...formErrors,
        [name]: value.trim() === "",
      });
    };

    let subtotal = 0;
    let totalItems = 0;
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const isFormValid = !validateForm(formData);

    const indianStates = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhatisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry"
    ];

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>Rs. {Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>Rs. {Math.round(subtotal)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" noValidate>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors.firstName ? "is-invalid" : ""
                          }`}
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFieldChange}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid first name is required.
                        </div>
                      </div>
                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors.lastName ? "is-invalid" : ""
                          }`}
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFieldChange}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors.address ? "is-invalid" : ""
                          }`}
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleFieldChange}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder=""
                        />
                      </div>
                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <select className="form-select" id="country" required>
                          <option value="India">India</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>
                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <br />
                        <select
                          className={`form-select ${
                            formErrors.state ? "is-invalid" : ""
                          }`}
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleFieldChange}
                          required
                        >
                          <option value="">Choose...</option>
                          {indianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors.zip ? "is-invalid" : ""
                          }`}
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleFieldChange}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">Zip code required.</div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <button
                      className="w-100 btn btn-primary"
                      type="submit"
                      disabled={!isFormValid}
                    >
                      Proceed to Payment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
    </>
  );
};

export default Checkout;

