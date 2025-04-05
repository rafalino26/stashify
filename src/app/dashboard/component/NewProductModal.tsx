"use client";

import { useState } from "react";
import NewProductTypeModal from "./NewProductTypeModal";
import api from "@/app/services/api";
import { useRouter } from "next/navigation";

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
  productTypes: string[];
  addProductType: (newType: string) => void;
}

export default function NewProductModal({
  isOpen,
  onClose,
  onSave,
  productTypes,
  addProductType,
}: NewProductModalProps) {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProductTypeModalOpen, setIsProductTypeModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isDuplicatePopupOpen, setIsDuplicatePopupOpen] = useState(false); // Popup duplikasi
  const router = useRouter();

  const resetForm = () => {
    setProductName("");
    setProductType("");
    setPrice("");
    setExpiredDate("");
    setQuantity("");
    setDescription("");
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
    const formattedValue = Number(rawValue).toLocaleString("id-ID"); // Tambah titik ribuan
    setPrice(formattedValue);
  };

  const handleSave = async () => {
    if (!productName || !productType || !price || !expiredDate || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const formattedPrice = Number(price.replace(/\./g, ""));

    const newProduct = {
      name: productName,
      product_type: productType,
      description: description || "",
      price: formattedPrice,
      expired_date: expiredDate,
      quantity: Number(quantity),
    };


    try {
      setIsLoading(true);

      // **Cek apakah produk dengan nama dan tipe yang sama sudah ada**
      const checkResponse = await api.get("/stock", {
        params: { name: productName, product_type: productType },
      });
      console.log("Check response:", checkResponse.data);

      const existingProduct = checkResponse.data.find(
        (p: any) =>
          p.name.toLowerCase().trim() === productName.toLowerCase().trim() &&
          p.product_type.toLowerCase().trim() === productType.toLowerCase().trim()
      );
      
      if (existingProduct) {
        setIsDuplicatePopupOpen(true);
        setIsLoading(false);
        return;
      }
      
      
      // **Jika produk belum ada, simpan produk baru**
      const response = await api.post("/stock", newProduct, {
        headers: { "Content-Type": "application/json" },
      });

      onSave(response.data);
      resetForm();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save product. Please check your authorization.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[1200px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">New Product</h2>

           <div className="flex flex-wrap gap-3">
          {/* Product Name */}
          <div className="w-[calc(19%+1px)] flex flex-col">
            <label className="text-xs text-gray-600">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-1.5 text-sm rounded"
            />
          </div>

          {/* Product Type */}
          <div className="w-[calc(19%+1px)] flex flex-col">
            <label className="text-xs text-gray-600">Product Type</label>
            <div className="flex items-center space-x-2">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full border p-1.5 text-sm rounded"
              >
                <option value="">Select Product Type</option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                onClick={() => setIsProductTypeModalOpen(true)}
                className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="w-[calc(19%+1px)] flex flex-col">
            <label className="text-xs text-gray-600">Price</label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="border p-1.5 text-sm rounded"
            />
          </div>

          {/* Expired Date */}
          <div className="w-[calc(19%+1px)] flex flex-col">
            <label className="text-xs text-gray-600">Expired Date</label>
            <input
              type="date"
              value={expiredDate}
              onChange={(e) => setExpiredDate(e.target.value)}
              className="border p-1.5 text-sm rounded"
            />
          </div>

          {/* Quantity */}
          <div className="w-[calc(19%+1px)] flex flex-col">
            <label className="text-xs text-gray-600">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-1.5 text-sm rounded"
            />
          </div>
        </div>

        {/* Tombol Save & Cancel */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded">
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
      <NewProductTypeModal
        isOpen={isProductTypeModalOpen}
        onClose={() => setIsProductTypeModalOpen(false)}
        onSave={(newType) => {
          addProductType(newType);
          setProductType(newType);
        }}
      />
 {/* Popup Duplicate Product */}
 {isDuplicatePopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          onClick={() => setIsDuplicatePopupOpen(false)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setIsDuplicatePopupOpen(false)}
            >
              ✕
            </button>
            <p className="text-lg font-semibold mb-4">Want to add existing product?</p>
            <p className="text-gray-700 mb-4">Go to Inventory page</p>
            <div className="flex justify-end">
              <button 
                onClick={() => router.push("/dashboard/inventory")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
