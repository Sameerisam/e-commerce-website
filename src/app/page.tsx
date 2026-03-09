"use client";

import AllProducts from "../components/myProducts/page";

export default function Products() {
  return (
    <div>
      <section className="bg-primary text-white py-5 mb-5 shadow-sm overflow-hidden position-relative" style={{ minHeight: "300px" }}>
        <div className="container py-lg-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Discover Your Next Favorite Item</h1>
              <p className="lead mb-4 opacity-75">
                Explore our curated collection of high-quality products. From tech to fashion, we have everything you need to elevate your lifestyle.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-light btn-lg px-4 fw-bold">Shop Now</button>
                <button className="btn btn-outline-light btn-lg px-4">Latest Arrivals</button>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="position-absolute scale-150 rotate-12 opacity-10" style={{ right: "-5%", top: "10%" }}>
                <i className="bi bi-cart4" style={{ fontSize: "20rem" }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold m-0">Featured Products</h2>
          <div className="badge bg-light text-dark p-2 px-3 border shadow-sm">Updated Daily</div>
        </div>
        <AllProducts />
      </div>
    </div>
  );
}
