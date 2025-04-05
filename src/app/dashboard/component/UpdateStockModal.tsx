"use client";

import { useState } from "react";
import api from "@/app/services/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    quantity: number;
  } | null;
  onUpdate: () => void;
};

export default function UpdateStockModal({ isOpen, onClose, product, onUpdate }: Props) {
  const [movementType, setMovementType] = useState<"IN" | "OUT">("IN");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpdateStock = async () => {
    if (!product) return;

    setLoading(true);
    try {
      await api.post("/movement", {
        batch_id: product.id,
        movement_type: movementType,
        quantity: quantity,
      });

      onUpdate(); // Refresh data setelah update
      onClose(); // Tutup modal
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update stock");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Stock - {product.name}</h2>

        {/* Dropdown IN/OUT */}
        <label className="text-sm text-gray-600">Movement Type</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={movementType}
          onChange={(e) => setMovementType(e.target.value as "IN" | "OUT")}
        >
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        {/* Input Quantity */}
        <label className="text-sm text-gray-600">Quantity</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-4"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500"}`}
            onClick={handleUpdateStock}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
