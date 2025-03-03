"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", password: "", terms: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { username: "", email: "", password: "", terms: "" };

    if (!username) newErrors.username = "Username tidak boleh kosong.";
    if (!email) newErrors.email = "Email tidak boleh kosong.";
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Format email tidak valid.";
    if (!password) newErrors.password = "Password tidak boleh kosong.";
    if (password && password.length < 8) newErrors.password = "Password minimal 8 karakter.";

    setErrors(newErrors);

    if (!valid) return;
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Kiri - Form Section */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Daftar Akun</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 text-black focus:outline-none ${
                  errors.username ? "ring-red-500" : "ring-blue-300"
                }`}
                placeholder="Masukkan username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 text-black focus:outline-none ${
                  errors.email ? "ring-red-500" : "ring-blue-300"
                }`}
                placeholder="Masukkan email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 pr-10 border rounded-md focus:ring-2 text-black focus:outline-none ${
                    errors.password ? "ring-red-500" : "ring-blue-300"
                  }`}
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-teal-400 to-cyan-500 text-white py-2 rounded-full hover:bg-blue-700"
            >
              Daftar
            </button>

            {/* Already Have Account */}
            <p className="mt-4 text-center text-sm text-gray-700">
              Sudah punya akun?{" "}
              <Link href="/" className="text-teal-500 hover:underline">Masuk</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Kanan - Profile & Title Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-500">

        {/* Profile Circle */}
        <div className="w-28 h-28 bg-black rounded-full mb-4"></div>
        {/* Title */}
        <h1 className="text-4xl font-bold text-black">STASHIFY</h1>
      </div>
    </div>
  );
}
