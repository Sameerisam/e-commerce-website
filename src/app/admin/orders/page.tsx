"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Package, Eye, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

type Order = {
    _id: string;
    userEmail: string;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
    items: any[];
    shippingAddress: {
        fullName: string;
        city: string;
    };
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const resp = await axios.get("/api/orders");
            setOrders(resp.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Processing": return <Clock size={16} className="text-warning" />;
            case "Shipped": return <Truck size={16} className="text-primary" />;
            case "Delivered": return <CheckCircle size={16} className="text-success" />;
            case "Cancelled": return <XCircle size={16} className="text-danger" />;
            default: return null;
        }
    };

    if (loading) return <div className="text-center p-5">Loading orders...</div>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0 text-dark">Order Management</h2>
                <div className="badge bg-white text-dark border p-2 px-3 shadow-sm">
                    Total Orders: {orders.length}
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="py-3">Customer</th>
                                <th className="py-3">Amount</th>
                                <th className="py-3">Payment</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Date</th>
                                <th className="py-3 text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-5 text-muted">
                                        <Package size={48} className="mb-3 opacity-25" />
                                        <p>No orders placed yet.</p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-4 py-3 fw-medium">#{order._id.slice(-6).toUpperCase()}</td>
                                        <td className="py-3">
                                            <div>
                                                <div className="fw-semibold">{order.shippingAddress.fullName}</div>
                                                <div className="text-muted small">{order.userEmail}</div>
                                            </div>
                                        </td>
                                        <td className="py-3 fw-bold text-primary">${order.totalAmount.toFixed(2)}</td>
                                        <td className="py-3">
                                            <div className="small">
                                                <div className="fw-medium">{order.paymentMethod}</div>
                                                <span className={`badge ${order.paymentStatus === 'Completed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                {getStatusIcon(order.orderStatus)}
                                                <span className="fw-medium">{order.orderStatus}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-muted small">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 text-end px-4">
                                            <button className="btn btn-light btn-sm text-primary border" title="View Details">
                                                <Eye size={16} />
                                            </button>
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
