"use client";

import { useSearchParams } from "next/navigation";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slices/add_To_Cart/page";
import { persistor, store, RootState } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";


export default function OrderSuccessPage() {
  return <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SuccessPage></SuccessPage>
    </PersistGate>
  </Provider>

}


function SuccessPage() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const method = searchParams.get("method") || "Online Payment";

  const { items, shippingInfo, userEmail, buyNowItem } = useSelector((state: RootState) => state.addToCart);

  useEffect(() => {
    const saveOrder = async () => {
      const orderItems = buyNowItem ? [buyNowItem] : items;

      if (orderItems.length === 0 || !shippingInfo || !userEmail) {
        return;
      }

      try {
        await axios.post("/api/orders", {
          userEmail,
          items: orderItems,
          totalAmount: Number(amount),
          shippingAddress: shippingInfo,
          paymentMethod: method,
          paymentStatus: method === "Online Payment" ? "Completed" : "Pending"
        });

        dispatch(clearCart());
        setTimeout(() => {
          persistor.flush().then(() => persistor.persist());
        }, 0);
      } catch (err) {
        console.error("Order save failed:", err);
      }
    };

    saveOrder();
  }, [dispatch, items, shippingInfo, userEmail, buyNowItem, amount, method]);

  return (
    <div className="container py-5 text-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <CheckCircle size={80} className="text-success mb-3" />
        <h1 className="fw-bold text-success mb-2">Payment Successful!</h1>
        <p className="fs-5 text-muted mb-4">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>

        <div
          className="card shadow-sm p-4 text-start"
          style={{ maxWidth: "480px", borderRadius: "12px" }}
        >
          <h5 className="fw-bold mb-3">Order Summary</h5>
          <p className="mb-2">
            <strong>Payment Method:</strong> {method}
          </p>
          <p className="mb-2">
            <strong>Amount Paid:</strong>{" "}
            <span className="text-primary fw-semibold">
              ${amount || "0.00"}
            </span>
          </p>
          <p className="mb-0">
            <strong>Status:</strong>{" "}
            <span className="text-success fw-semibold">Confirmed</span>
          </p>
        </div>

        <a href="/" className="btn btn-outline-primary mt-4 px-4 fw-semibold">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
