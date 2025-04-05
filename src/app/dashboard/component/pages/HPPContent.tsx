"use client";

import { useState } from "react";

export default function HPPContent() {
  const [biayaProduksi, setBiayaProduksi] = useState(0);
  const [jumlahProduksi, setJumlahProduksi] = useState("");
  const [persentaseLaba, setPersentaseLaba] = useState("");

  // Format angka dengan titik sebagai pemisah ribuan
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Perhitungan otomatis
  const hpp = jumlahProduksi && Number(jumlahProduksi) > 0 ? biayaProduksi / Number(jumlahProduksi) : 0;
  const hargaJual = hpp + (Number(persentaseLaba) / 100) * hpp;
  const labaKeuntungan = hargaJual - hpp;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white text-black shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Perhitungan Harga Pokok Produksi (HPP)</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Total Biaya Produksi (Rp)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formatNumber(biayaProduksi)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\./g, "");
              setBiayaProduksi(Number(rawValue) || 0);
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Jumlah Produksi</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={jumlahProduksi}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\./g, "");
              setJumlahProduksi(rawValue);
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Persentase Laba (%)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={persentaseLaba}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\./g, "");
              setPersentaseLaba(rawValue);
            }}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold">Hasil Perhitungan:</h2>
        <p>Harga Pokok Produksi (HPP): <strong>Rp {formatNumber(Number(hpp.toFixed(2)))}</strong></p>
        <p>Harga Jual: <strong>Rp {formatNumber(Number(hargaJual.toFixed(2)))}</strong></p>
        <p>Laba Keuntungan: <strong>Rp {formatNumber(Number(labaKeuntungan.toFixed(2)))}</strong></p>
      </div>
    </div>
  );
}
