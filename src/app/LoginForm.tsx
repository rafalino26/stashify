"use client";

import Link from 'next/link';
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
      setError('Username and password are required');
      return;
    }

    if (username === 'tups' && password === 'tupsgans') {
      alert('Login Success!');
      setError('');
    } else {
      setError('Inccorect Username atau password');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Kiri - Form Section */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold bg-gradient-to-br from-teal-300 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">Login</h2>

          {error && (
            <div className="text-red-600 bg-red-100 p-2 rounded text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none border bg-white placeholder-gray-500 text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            {/* Password Field */}
            <div className="relative ">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2  focus:outline-none border rounded-md bg-white placeholder-gray-500 text-black"
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
              className="w-60 ml-25 bg-gradient-to-br from-teal-400 to-cyan-500 text-white py-2 rounded-full hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-sm text-gray-700">
            Don't have an account?{' '}
            <Link href="/register" className="text-teal-500 hover:underline">Register</Link>
          </p>
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
