"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { registerUser } from "@/app/services/auth";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      emailOrPhone: "",
      password: "",
      confirmPassword: "",
    };

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!username) newErrors.username = "Username or company name is required.";
    if (!emailOrPhone) newErrors.emailOrPhone = "Email or phone number is required.";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Password confirmation does not match.";
    

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    try {
        setLoading(true);
        // Panggil API register
        const response = await registerUser(firstName, lastName, username, emailOrPhone, password);
        
        // Jika berhasil, tampilkan pesan sukses
        setMessage("Registration successful! Please check your email to verify your account.");
        console.log("Registration Success:", response);
  
        // Reset form setelah berhasil registrasi
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmailOrPhone("");
        setPassword("");
        setConfirmPassword("");
      } catch (error: any) {
        // Tampilkan pesan error jika registrasi gagal
        setMessage(error.message || "Registration failed.");
        console.error("Registration Error:", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Kiri - Form Section */}
      <div className="w-1/2 flex items-center justify-center p-8 pl-24">
        <div className="w-full max-w-md">
        <h2 className="text-5xl font-bold bg-black bg-clip-text text-transparent mb-6 leading-tight">
  Register
</h2>


<form onSubmit={handleSubmit} className="space-y-4">

{/* First Name & Last Name (Side by Side) */}
<div className="flex space-x-5">
    {/* First Name */}
    <div className="w-44">
        <label className="block text-sm text-gray-600 mb-1">First Name</label>
        <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full p-1 border rounded-md focus:ring-2 placeholder:text-sm text-black focus:outline-none ${errors.firstName ? "ring-red-500" : "ring-blue-300"}`}
            placeholder="Enter First Name"
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
    </div>

    {/* Last Name */}
    <div className="w-44">
        <label className="block text-sm text-gray-600 mb-1">Last Name</label>
        <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full p-1 border rounded-md focus:ring-2 placeholder:text-sm text-black focus:outline-none ${errors.lastName ? "ring-red-500" : "ring-blue-300"}`}
            placeholder="Enter Last Name"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
    </div>
</div>


{/* Username/Company Name */}
<div className="w-10/12">
    <label className="block text-sm text-gray-600 mb-1">Username/Company Name</label>
    <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`w-full p-1 border rounded-md focus:ring-2 placeholder:text-sm text-black focus:outline-none ${errors.username ? "ring-red-500" : "ring-blue-300"}`}
        placeholder="Enter Username or Company Name"
    />
    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
</div>

{/* Email/Phone */}
<div className="w-10/12">
    <label className="block text-sm text-gray-600 mb-1">Email/Phone Number</label>
    <input
        type="text"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
        className={`w-full p-1 border rounded-md focus:ring-2 placeholder:text-sm text-black focus:outline-none ${errors.emailOrPhone ? "ring-red-500" : "ring-blue-300"}`}
        placeholder="Enter Email or Phone Number"
    />
    {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>}
</div>

{/* Password */}
<div className="w-10/12">
    <label className="block text-sm text-gray-600 mb-1">Password</label>
    <div className="relative">
        <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-1 pr-10 border rounded-md focus:ring-2 placeholder:text-sm text-black focus:outline-none ${errors.password ? "ring-red-500" : "ring-blue-300"}`}
            placeholder="Enter Password"
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
<div className="w-10/12">
    <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
    <div className="relative">
        <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-1 pr-10 border rounded-md focus:ring-2 placeholder:text-sm text-black focus:outline-none ${errors.confirmPassword ? "ring-red-500" : "ring-blue-300"}`}
            placeholder="Confirm Password"
        />
        <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
        >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
    </div>
    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
</div>

{/* Pesan sukses atau error */}
{message && (
  <p
    className={`text-center mt-2 text-sm ${
      message.includes("successful") ? "text-green-500" : "text-red-500"
    }`}
  >
    {message}
  </p>
)}

{/* Register Button */}
<button
  type="submit"
  className="w-52 ml-21 bg-black text-white py-2 mt-4 rounded-full hover:bg-gray-700 flex justify-center items-center disabled:bg-gray-500"
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
    "Register"
  )}
</button>

{/* Already Have Account */}
<p className="-mt-1 mr-18 text-center text-sm text-gray-700">
    Already have an account?{" "}
    <Link href="/" className="text-black hover:underline">Login</Link>
</p>
</form>
        </div>
      </div>

      {/* Kanan - Profile & Title Section */}
<div className="w-1/2 relative flex items-center justify-center">
    <img 
        src="bekbek.jpg" 
        alt="Background Image" 
        className="w-full h-[100vh] object-cover"
    />
    
    {/* Overlay untuk bulat hitam + teks */}
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
