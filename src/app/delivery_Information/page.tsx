"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "@/redux/store";
import { Provider } from "react-redux";
import { setShippingInfo } from "@/redux/slices/add_To_Cart/page";


export default function DeliveryInform() {
  return (
    <Provider store={store}>
      <DeliveryInformation />
    </Provider>
  );
}

function DeliveryInformation() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.addToCart.items || []);
  const buyNowItem = useSelector((state: RootState) => state.addToCart.buyNowItem);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);


  const isBuyNowMode = buyNowItem !== null;
  const displayItems = isBuyNowMode ? (buyNowItem ? [buyNowItem] : []) : cart;


  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?callbackUrl=/delivery_Information');
    }
  }, [isLoggedIn, router]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Calculate total amount
  const totalAmount = displayItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      alert("Please fill all fields before continuing!");
      return;
    }

    setLoading(true);
    // Save to Redux
    dispatch(setShippingInfo(formData));

    setTimeout(() => {
      router.push(
        `/payment_method?amount=${totalAmount}`
      );
    }, 300);
  };

  return (
    <div className="container my-5">
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-primary fw-semibold">Processing payment...</p>
          </div>
        </div>
      )}
      <h2 className="text-center mb-4 fw-bold">Delivery Information</h2>

      <div className="row">
        <div className="col-md-7 shadow p-4 rounded-4 bg-white">
          <h4 className="mb-3 text-primary">Customer Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="House No, Street, Area"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                />
              </div>
            </div>
            {displayItems.length === 0 ? (
              <button disabled type="submit" className="btn btn-success w-100 py-2 mt-3">
                Proceed to Payment Options
              </button>
            ) : (
              <button type="submit" className="btn btn-success w-100 py-2 mt-3" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment Options"
                )}
              </button>)
            }
          </form>
        </div>

        <div className="col-md-5 mt-4 mt-md-0">
          <div className="shadow p-4 rounded-4 bg-white">
            <h4 className="text-primary mb-3">
              {isBuyNowMode ? "Product Summary" : "Order Summary"}
            </h4>

            {displayItems.length === 0 ? (
              <p>No items to display.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {displayItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        width="60"
                        height="60"
                        className="me-3 rounded border"
                        style={{ objectFit: "contain" }}
                      />
                      <div>
                        <p className="mb-1 fw-semibold">{item.title}</p>
                        <small className="text-muted">
                          Qty: {item.quantity || 1} × ${item.price.toFixed(2)}
                        </small>
                      </div>
                    </div>
                    <span className="fw-bold text-success">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-semibold fs-5">Total:</span>
              <span className="fw-bold fs-5 text-success">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
