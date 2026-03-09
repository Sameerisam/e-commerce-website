"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const categories = [
        "Electronics",
        "Jewelery",
        "Men's Clothing",
        "Women's Clothing",
        "Gaming",
        "Accessories"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/products", formData);
            router.push("/admin/products");
        } catch (err) {
            console.error("Failed to add product", err);
            alert("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <div className="mb-4 d-flex align-items-center gap-3">
                <Link href="/admin/products" className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center">
                    <ArrowLeft size={20} />
                </Link>
                <h2 className="fw-bold m-0">Add New Product</h2>
            </div>

            <div className="card border-0 shadow-sm p-4 rounded-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-12">
                            <label className="form-label fw-semibold">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Ex: Wireless Headphones"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Category</label>
                            <select name="category" className="form-select" required onChange={handleChange}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                placeholder="0.00"
                                step="0.01"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Stock Quantity</label>
                            <input
                                type="number"
                                name="stock"
                                className="form-control"
                                placeholder="0"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-semibold">Image URL</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light text-muted">
                                    <ImageIcon size={18} />
                                </span>
                                <input
                                    type="url"
                                    name="image"
                                    className="form-control"
                                    placeholder="https://example.com/image.jpg"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-2 small text-muted">Enter a direct image link for the product thumbnail.</div>
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-semibold">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows={4}
                                placeholder="Describe the product details..."
                                required
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="col-12 pt-3">
                            <div className="d-flex gap-3">
                                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2 px-5 py-2 shadow-sm" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            <span>Save Product</span>
                                        </>
                                    )}
                                </button>
                                <Link href="/admin/products" className="btn btn-light px-4 py-2">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Image Preview Mockup */}
            {formData.image && (
                <div className="mt-4 p-4 card border-0 shadow-sm rounded-4 text-center">
                    <h6 className="text-muted mb-3 fw-bold">Image Preview</h6>
                    <img
                        src={formData.image}
                        alt="Preview"
                        className="img-fluid rounded mx-auto"
                        style={{ maxHeight: "200px", objectFit: "contain" }}
                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/200?text=Invalid+URL")}
                    />
                </div>
            )}
        </div>
    );
}
