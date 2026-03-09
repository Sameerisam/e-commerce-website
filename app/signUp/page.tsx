"use client"
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type user = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}

export default function SignUpPage() {
  const router = useRouter()

  const { register, handleSubmit, watch, reset, formState: { errors }, setError } = useForm<user>();


  const onSubmit = async (data: user) => {
    await axios.post("api/auth", {data, action: "signup" }).then((resp) => {
      console.log(resp.data)
      if (resp.status === 200) {
        router.push('./login')
      }
      reset();
    }).catch((error) => {
      if (error.response?.status === 400) {
        setError('email', { message: 'Email already exists' });
      }
      console.log(error, "data nhi milla")
    })


  }

  const password = watch("password");



  return (
    <div className="container mt-5 p-5 shadow rounded " style={{ maxWidth: "500px" }}>
      <h1>Get Started with your </h1>
      <h1 className="text-center">account</h1>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="form-group text-start">
          <label htmlFor="name" className="mt-2">
            <strong>UserName</strong>
          </label>
          <input
            {...register("name", { required: "name is required" })}
            type="text"
            id="name"
            className="form-control mb-3 mt-2"
            placeholder="Enter your UserName"
          />
          {errors.name &&
            <p className="text-danger">{errors.name.message}</p>
          }

          <label htmlFor="email" className="mt-2">
            <strong>Email Address</strong>
          </label>
          <input
            {...register("email", {
              required: "email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
            })}
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
            {...register("password", {
              required: "password is required",
              minLength: { value: 6, message: "At least 6 characters" }
            })}
            type="password"
            id="password"
            className="form-control mb-3 mt-2"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}

          <label htmlFor="password">
            <strong>Confirm Password</strong>
          </label>
          <input
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Password do not match"

            })}
            type="password"
            id="password"
            className="form-control mb-3 mt-2"
            placeholder="Enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button className="btn btn-primary mt-2 w-100"> Sign Up</button>
      </form>
    </div>
  )
}