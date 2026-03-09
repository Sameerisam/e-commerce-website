import { NextResponse } from "next/server";
import dbConnect from "@/services/db/connection";
import Order from "@/services/db/models/order";

// GET all orders (Admin use)
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new order
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      userEmail,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus,
    } = body;

    if (!userEmail || !items || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 },
      );
    }

    const newOrder = await Order.create({
      userEmail,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      orderStatus: "Processing",
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
