"use client";


import axios from "axios";
import { useState, useEffect } from "react";

import { Provider, useSelector } from "react-redux";
import { store } from "@/redux/store";
import Link from "next/link";


export default function AllProducts() {
  return <MyProducts />
}


function MyProducts() {

  type Product = {
    _id: string; // Internal ID
    id: number; // For compatibility if needed
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = useSelector((state: any) => state.searching.query)


  useEffect(() => {
    setLoading(true);
    axios.get<Product[]>("/api/products")
      .then((resp) => {
        console.log("Real products loaded:", resp.data);
        setProducts(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [])


  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>

            </div>
            <p className="mt-3 text-muted">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>

    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Our Products</h2>
      <div className="row g-4">
        {
          filteredProducts.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4">
              <div className="card product-card h-100">
                <img src={product.image} className="card-image-top"
                  alt={product.title}
                  style={{ height: "230px", objectFit: "contain" }}>
                </img>
                <div className="card-body text-center">
                  <h6 className="card-title text-truncate">{product.title}</h6>
                  <p className="price fw-semibold text-primary mb-2">
                    ${product.price}
                  </p>
                  <Link
                    href={`/detail_page/${product._id}`}
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center btn-card mt-3"
                  >
                    View Details
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                      width="16"
                      height="16"
                      className="ms-2"
                    >
                      <path
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </Link>

                </div>
              </div>
            </div>
          )

          )
        }
      </div>
      <style jsx>{`
.product-card { transition: transform 0.2s ease, box-shadow 0.2s ease;
 }
 .product-card:hover { transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); }
  :global(.btn-card) {
    position: relative;
    overflow: hidden;
    color: #fff;
    background-color: #198754;
    border: none;
    transition: all 0.3s ease;
  }

  :global(.btn-card::before) {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: all 0.4s ease;
  }

  :global(.btn-card:hover) {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(25, 135, 84, 0.4);
  }

  :global(.btn-card:hover::before) {
    left: 100%;
  }

  :global(.btn-card:active) {
    transform: scale(0.97);
  }
`}</style>



    </div>

  </>
}