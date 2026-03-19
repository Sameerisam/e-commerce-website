import { NextResponse } from "next/server";
import User from "@/services/db/models/user";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import dbConnect from "@/services/db/connection";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body, "data received");

    const { action } = body;
    const data = body.data || {};
    const { name, email, password } = data;

    // SIGNUP
    if (action === "signup") {
      if (!name || !email || !password) {
        return NextResponse.json(
          { message: "name, email, password is required" },
          { status: 401 },
        );
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "email already exist" },
          { status: 400 },
        );
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return NextResponse.json(
        { message: "Signup successful", user: newUser },
        { status: 200 },
      );
    }

    //  LOGIN
    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { message: "email and password is required" },
          { status: 401 },
        );
      }

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: "email is not exist" },
          { status: 400 },
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { message: "incorrect password" },
          { status: 400 },
        );
      }

      //  Generate JWT Token
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET_KEY || "mysecretkey",
      );
      const token = await new SignJWT({
        email: user.email,
        id: user._id.toString(),
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      //  Set token in cookie
      const response = NextResponse.json(
        {
          message: "Login successful",
          token,
          user: {
            name: user.name,
          },
        },
        { status: 200 },
      );

      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // LOGOUT
    if (action === "logout") {
      const response = NextResponse.json({ message: "Logout successful" });
      response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
