import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Payment API called with body:", body);
    
    const { amount } = body;

    if (!amount || isNaN(Number(amount))) {
      console.error("Invalid amount received:", amount);
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
    }

    console.log("Creating PaymentIntent for amount:", amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), // convert to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("PaymentIntent created successfully:", paymentIntent.id);
    console.log("Client Secret exists:", !!paymentIntent.client_secret);

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id 
    });
  } catch (err: any) {
    console.error("Stripe API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
