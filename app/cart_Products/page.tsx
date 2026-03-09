"use client";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, setBuyNowItem } from "../store/slices/add_To_Cart/page";
import { store, persistor, RootState } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { PersistGate } from "redux-persist/integration/react";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    category?: string;
    quantity?: number;
};

export default function CartPage() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <CartItems />
            </PersistGate>
        </Provider>
    );
}

function CartItems() {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.addToCart.items as CartItem[]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const handleRemove = (itemId: number) => {
        dispatch(removeFromCart({ id: itemId }));


        toast.info("Removed from cart!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    const handleQuantityChange = (item: CartItem, change: number) => {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        }
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );

    if (!mounted)
        return <div className="text-center mt-5 fs-5 text-muted">Loading your cart...</div>;

    return (
        <div className="container py-5" >

            <h2 className="text-center mb-5 fw-bold text-dark">🛒 My Shopping Cart</h2>

            {cart.length === 0 ? (
                <div className="text-center text-muted fs-5">
                    Your cart is empty. <br />
                    <a href="/" className="btn btn-dark mt-3">
                        🛍️ Go Shopping
                    </a>
                </div>
            ) : (
                <div className="row">

                    <div className="col-lg-8">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex align-items-center justify-content-between border rounded-4 shadow-sm p-3 mb-3 bg-white flex-wrap"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: "120px", height: "120px", objectFit: "contain" }}
                                    className="rounded-3 mb-2 mb-md-0"
                                />

                                <div className="flex-grow-1 px-3 text-break" style={{ minWidth: "200px" }}>
                                    <h6 className="fw-semibold text-truncate mb-1" title={item.title}>
                                        {item.title}
                                    </h6>


                                    <p
                                        className="text-muted small mb-2"
                                        style={{ wordBreak: "break-word", maxWidth: "250px" }}
                                    >
                                        {item.category || "Product"} • Expected delivery:
                                        <span className="text-success fw-semibold"> 2–4 days</span>
                                    </p>

                                    <p className="fw-bold text-primary fs-6 mb-0">
                                        ${item.price.toFixed(2)}
                                    </p>

                                    <div className="mt-2 d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary me-2"
                                            onClick={() => handleQuantityChange(item, -1)}
                                        >
                                            −
                                        </button>
                                        <span className="fw-semibold">{item.quantity || 1}</span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary ms-2"
                                            onClick={() => handleQuantityChange(item, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-end mt-2 mt-md-0">
                                    <p className="fw-bold mb-2 text-primary">
                                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                                    </p>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        🗑 Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="col-lg-4">
                        <div
                            className="border rounded-4 shadow-sm p-4 bg-white sticky-top"
                            style={{
                                top: "120px",
                                zIndex: 1,
                            }}
                        >
                            <h5 className="fw-bold mb-3">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Delivery Fee</span>
                                <span>$5.00</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Discount</span>
                                <span className="text-success">−$5.00</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold mb-3">
                                <span>Total</span>
                                <span className="text-success">
                                    ${(totalPrice + 5 - 5).toFixed(2)}
                                </span>
                            </div>
                            <Link
                                href="/delivery_Information"
                                className="btn btn-success w-100 py-2 rounded-3"
                                onClick={() => dispatch(setBuyNowItem(null))}
                            >
                                Proceed to Checkout
                            </Link>
                            <p className="text-muted small text-center mt-2">
                                Secure payment powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-center" autoClose={2000} />
        </div>

    );
}
