"use client";

import { useState, useEffect } from "react";
import api from "@/app/services/api";

interface StockItem {
  id: string; // Product ID
  name: string; // Product Name
  product_type: string; // Product Type
}

interface AddExistingProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (batch: any) => void;
}

export default function AddExistingProductModal({
  isOpen,
  onClose,
  onSave,
}: AddExistingProductModalProps) {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState<StockItem[]>([]);

  // Fetch data stock dari /stock
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get("/stock");
        setStockData(response.data);
        console.log("Fetched stock data:", response.data);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };

    fetchStockData();
  }, []);

  // Ambil daftar product type unik dari stockData
  const productTypes = [...new Set(stockData.map((item) => item.product_type))];

  // Ambil daftar product name berdasarkan product type yang dipilih
  const availableProductNames = productType
    ? stockData.filter((item) => item.product_type === productType)
    : [];

  const handleSave = async () => {
    if (!productId || !productName || !productType || !expiredDate || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const newBatch = {
      product_id: productId,
      expired_date: expiredDate,
      quantity: Number(quantity),
    };

    console.log("Sending Payload:", JSON.stringify(newBatch, null, 2));

    try {
      setIsLoading(true);
      const response = await api.post("/batches", newBatch, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      onSave(response.data);
      onClose();
    } catch (error: any) {
      console.error("Full Error:", error);
      console.error("Response Data:", error.response?.data);
      alert(error.response?.data?.message || "Failed to add batch.");
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Existing Product Batch</h2>

        <div className="flex flex-wrap gap-3">
          {/* Product Type */}
          <div className="w-[48%] flex flex-col">
            <label className="text-xs text-gray-600">Product Type</label>
            <select
              value={productType}
              onChange={(e) => {
                setProductType(e.target.value);
                setProductName("");
                setProductId("");
              }}
              className="border p-1.5 text-sm rounded"
            >
              <option value="">Select Product Type</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div className="w-[48%] flex flex-col">
            <label className="text-xs text-gray-600">Product Name</label>
            <select
              value={productName}
              onChange={(e) => {
                const selectedProduct = availableProductNames.find(
                  (item) => item.name === e.target.value
                );
                setProductName(e.target.value);
                setProductId(selectedProduct ? selectedProduct.id : "");
              }}
              className="border p-1.5 text-sm rounded"
              disabled={!productType}
            >
              <option value="">Select Product Name</option>
              {availableProductNames.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Expired Date */}
          <div className="w-[48%] flex flex-col">
            <label className="text-xs text-gray-600">Expired Date</label>
            <input
              type="date"
              value={expiredDate}
              onChange={(e) => setExpiredDate(e.target.value)}
              className="border p-1.5 text-sm rounded"
            />
          </div>

          {/* Quantity */}
          <div className="w-[48%] flex flex-col">
            <label className="text-xs text-gray-600">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-1.5 text-sm rounded"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded ${isLoading ? "bg-gray-400" : "bg-blue-500"} text-white`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
