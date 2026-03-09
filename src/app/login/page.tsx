"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/usersSlice/page";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store, RootState } from "@/redux/store";
import { setUserEmail } from "@/redux/slices/add_To_Cart/page"; // 👈 add this import

type User = {
  email: string;
  password: string;
};

export default function LogInPage() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LogIn />
      </PersistGate>
    </Provider>
  );
}

function LogIn() {
  const { register, handleSubmit, setError, formState: { errors }, reset, } = useForm<User>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const pendingCartItem = useSelector((state: RootState) => state.addToCart.pendingCartItem);
  const buyNowItem = useSelector((state: RootState) => state.addToCart.buyNowItem);

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const action = searchParams.get("action"); // "addToCart" or "buyNow"

  const onSubmitt = async (data: User) => {
    try {
      const resp = await axios.post("/api/auth", { action: "login", data });

      console.log(resp.data, "data received");

      if (resp.status === 200) {
        //  store token and email in user slice
        dispatch(
          login({
            email: data.email,
            token: resp.data.token || "dummy-token",
          })
        );

        // . set current user email for cart slice - this will load user's saved cart
        // Note: setUserEmail already handles pendingCartItem automatically
        dispatch(setUserEmail(data.email));

        reset();

        // Navigate based on action
        if (action === "buyNow" || buyNowItem) {
          // For buy now, go to delivery page (buyNowItem is already set)
          setTimeout(() => {
            router.push('/delivery_Information');
          }, 300);
        } else if (pendingCartItem) {
          if (action === "addToCart") {
            // For add to cart, go back to detail page
            setTimeout(() => {
              router.push(callbackUrl);
            }, 300);
          } else {
            setTimeout(() => {
              router.push(callbackUrl);
            }, 300);
          }
        } else {
          // Small delay to ensure state is updated before navigation
          setTimeout(() => {
            router.push(callbackUrl);
          }, 100);
        }
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError("password", { message: "Email or password is wrong!" });
      }
      console.log(error, "my error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitt)}>
      <div
        className="container p-4 my-5 bg-light rounded shadow"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="text-center mb-4">Log In</h1>
        <h6 className="text-center mt-2 text-muted">Please enter your details</h6>

        <div className="form-group text-start">
          <label htmlFor="email" className="mt-2">
            <strong>Email Address</strong>
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            className="form-control mb-3 mt-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}

          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            className="form-control mb-3 mt-2"
            placeholder="Enter your password"
          />
        </div>

        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <a href="#" className="text-decoration-none">
            Forgot Password?
          </a>
          <div>
            <span className="me-2">Don &apos;t have an account</span>
            <Link href='/signUp' className="text-primary">Register</Link>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </div>
      </div>
    </form>
  );
}
