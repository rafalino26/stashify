"use client";

import Sidebar from "./Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    
                </header>
                <main className="flex-1 p-6 bg-[#C7DFEA]">{children}</main>
             
            </div>
        </div>
    );
}
