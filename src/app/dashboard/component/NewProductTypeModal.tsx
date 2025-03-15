"use client";

import { useState } from "react";

interface NewProductTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newType: string) => void;
}

export default function NewProductTypeModal({
  isOpen,
  onClose,
  onSave,
}: NewProductTypeModalProps) {
  const [newType, setNewType] = useState("");

  const handleSave = () => {
    if (!newType) {
      alert("Please enter a product type");
      return;
    }
    onSave(newType);
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">New Product Type</h2>
        <input
          type="text"
          placeholder="Product Type Name"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
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
    </div>
  ) : null;
}
