"use client";

import { useEffect, useState } from "react";
import {Elements,useStripe,useElements,PaymentElement,} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

// ✅ Load Stripe publishable key (from .env.local)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);


//  Internal PaymentForm component (modern checkout)

type PaymentFormProps = {
  clientSecret: string;
  amount: number;
};

function PaymentForm({ clientSecret, amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Send amount to success page
        return_url: `${window.location.origin}/order_success?amount=${encodeURIComponent(
          amount
        )}&method=Online Payment`,
      },
    });

    if (error) {
      setMessage(error.message || "Payment failed, please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 shadow-lg mx-auto"
      style={{ maxWidth: "480px", borderRadius: "16px" }}
    >
      <h2 className="text-center mb-4 fw-bold">Complete Your Payment</h2>

      {/* Modern Stripe Payment Element */}
      <div className="mb-4">
        <PaymentElement
          options={{
            layout: "tabs", // shows Card, Wallets, etc.
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-100 py-2 fw-semibold"
      >
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)} Securely`}
      </button>

      {message && (
        <div className="alert alert-danger text-center mt-3 mb-0 py-2">
          {message}
        </div>
      )}
    </form>
  );
}


//  Main Payment Page (Stripe Elements wrapper)

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const searchParams = useSearchParams();

  const amountRaw = searchParams.get("amount") || "0";
  // Strip any non-numeric characters except decimal point
  const amount = Number(amountRaw.replace(/[^0-9.]/g, "")) || 0;
  const productId = searchParams.get("productId");
  const quantity = Number(searchParams.get("quantity")) || 1;

  useEffect(() => {
    if (!amount) return;

    (async () => {
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            type: "one_time",
            productId,
            quantity,
          }),
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
        }
      } catch (err) {
      }
    })();
  }, [amount, productId, quantity]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#007bff",
        colorText: "#212529",
        fontFamily: "system-ui, sans-serif",
        borderRadius: "8px",
      },
    },
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold text-primary">Checkout</h1>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm clientSecret={clientSecret} amount={amount} />
        </Elements>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
