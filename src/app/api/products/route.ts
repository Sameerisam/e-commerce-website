import { NextResponse } from "next/server";
import dbConnect from "@/services/db/connection";
import Product from "@/services/db/models/product";

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new product
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Basic validation
    const { title, description, price, category, image, stock } = body;
    if (!title || !description || !price || !category || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newProduct = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      image,
      stock: Number(stock) || 0,
      rating: { rate: 0, count: 0 },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
