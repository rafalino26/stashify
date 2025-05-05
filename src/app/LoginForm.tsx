"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { IoEyeOff, IoEye } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { loginUser } from './services/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Ini penting biar bisa navigate manual

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
  
    try {
      await loginUser(email, password);
      router.push('/dashboard/home'); // Redirect langsung tanpa popup
    } catch (err) {
      setError((err as unknown as Error).message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-5xl font-bold bg-black bg-clip-text text-transparent mb-6 leading-tight">Login</h2>

          {error && (
            <div className="text-red-600 bg-red-100 p-2 rounded text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none border bg-white placeholder-gray-500 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 focus:outline-none border rounded-md bg-white placeholder-gray-500 text-black"
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

            <button
            type="submit"
            className="w-60 ml-25 bg-black text-white py-2 rounded-full hover:bg-gray-700 flex justify-center items-center disabled:bg-gray-500"
            disabled={loading} // Tombol dinonaktifkan saat loading
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700">
            Don't have an account?{' '}
            <Link href="/register" className="text-black hover:underline">Register</Link>
          </p>
        </div>
      </div>

      <div className="w-1/2 relative flex items-center justify-center">
        <img 
          src="bekbek.jpg" 
          alt="Background Image" 
          className="w-full h-[100vh] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
  <img
    src="/logostashify.jpg"
    alt="Logo Stashify"
    className="w-28 h-28 rounded-full object-cover mb-4"
  />
  <h1 className="text-4xl font-light text-white">S T A S H I F Y</h1>
</div>

      </div>
    </div>
  );
}
