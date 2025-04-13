"use client";

import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard/home": "Home",
  "/dashboard/product": "Product",
  "/dashboard/inventory": "Inventory",
  "/dashboard/stock-entry": "Stock Update",
  "/dashboard/market-price": "Market Price",
  "/dashboard/hpp": "HPP",
  "/dashboard/report": "Report",
  "/dashboard/about-us": "About Us",
  "/dashboard/profile": "Edit Profile"
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const pageTitle = pageTitles[pathname] || "Dashboard";

  // Fungsi untuk logout
  const handleLogout = () => {
    // Menghapus token dari cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Menghapus token
    router.push("/"); // Redirect ke halaman login
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Tampilkan modal konfirmasi logout
  };

  const closeModal = () => {
    setShowLogoutModal(false); // Tutup modal
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="text-xl text-black font-bold">{pageTitle}</div>
          <div className="flex items-center mr-6 space-x-4">

            {/* Profile Dropdown */}
            <div className="relative">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={handleDropdownToggle}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2">
                  <button
                    onClick={() => router.push("/dashboard/profile")}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                  >
                    See Profile
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 bg-[#C7DFEA]">{children}</main>

        {/* Modal Logout Confirmation */}
        {showLogoutModal && (
          <div className="fixed top-0 left-0 right-0 flex justify-center items-start bg-transparent text-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold text-center">Are you sure you want to logout?</h2>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
