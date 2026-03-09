"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { persistor } from "../store/store";
import { Provider, useDispatch } from "react-redux";
import { clearCart } from "../store/slices/add_To_Cart/page";
import { store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";


export default function OrderSuccessCOD() {
  return <Provider store={store}>
   <PersistGate persistor={persistor}>
    <OrderSuccess></OrderSuccess>
   </PersistGate>
  </Provider>

}


 function OrderSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get("amount") || "0.00";
  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(clearCart());

    
    setTimeout(() => {
      persistor.flush().then(() => persistor.persist());
    }, 0);
  }, [dispatch]);

  return (
    <div className="container py-5 text-center">
      <div className="d-flex flex-column align-items-center justify-content-center">

     
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-3"
        >
          <circle cx="12" cy="12" r="10" fill="#28a745" />
          <path
            d="M7.5 12.5L10.25 15.25L16.5 9"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="fw-bold text-success mb-2">Order Placed Successfully!</h1>
        <p className="fs-5 text-muted mb-4">
          Thank you for shopping with us. Your order will be delivered soon.
        </p>

        <div
          className="card shadow-sm p-4 text-start"
          style={{ maxWidth: 480, borderRadius: 12 }}
        >
          <h5 className="fw-bold mb-3">Order Summary</h5>

          <p className="mb-2">
            <strong>Payment Method:</strong> Cash on Delivery
          </p>

          <p className="mb-2">
            <strong>Amount to Pay on Delivery:</strong>{" "}
            <span className="text-primary fw-semibold">${amount}</span>
          </p>

          <p className="mb-0">
            <strong>Status:</strong>{" "}
            <span className="text-success fw-semibold">Pending Confirmation</span>
          </p>
        </div>

        <button
          className="btn btn-outline-primary mt-4 px-4 fw-semibold"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
