"use client";

import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-[#C7DFEA]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Profile Circle */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-black rounded-full"></div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold mt-4 text-black">SATISHFY</h1>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {error && (
            <div className="text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {/* Username Field */}
          <div className="relative">

            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          {/* Password Field */}
          <div className="relative">

            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
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
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
