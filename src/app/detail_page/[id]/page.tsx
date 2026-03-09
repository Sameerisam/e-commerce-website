"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCart, setPendingCartItem, setBuyNowItem } from "@/redux/slices/add_To_Cart/page";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { store, RootState } from "@/redux/store";

type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Detail_Page() {
  return (
    <Provider store={store}>
      <DetailPage />
    </Provider>
  );
}

function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get<Product>(`/api/products/${id}`)
        .then((resp) => {
          setProduct(resp.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  // Loading state
  if (isLoading || !product) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading product details...</p>
      </div>
    );
  }


  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-warning me-1" />);
      } else if (i === Math.ceil(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning me-1" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-secondary me-1" />);
      }
    }
    return stars;
  };


  const handleAddToCart = () => {
    if (!isLoggedIn) {
      dispatch(
        setPendingCartItem({
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
        })
      );
      router.push(`/login?callbackUrl=/detail_page/${id}&action=addToCart`);
      return;
    }

    dispatch(
      addCart({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
      })
    );

    toast.success("Added to cart successfully!", {
      position: "top-left",
      autoClose: 2000,
    });
    setQuantity(1);
  };


  const handleBuyNow = () => {
    const buyNowProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    };

    if (!isLoggedIn) {

      dispatch(setBuyNowItem(buyNowProduct));
      router.push(`/login?callbackUrl=/delivery_Information&action=buyNow`);
      return;
    }


    dispatch(setBuyNowItem(buyNowProduct));
    router.push('/delivery_Information');
  };

  //  Page Layout
  return (
    <div className="container my-5">
      <div className="row shadow-lg p-4 rounded-4 bg-white">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded-3"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <p className="text-success text-uppercase fw-semibold mb-2">
            {product.category}
          </p>

          <div className="d-flex align-items-center mb-3">
            {renderRatingStars(product.rating.rate)}
            <span className="text-muted ms-2">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-muted mb-4">{product.description}</p>

          <h3 className="text-primary fw-bold mb-4">${product.price}</h3>

          <div className="d-flex align-items-center mb-4">
            <span className="me-3 fw-semibold">Quantity:</span>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <button type="button" className="btn btn-light">
                {quantity}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-success flex-fill py-2"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-2"></i>Add to Cart
            </button>

            <button
              type="button"
              className="btn btn-primary flex-fill py-2"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
