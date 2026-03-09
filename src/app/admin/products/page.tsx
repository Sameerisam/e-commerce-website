"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, Trash2, Edit, ExternalLink, Package } from "lucide-react";

type Product = {
    _id: string;
    title: string;
    price: number;
    category: string;
    stock: number;
    image: string;
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const resp = await axios.get("/api/products");
            setProducts(resp.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete product");
        }
    };

    if (loading) return <div className="text-center p-5">Loading products...</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0 text-dark">Product Management</h2>
                <Link href="/admin/products/new" className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm">
                    <Plus size={20} />
                    <span>Add New Product</span>
                </Link>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4 py-3">Product</th>
                                <th className="py-3">Category</th>
                                <th className="py-3">Price</th>
                                <th className="py-3">Stock</th>
                                <th className="py-3 text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-5 text-muted">
                                        <Package size={48} className="mb-3 opacity-25" />
                                        <p>No products found. Start by adding one!</p>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="rounded"
                                                    style={{ width: "45px", height: "45px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                                                />
                                                <div>
                                                    <p className="mb-0 fw-semibold text-dark text-truncate" style={{ maxWidth: "250px" }}>{product.title}</p>
                                                    <span className="text-muted small fs-xs">ID: {product._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className="badge bg-secondary-subtle text-secondary text-capitalize px-3">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-3 fw-bold text-primary">${product.price.toFixed(2)}</td>
                                        <td className="py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <span className={`fw-medium ${product.stock < 10 ? "text-danger" : "text-dark"}`}>
                                                    {product.stock}
                                                </span>
                                                {product.stock < 10 && <span className="small text-danger">(Low)</span>}
                                            </div>
                                        </td>
                                        <td className="py-3 text-end px-4">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Link href={`/detail_page/${product._id}`} target="_blank" className="btn btn-light btn-sm text-primary" title="View Storefront">
                                                    <ExternalLink size={16} />
                                                </Link>
                                                <Link href={`/admin/products/edit/${product._id}`} className="btn btn-light btn-sm text-info" title="Edit">
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="btn btn-light btn-sm text-danger"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
