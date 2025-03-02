"use client";

import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { IoEyeOff, IoEye } from 'react-icons/io5';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username dan password wajib diisi');
      return;
    }

    if (username === 'user' && password === 'password123') {
      alert('Login berhasil!');
      setError('');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#C7DFEA]">

      {/* Profile Circle */}
      <div className="w-28 h-28 bg-black rounded-full mb-4"></div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-black mb-6">SATISHFY</h1>

      {/* Form */}
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded text-center">
            {error}
          </div>
        )}

        {/* Username Field */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white placeholder-gray-500 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white placeholder-gray-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-6 text-sm text-gray-700">
        Don't have an account?{' '}
        <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
      </p>
    </div>
  );
}
