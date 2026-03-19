import { NextResponse } from "next/server";
import dbConnect from "@/services/db/connection";
import Order from "@/services/db/models/order";


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

    if (!userEmail || !items || !Array.isArray(items) || items.length === 0 || !totalAmount || !shippingAddress) {
      console.error("Missing required order fields:", { userEmail, itemsCount: items?.length, totalAmount, hasShippingAddress: !!shippingAddress });
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 },
      );
    }

    console.log("Mapping items and creating order for:", userEmail);

    const mappedItems = items.map((item: any) => ({
      productId: item.productId || item.id || item._id, // Try all possible ID fields
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
    }));

    const newOrder = await Order.create({
      userEmail,
      items: mappedItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      orderStatus: "Processing",
    });

    console.log("Order created successfully:", newOrder._id);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
