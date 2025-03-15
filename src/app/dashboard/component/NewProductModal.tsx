"use client";

import { useState } from "react";
import NewProductTypeModal from "./NewProductTypeModal";

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
  const [isProductTypeModalOpen, setIsProductTypeModalOpen] = useState(false);

  const handleSave = () => {
    if (!productName || !productType || !price || !expiredDate || !quantity) {
      alert("Please fill all fields");
      return;
    }
    onSave({ productName, productType, price, expiredDate, quantity });
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <div className="flex items-center space-x-2">
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Product Type</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            onClick={() => setIsProductTypeModalOpen(true)}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            +
          </button>
        </div>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Expired Date (dd/mm/yyyy)"
          value={expiredDate}
          onChange={(e) => setExpiredDate(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
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
    </div>
  ) : null;
}
