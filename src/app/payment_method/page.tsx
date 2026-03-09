
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";


export default function PaymentMethod() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [loadingMethod, setLoadingMethod] = useState<"online" | "cod" | null>(null);

  const amount = searchParams.get("amount") || "0";
  const name = searchParams.get("name") || "Customer";

  const handleChoice = (method: "online" | "cod") => {
    setLoading(true);
    setLoadingMethod(method);

    // Prevent page refresh
    setTimeout(() => {
      if (method === "online") {
        router.push(`/one_time_payment?amount=${amount}`);
      } else {
        router.push(`/order_success?amount=${amount}&method=Cash on Delivery`);
      }
    }, 300);
  };

  return (
    <div className="container py-5">
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-primary fw-semibold">
              {loadingMethod === "cod" ? "Processing Cash on Delivery..." : "Redirecting to Payment..."}
            </p>
          </div>
        </div>
      )}
      <div className="card p-5 shadow-lg mx-auto" style={{ maxWidth: "480px" }}>
        <h2 className="text-center mb-4 fw-bold">Select Payment Method</h2>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="online"
            disabled={loading}
            onClick={() => handleChoice("online")}
          />
          <label className="form-check-label fs-5 fw-semibold" htmlFor="online">
            Pay Online (Stripe)
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="cod"
            disabled={loading}
            onClick={() => handleChoice("cod")}
          />
          <label className="form-check-label fs-5 fw-semibold" htmlFor="cod">
            Cash on Delivery
          </label>
        </div>
      </div>
    </div>
  );
}
