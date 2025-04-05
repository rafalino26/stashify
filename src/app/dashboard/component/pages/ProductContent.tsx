"use client";

import { useState, useEffect } from "react";
import NewProductModal from "@/app/dashboard/component/NewProductModal";
import api from "@/app/services/api";

export default function ProductContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);




  const fetchInventory = async () => {
    setLoading(true);
    setError("");
  
    try {
      // Ambil tanggal hari ini
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Atur ke awal hari
  
      let startDate = "";
      let endDate = "";
  
      if (selectedTimeRange === "today") {
        startDate = today.toISOString().split("T")[0]; // today
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 2); // Tambah 2 hari untuk dapatkan data hari ini
        endDate = tomorrow.toISOString().split("T")[0]; // YYY-MM-DD
      } else if (selectedTimeRange === "last 3 days") {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3); // 3 hari yang lalu
        startDate = threeDaysAgo.toISOString().split("T")[0];
        const twoDaysAfter = new Date(today);
        twoDaysAfter.setDate(twoDaysAfter.getDate() + 2); // Tambah 2 hari untuk dapatkan data hari ini
        endDate = twoDaysAfter.toISOString().split("T")[0]; // YYY-MM-DD
      } else if (selectedTimeRange === "last 7 days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7); // 7 hari yang lalu
        startDate = sevenDaysAgo.toISOString().split("T")[0];
        const twoDaysAfter = new Date(today);
        twoDaysAfter.setDate(twoDaysAfter.getDate() + 2); // Tambah 2 hari untuk dapatkan data hari ini
        endDate = twoDaysAfter.toISOString().split("T")[0]; // YYY-MM-DD
      } else if (selectedTimeRange === "last 30 days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30); // 30 hari yang lalu
        startDate = thirtyDaysAgo.toISOString().split("T")[0];
        const twoDaysAfter = new Date(today);
        twoDaysAfter.setDate(twoDaysAfter.getDate() + 2); // Tambah 2 hari untuk dapatkan data hari ini
        endDate = twoDaysAfter.toISOString().split("T")[0]; // YYY-MM-DD
      } else if (selectedTimeRange !== "all") {
        const daysAgo = new Date();
        daysAgo.setDate(today.getDate() - Number(selectedTimeRange));
        startDate = daysAgo.toISOString().split("T")[0];
        const twoDaysAfter = new Date(today);
        twoDaysAfter.setDate(twoDaysAfter.getDate() + 2); // Tambah 2 hari untuk dapatkan data hari ini
        endDate = twoDaysAfter.toISOString().split("T")[0]; // YYY-MM-DD
      }
  
      // Buat parameter query API
      const params: any = { sort: "asc" };
      if (startDate && endDate) {
        params.start_date = startDate;
        params.end_date = endDate;
      }
  
      const response = await api.get("/stock", { params, withCredentials: true });
  
      console.log("API Response:", response.data);
  
      setInventoryData(response.data);
  
      // ✅ Ambil daftar product type unik dari response API
      const uniqueTypes = [...new Set((response.data as { product_type: string }[]).map(item => item.product_type))];
  
      console.log("Unique Product Types:", uniqueTypes);
  
      setProductTypes(uniqueTypes);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch inventory data");
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch data pertama kali saat komponen di-mount
  useEffect(() => {
    fetchInventory();
  }, [selectedTimeRange]); 
  const addProductType = (newType: string) => {
    console.log("Menambahkan tipe produk baru:", newType);
    setProductTypes((prev) => [...prev, newType]); // Menambah tipe produk baru ke state
  };
  
  useEffect(() => {
    console.log("Daftar Product Types Terbaru:", productTypes);
  }, [productTypes]);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/stock/${id}`);
      fetchInventory();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await api.put(`/stock/${selectedProduct.id}`, {
        name: selectedProduct.name,
        price: selectedProduct.price,
      });
      setIsEditModalOpen(false);
      fetchInventory();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="p-6 -mt-5 bg-[#C7DFEA] min-h-screen text-black">
      {/* Search, Filter & Button */}
      <div className="flex justify-between items-center mb-4">
        {/* Input Search */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none shadow-sm"
        />

        {/* Dropdown Sort by Time */}
        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none shadow-sm"
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
          <option value="all">All Day</option>
          <option value="today">Today</option>
          <option value="3">Last 3 Days</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
       </select>

        {/* Dropdown Product Type */}
        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none shadow-sm"
          value={selectedProductType}
          onChange={(e) => setSelectedProductType(e.target.value)}
        >
          <option value="">All Product Types</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

       {/* Button Section */}
<div className="flex gap-2">
  {/* Button New Product */}
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
  >
    New Product +
  </button>
</div>

      </div>

      {/* Loading State */}
      {loading && <div className="text-center text-gray-500 mt-10 text-lg">Loading inventory data...</div>}

      {/* Error Handling */}
      {error && <div className="text-center text-red-500 mt-10 text-lg">{error}</div>}

 {/* Inventory Table */}
 {!loading && !error && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse text-black">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Product</th>
                <th className="p-2">Item Code</th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{`Rp${item.price.toLocaleString("id-ID")}`}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2 relative">
  <button
    className="text-gray-600 hover:text-black"
    onClick={() => toggleDropdown(item.id)}
  >
    &#x22EE;
  </button>
  {activeDropdown === item.id && (
    <div className="absolute right-0 bg-white border shadow-md rounded mt-2 z-50">
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
        className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-200"
        onClick={() => {
          handleDeleteProduct(item.id);
          setActiveDropdown(null);
        }}
      >
        Delete Product
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
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 border rounded mb-2"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })
              }              
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleUpdateProduct}>Save</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Tambah Produk */}
      <NewProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => fetchInventory()}
        productTypes={productTypes}
        addProductType={(newType) => setProductTypes((prev) => [...prev, newType])} 
      />
      
    </div>
  );
}