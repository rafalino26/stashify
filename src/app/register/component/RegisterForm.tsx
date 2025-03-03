"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      emailOrPhone: "",
      password: "",
      confirmPassword: "",
    };

    if (!firstName) newErrors.firstName = "First name tidak boleh kosong.";
    if (!lastName) newErrors.lastName = "Last name tidak boleh kosong.";
    if (!username) newErrors.username = "Username atau company name wajib diisi.";
    if (!emailOrPhone) newErrors.emailOrPhone = "Email atau nomor telepon wajib diisi.";
    if (password.length < 8) newErrors.password = "Password minimal 8 karakter.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Konfirmasi password tidak sesuai.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    // Handle registrasi di sini (API call atau logika lainnya)
    console.log({ firstName, lastName, username, emailOrPhone, password });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Kiri - Form Section */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
        <h2 className="text-5xl font-bold bg-gradient-to-br from-teal-300 to-cyan-600 bg-clip-text text-transparent mb-6">
  Daftar
</h2>


          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First Name & Last Name (Side by Side) */}
            <div className="flex space-x-4">
            {/* First Name */}
            <div className="w-1/2">
                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 text-black focus:outline-none ${errors.firstName ? "ring-red-500" : "ring-blue-300"}`}
                placeholder="Masukkan First Name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="w-1/2">
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 text-black focus:outline-none ${errors.lastName ? "ring-red-500" : "ring-blue-300"}`}
                placeholder="Masukkan Last Name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            </div>

            {/* Username/Company Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Username/Company Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 text-black focus:outline-none ${errors.username ? "ring-red-500" : "ring-blue-300"}`}
                placeholder="Masukkan Username atau Company Name"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email/Phone */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">E-mail/Phone Number</label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-2 text-black focus:outline-none ${errors.emailOrPhone ? "ring-red-500" : "ring-blue-300"}`}
                placeholder="Masukkan E-mail atau Nomor Telepon"
              />
              {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 pr-10 border rounded-md focus:ring-2 text-black focus:outline-none ${errors.password ? "ring-red-500" : "ring-blue-300"}`}
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-2 pr-10 border rounded-md focus:ring-2 text-black focus:outline-none ${errors.confirmPassword ? "ring-red-500" : "ring-blue-300"}`}
                  placeholder="Konfirmasi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                >
                  {showConfirmPassword ? <FaEye/> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-teal-400 to-cyan-500 text-white py-2 mt-4 rounded-full hover:bg-blue-700"
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
        <div className="w-28 h-28 bg-black rounded-full mb-4"></div>
        <h1 className="text-4xl font-bold text-black">STASHIFY</h1>
      </div>
    </div>
  );
}
