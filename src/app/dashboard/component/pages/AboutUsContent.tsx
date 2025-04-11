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
          <strong>Stashify</strong> dimulai dari sebuah project mata kuliah <em>Perancangan SIA</em>
        </p>
        <p className="text-lg text-gray-700">
          <strong>Stashify ada karena torang ada, anjay😭</strong>
        </p>
        <p className="text-md text-gray-600 italic">
          But then out of the blue, a spark or two<br />
          Seems to generate
        </p>
        <p className="text-md text-gray-600 italic">
          Now I'm bothering you, it's bothering me<br />
          What can I do? What should I do?<br />
          We're not too far, look where we are<br />
          Bothering me, bothering you
        </p>
      </div>
    </div>
  );
}