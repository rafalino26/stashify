"use client";

import { useState } from "react";
import NewProductModal from "@/app/dashboard/component/NewProductModal";

export default function InventoryContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productTypes, setProductTypes] = useState(["Food", "Beverage", "Personal Care"]);
  const [inventoryData, setInventoryData] = useState([
    { id: 1, product: "Sugar", itemCode: "0001", price: "Rp15.000", stock: "25 pcs", type: "Food" },
        { id: 2, product: "Flour", itemCode: "0002", price: "Rp12.000", stock: "30 pcs", type: "Food" },
        { id: 3, product: "Rice", itemCode: "0003", price: "Rp20.000", stock: "50 pcs", type: "Food" },
        { id: 4, product: "Salt", itemCode: "0004", price: "Rp5.000", stock: "100 pcs", type: "Food" },
        { id: 5, product: "Coffee", itemCode: "0005", price: "Rp25.000", stock: "40 pcs", type: "Beverage" },
        { id: 6, product: "Oil", itemCode: "0006", price: "Rp25.000", stock: "40 pcs", type: "Food" },
        { id: 7, product: "Shampoo", itemCode: "0007", price: "Rp50.000", stock: "20 pcs", type: "Personal Care"},
  ]);

  const handleAddProduct = (newProduct: any) => {
    const newItem = {
      id: inventoryData.length + 1,
      product: newProduct.productName,
      itemCode: `000${inventoryData.length + 1}`,
      price: `Rp${newProduct.price}`,
      stock: `${newProduct.quantity} pcs`,
      type: newProduct.productType,
    };
    setInventoryData([...inventoryData, newItem]);
  };

  const addProductType = (newType: string) => {
    if (!productTypes.includes(newType)) {
      setProductTypes([...productTypes, newType]);
    }
  };

  return (
    <div className="p-6 -mt-5 bg-[#C7DFEA] min-h-screen text-black">
      {/* Search, Filter & Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none shadow-sm"
        />
        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none shadow-sm"
          value={selectedProductType}
          onChange={(e) => setSelectedProductType(e.target.value)}
        >
          <option value="">Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Product +
        </button>
      </div>

      {/* Jika belum memilih product type, tampilkan pesan */}
      {selectedProductType === "" ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          Please select product type
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse text-black">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Product</th>
                <th className="p-2">Item Code</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData
                .filter(
                  (item) =>
                    item.type === selectedProductType &&
                    item.product.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.product}</td>
                    <td className="p-2">{item.itemCode}</td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">{item.stock}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Tambah Produk */}
      <NewProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddProduct}
        productTypes={productTypes}
        addProductType={addProductType}
      />
    </div>
  );
}
