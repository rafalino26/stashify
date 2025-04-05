"use client";

import { useState, useEffect } from "react";
import api from "@/app/services/api"; // Import API service

export default function StockEntryContent() {
  const [stockMovements, setStockMovements] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [productTypeMap, setProductTypeMap] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // Default ke All Day


  const getDateRange = (range: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 2);
  
    let startDate: Date | null = null;
  
    switch (range) {
      case "today":
        startDate = new Date(today);
        break;
      case "last3":
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 3);
        break;
      case "last7":
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "last30":
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 30);
        break;
      default: // "all"
        startDate = null;
        break;
    }
  
    return {
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,
      endDate: endDate.toISOString().split("T")[0],
    };
  };
  

  // Ambil semua stock untuk mapping product_id ke type
  const fetchProductTypes = async () => {
    try {
      const response = await api.get("/stock", { withCredentials: true });
      const typeMap: Record<string, string> = {};
      const uniqueTypes = new Set<string>();

      response.data.forEach((item: any) => {
        typeMap[item.id] = item.product_type || "Unknown";
        uniqueTypes.add(item.product_type || "Unknown");
      });

      setProductTypeMap(typeMap);
      setProductTypes(Array.from(uniqueTypes));
    } catch (err) {
      console.error("Gagal fetch /stock untuk tipe produk");
    }
  };

  const fetchStockMovements = async () => {
    setLoading(true);
    setError("");
  
    try {
      const response = await api.get("/movement", { withCredentials: true });
  
      const { startDate, endDate } = getDateRange(dateFilter);
const filteredByDate = response.data.filter((item: any) => {
  if (!startDate) return true;

  if (!item.movement_date) {
    console.log("SKIP - No movement_date:", item);
    return false;
  }

  const movementDateObj = new Date(item.movement_date);
  if (isNaN(movementDateObj.getTime())) {
    console.log("SKIP - Invalid movement_date:", item.movement_date);
    return false;
  }

  const movementDate = movementDateObj.toISOString().split("T")[0];
  console.log(`Compare: ${movementDate} >= ${startDate} && <= ${endDate}`);
  return movementDate >= startDate && movementDate <= endDate;
});

      
      
  
      const formattedData = filteredByDate.map((item: any) => {
        const productName = item.stock_batches?.stock?.name || "Unknown";
        const itemCode = item.stock_batches?.product_id || "N/A";
        const productId = item.stock_batches?.product_id;
        const productType = productTypeMap[productId] || "Unknown";
        const movementType = item.movement_type;
        const movement = `${movementType === "IN" ? "+" : "-"}${item.quantity}`;
        const expiredDate = item.stock_batches?.expired_date
          ? new Date(item.stock_batches.expired_date).toISOString().split("T")[0]
          : "N/A";
  
        return {
          id: item.id,
          product_name: productName,
          item_code: itemCode,
          product_type: productType,
          movement,
          expired_date: expiredDate,
        };
      });
  
      setStockMovements(formattedData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch stock movements");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Jalankan fetch ulang saat dateFilter berubah
useEffect(() => {
  if (Object.keys(productTypeMap).length > 0) {
    fetchStockMovements();
  }
}, [dateFilter]);


  // Jalankan saat awal
  useEffect(() => {
    const loadData = async () => {
      await fetchProductTypes();
    };
    loadData();
  }, []);

  // Ambil stock movement setelah productTypeMap siap
  useEffect(() => {
    if (Object.keys(productTypeMap).length > 0) {
      fetchStockMovements();
    }
  }, [productTypeMap]);

  // Filter search + type
  const filteredData = stockMovements.filter((item) => {
    const matchesSearch = item.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "ALL" || item.product_type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-[#C7DFEA] min-h-screen text-black">

      <div className="flex justify-between items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none shadow-sm"
        />
        <select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
  className="bg-white px-3 py-2 rounded-md shadow-sm"
>
  <option value="all">All Day</option>
  <option value="today">Today</option>
  <option value="last3">Last 3 Days</option>
  <option value="last7">Last 7 Days</option>
  <option value="last30">Last 30 Days</option>
</select>

<select
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
  className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
>
  <option value="ALL">All Types</option>
  {productTypes.filter(Boolean).map((type, index) => (
    <option key={`${type}-${index}`} value={type}>
      {type}
    </option>
  ))}
</select>

      </div>


      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Loading */}
        {loading && <div className="text-center text-gray-500 mt-10 text-lg">Loading stock movements...</div>}

        {/* Error */}
        {error && <div className="text-center text-red-500 mt-10 text-lg">{error}</div>}

        {/* Table */}
        {!loading && !error && (
          <table className="w-full border-collapse text-black">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Product</th>
                <th className="p-2">Item Code</th>
                <th className="p-2">Update</th>
                <th className="p-2">Expired Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.product_name}</td>
                    <td className="p-2">{item.item_code}</td>
                    <td className={`p-2 ${item.movement.includes("+") ? "text-green-600" : "text-red-600"}`}>
                      {item.movement}
                    </td>
                    <td className="p-2">{item.expired_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
