"use client";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";
import { setSearchQuery } from "@/redux/slices/searching/page";
import { logout } from "@/redux/slices/usersSlice/page";
import { setUserEmail } from "@/redux/slices/add_To_Cart/page"; // ✅ Add this import
import type { RootState } from "@/redux/store";
import axios from "axios";

export default function Page() {
  return <Header />;
}


function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.addToCart.items);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  const [mounted, setMounted] = useState(false);
  const showSearch = pathname === "/";
  const userEmail = useSelector((state: RootState) => state.addToCart.userEmail);

  const hideCart = pathname === "/login" || pathname === "/signUp";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      const userEmailStr = String(user.email);

      if (userEmail !== userEmailStr) {

        dispatch(setUserEmail(userEmailStr));
      }
      setMounted(true);
    } else if (!isLoggedIn && userEmail) {
      dispatch(setUserEmail(null));
      setMounted(true);
    } else {
      setMounted(true);
    }
  }, [isLoggedIn, user, userEmail, dispatch]);

  const handleOnChange = (e: any) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = async () => {
    try {
      // 1️⃣ Save current cart to user's saved cart before logout
      // setUserEmail(null) will handle saving the cart
      dispatch(setUserEmail(null));

      // 2️⃣ Call API to remove token cookie
      await axios.post("/api/auth", { action: "logout" });

      // 3️⃣ Clear user info (cart is already saved)
      dispatch(logout());

      // 4️⃣ Redirect to home page (main page) - 
      router.replace("/");

    } catch (error) {
      console.error("Logout failed:", error);
      // Even on error, redirect to home page
      router.replace("/");
    }
  };


  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <div className="d-flex align-items-center gap-3">
            <a className="navbar-brand fw-bold fs-3" href="/">
              MY <span className="text-primary">Store</span>
            </a>

            {isLoggedIn && user?.email && (
              <span className="text-secondary small">
                <i className="bi bi-envelope me-1"></i> {user.email}
              </span>
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-3">
              {[
                { label: "Shop", href: "/" },
                { label: "Shop", href: "/" },
                { label: "Shop", href: "/" },
                { label: "Shop", href: "/" },
                { label: "Shop", href: "/" },
              ].map(({ label, href }) => (
                <li key={href} className="nav-item">
                  <a className="nav-link active" href={href}>
                    {label}
                  </a>
                </li>
              ))}

              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/faq">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/gift-card">
                  Gift Card
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Search */}
            {showSearch && (
              <form className="d-none d-md-flex">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleOnChange}
                />
              </form>
            )}

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                <i className="bi bi-box-arrow-right" /> Logout
              </button>
            ) : (
              <a href="/login" className="btn btn-outline-dark btn-sm">
                <i className="bi bi-person" /> Log In
              </a>
            )}

            {/* Cart - Hide on login/signup pages */}
            {!hideCart && (
              <a href="/cart_Products" className="position-relative text-dark text-decoration-none">
                <i className="bi bi-cart-plus me-2 fs-3" />
                {mounted && cart && cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                )}
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
