"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import api from "@/app/services/api";

type BarData = {
    name: string;
    masuk: number;
    keluar: number;
  };
  
  type PieData = {
    name: string;
    value: number;
    color: string;
  };
  
  type Announcement = {
    id: string;
    message: string;
    type: string;
    product_name: string;
    product_id: string;
    created_at: string;
  };
  
  
  export default function Dashboard() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [barData, setBarData] = useState<BarData[]>([]);
    const [pieData, setPieData] = useState<PieData[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          const [dashboardRes, announcementRes] = await Promise.all([
            api.get("/dashboard", { withCredentials: true }),
            api.get("/announcement"),
          ]);
    
          const data = dashboardRes.data;
          const announcementData = announcementRes.data.data;
    
          // Set cards
          setTotalProducts(data.totalProducts);
          setLowStockCount(data.lowStockCount);
    
          // Transform bar data
          const bar = data.last7DaysMovements.map((item: any) => ({
            name: item.period,
            masuk: item.total_in,
            keluar: item.total_out,
          }));
          setBarData(bar);
    
          // Transform pie data
          const pie = data.productTypeDistribution.map((item: any) => ({
            name: item.product_type,
            value: item.percentage,
            color: getRandomColor(item.product_type),
          }));
          setPieData(pie);
    
          // Set announcements
          setAnnouncements(announcementData);
        } catch (error) {
          console.error("Failed to fetch dashboard or announcement data:", error);
        }
      };
    
      fetchDashboardData();
    }, []);
    
  const getRandomColor = (name: string) => {
    const colors: { [key: string]: string } = {
      dairy: "#f97316",
      candy: "#3b82f6",
      electronics: "#8b5cf6",
      accessories: "#b9ff39",
      furniture: "#ec4899",
      stationery: "#6b7280",
    };
    return colors[name] || "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className="p-6 space-y-6 text-black">
      {/* Section: Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Total Product */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-4xl font-bold">{totalProducts}</p>
          <p className="text-sm text-gray-500 mt-1">Total number of products in inventory</p>
        </div>

        {/* Card: Low Stock */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-4xl font-bold">{lowStockCount}</p>
          <p className="text-sm text-gray-500 mt-1">Stock below minimum threshold</p>
        </div>
      </div>

     {/* Section: Stock Movement & Announcement */} 
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Stock Movement */}
  <div className="bg-white p-6 rounded-2xl shadow-md border">
    <div className="mb-4">
      <h2 className="text-xl font-bold">Stock Movement</h2>
      <p className="text-sm text-gray-500">Total daily stock in and out movement</p>
    </div>
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="masuk" fill="#b9ff39" name="Stock In" />
          <Bar dataKey="keluar" fill="#f44336" name="Stock Out" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Announcement */}
  <div className="bg-white p-6 rounded-2xl shadow-md border overflow-y-auto max-h-80">
    <div className="mb-4">
      <h2 className="text-xl font-bold">Announcements</h2>
      <p className="text-sm text-gray-500">Important system alerts and updates</p>
    </div>
    <ul className="space-y-4">
      {announcements.length === 0 ? (
        <p className="text-sm text-gray-500">No announcements.</p>
      ) : (
        announcements.map((item) => (
          <li key={item.id} className="border-l-4 pl-4 border-yellow-400">
            <p className="text-sm text-gray-800">{item.message}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(item.created_at).toLocaleString()}</p>
          </li>
        ))
      )}
    </ul>
  </div>
</div>

      {/* Section: Stock Distribution Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Stock Distribution</h2>
          <p className="text-sm text-gray-500">Comparison of stock quantity by product category</p>
        </div>

        <div className="w-full h-[400px] flex flex-col items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap justify-center mt-4 space-x-4">
            {pieData.map((entry, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-sm text-gray-700">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
