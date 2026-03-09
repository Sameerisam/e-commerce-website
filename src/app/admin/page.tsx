"use client";

import { ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-success", bg: "bg-success-subtle" },
        { label: "Total Orders", value: "145", icon: ShoppingBag, color: "text-primary", bg: "bg-primary-subtle" },
        { label: "Total Customers", value: "89", icon: Users, color: "text-info", bg: "bg-info-subtle" },
        { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, color: "text-warning", bg: "bg-warning-subtle" },
    ];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0">Dashboard Overview</h2>
                <div className="text-muted small">Updated: {new Date().toLocaleDateString()}</div>
            </div>

            <div className="row g-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="col-12 col-sm-6 col-xl-3">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body d-flex align-items-center p-4">
                                    <div className={`${stat.bg} ${stat.color} p-3 rounded-4 me-4`}>
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h6 className="text-muted mb-1 fs-xs fw-semibold text-uppercase tracking-wider">
                                            {stat.label}
                                        </h6>
                                        <h3 className="fw-bold mb-0">{stat.value}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="row mt-5">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        <h5 className="fw-bold mb-4">Recent Orders</h5>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[101, 102, 103].map(id => (
                                        <tr key={id}>
                                            <td className="fw-medium">#ORD-{id}</td>
                                            <td>Customer {id - 100}</td>
                                            <td>
                                                <span className="badge bg-success-subtle text-success px-3">Completed</span>
                                            </td>
                                            <td className="fw-semibold">$240.00</td>
                                            <td className="text-muted small">Mar 10, 2026</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <h5 className="fw-bold mb-4">Top Categories</h5>
                        <div className="d-flex flex-column gap-3">
                            {["Electronics", "Fashion", "Gaming"].map((cat, i) => (
                                <div key={cat}>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-medium">{cat}</span>
                                        <span className="text-muted small">{75 - i * 15}%</span>
                                    </div>
                                    <div className="progress" style={{ height: "6px" }}>
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${75 - i * 15}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
