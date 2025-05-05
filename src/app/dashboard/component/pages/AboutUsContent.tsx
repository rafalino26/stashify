"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Gambar di atas */}
      <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-md">
        <Image
          src="/images/about-header.jpg" // ganti path gambar sesuai gambar kamu
          alt="About Stashify"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Teks About Us */}
      <div className="space-y-4 text-left bg-white rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800">Tentang Stashify</h1>
        <p className="text-lg text-gray-700">
        Stashify adalah platform pencatatan persediaan yang dikembangkan untuk membantu pelaku usaha dalam mengelola dan memantau stok barang secara akurat dan efisien. Kami menggunakan pendekatan metode Lower of Cost or Market (LCM) untuk memastikan bahwa nilai persediaan tercatat sesuai dengan prinsip akuntansi yang berlaku dan mencerminkan kondisi pasar terkini.
        
        </p>
        <p className="text-lg text-gray-700">
        Dengan antarmuka yang intuitif dan fitur yang dirancang khusus untuk kebutuhan pelaku usaha kecil hingga menengah, Stashify hadir sebagai solusi yang andal untuk menjaga transparansi, mengurangi risiko kerugian, serta meningkatkan efisiensi dalam manajemen inventaris.

        </p>
        <p className="text-lg text-gray-700">
        Kami berkomitmen untuk memberikan layanan terbaik guna mendukung pertumbuhan dan keberlanjutan bisnis Anda melalui sistem pencatatan yang profesional, terstandarisasi, dan mudah digunakan.

        </p>
        <p className="text-lg text-gray-700">
        Stashify - Mencatat persediaan secara tepat, mendukung keputusan bisnis yang lebih baik.
        </p>
      </div>
    </div>
  );
}