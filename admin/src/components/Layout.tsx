// src/components/Layout.tsx

import React, { useState } from "react";
import Sidebar from "./navigations/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-screen bg-white shadow-md z-10 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-72'
            }`}>
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
                isCollapsed ? 'ml-20' : 'ml-72'
            }`}>
                <main className="p-6 bg-white shadow-md m-4 rounded-md flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
