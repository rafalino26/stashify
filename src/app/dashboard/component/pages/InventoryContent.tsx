"use client";

import { useState, useEffect } from "react";
import api from "@/app/services/api";
import AddExistingProductModal from "../AddExistingProductModal";
import UpdateStockModal from "../UpdateStockModal";

export default function InventoryContent() {
  type InventoryItem = {
    id: string;
    name: string;
    quantity: number;
    expiration_date: string;
    product_type: string;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddExistingModalOpen, setIsAddExistingModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<InventoryItem | null>(null);



 // 🔹 Fungsi untuk mendapatkan start_date dan end_date sesuai pilihan user
const getDateRange = (range: string): { startDate: string | null; endDate: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Atur ke awal hari

  let startDate: string | null = null;
  let endDate = "";

  // 🔹 end_date selalu hari ini + 2 hari
  const twoDaysAfter = new Date(today);
  twoDaysAfter.setDate(twoDaysAfter.getDate() + 2);
  endDate = twoDaysAfter.toISOString().split("T")[0]; // Format YYYY-MM-DD

  switch (range) {
    case "today":
      startDate = today.toISOString().split("T")[0]; // Hari ini
      break;
    case "last3":
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(today.getDate() - 3);
      startDate = threeDaysAgo.toISOString().split("T")[0];
      break;
    case "last7":
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      startDate = sevenDaysAgo.toISOString().split("T")[0];
      break;
    case "last30":
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      startDate = thirtyDaysAgo.toISOString().split("T")[0];
      break;
    default:
      startDate = null; // "All Day" tanpa filter tanggal
  }

  return { startDate, endDate };
};

// 🔹 Fetch inventory dengan filter tanggal
const fetchInventory = async () => {
  setLoading(true);
  setError("");

  try {
    const { startDate, endDate } = getDateRange(selectedDateRange);
    
    // 🔹 Buat params untuk request API
    const params: Record<string, string> = { end_date: endDate };
    if (startDate) params.start_date = startDate;

    const response = await api.get("/batches", {
      params,
      withCredentials: true,
    });

    console.log("API Response:", response.data);

    const formattedData: InventoryItem[] = response.data.map((item: any) => ({
      id: item.id,
      name: item.product_name,
      quantity: item.quantity,
      expiration_date: item.expired_date || "Unknown",
      product_type: item.product_type || "Unknown",
    }));

    setInventoryData(formattedData);
    setFilteredData(formattedData);

    const uniqueTypes = [...new Set(formattedData.map((item) => item.product_type))];
    setProductTypes(uniqueTypes);
  } catch (err: any) {
    setError(err.response?.data?.message || "Failed to fetch inventory data");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchInventory();
  }, [selectedDateRange]);

  // 🔹 Filter berdasarkan tipe produk dan pencarian
  useEffect(() => {
    let filtered = inventoryData;

    if (selectedType) {
      filtered = filtered.filter((item) => item.product_type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedType, searchTerm, inventoryData]);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const handleEditProduct = (item: any) => {
    setSelectedProduct(item);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this batch?")) return;
    try {
      await api.delete(`/batches/${id}`);
      fetchInventory(); // Refresh data setelah delete
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete batch");
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
  
    setIsSaving(true); // Mulai loading
  
    try {
      await api.put(`/batches/${selectedProduct.id}`, { 
        expired_date: selectedProduct.expiration_date 
      });
      fetchInventory(); // Refresh data setelah update
      setIsEditModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update product");
    } finally {
      setIsSaving(false); // Selesai loading
    }
  };
  
  
  

  return (
    <div className="p-6 -mt-5 bg-[#C7DFEA] min-h-screen text-black">
      <div className="flex justify-between items-center mb-4 space-x-4">
        {/* 🔹 Input Search */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none shadow-sm"
        />

        {/* 🔹 Dropdown Filter Product Type */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
        >
          <option value="">All Types</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* 🔹 Filter Date Dropdown */}
        <select
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
        >
          <option value="all">All Day</option>
          <option value="today">Today</option>
          <option value="last3">Last 3 Days</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
        </select>

        <div className="flex gap-2">
          {/* Tombol Add Existing Product */}
          <button
            onClick={() => setIsAddExistingModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-600"
          >
            Add Existing Product +
          </button>
        </div>
      </div>

      {loading && <div className="text-center text-gray-500 mt-10 text-lg">Loading inventory data...</div>}
      {error && <div className="text-center text-red-500 mt-10 text-lg">{error}</div>}

      {!loading && !error && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse text-black">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Product</th>
                <th className="p-2">Item Code</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Expiration Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.expiration_date}</td>
                  <td className="p-2 relative">
  <button
    className="text-gray-600 hover:text-black"
    onClick={() => toggleDropdown(item.id)}
  >
    &#x22EE; {/* Icon titik tiga */}
  </button>
  {activeDropdown === item.id && (
   <div className="absolute right-0 bg-white border shadow-md rounded mt-2 w-32 z-50">
   <button
     className="block px-4 py-2 w-full text-left hover:bg-gray-200"
     onClick={() => {
       handleEditProduct(item);
       setActiveDropdown(null);
     }}
   >
     Edit Product
   </button>
   <button
     className="block px-4 py-2 w-full text-left hover:bg-gray-200"
     onClick={() => {
       setSelectedStockItem(item);
       setIsUpdateStockModalOpen(true);
       setActiveDropdown(null);
     }}
   >
     Update Stock
   </button>
   <button
     className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-200"
     onClick={() => {
       handleDeleteProduct(item.id);
       setActiveDropdown(null);
     }}
   >
     Delete
   </button>
 </div>
 
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
           {/* Modal Edit Product */}
{isEditModalOpen && selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      {/* Expired Date */}
      <label className="text-sm text-gray-600">Expired Date</label>
      <input
        type="date"
        className="w-full p-2 border rounded mb-4"
        value={selectedProduct.expiration_date}
        onChange={(e) =>
          setSelectedProduct({ ...selectedProduct, expiration_date: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => setIsEditModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${isSaving ? "bg-gray-400" : "bg-blue-500"}`}
          onClick={handleUpdateProduct}
          disabled={isSaving} // Disable saat sedang menyimpan
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  </div>
)}
<UpdateStockModal
  isOpen={isUpdateStockModalOpen}
  onClose={() => setIsUpdateStockModalOpen(false)}
  product={selectedStockItem}
  onUpdate={fetchInventory}
/>

<AddExistingProductModal
  isOpen={isAddExistingModalOpen}
  onClose={() => setIsAddExistingModalOpen(false)}
  onSave={() => fetchInventory()}
/>
    </div>
  );
}
