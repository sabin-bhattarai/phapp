import { ReactNode } from "react";
import Sidebar from "../../components/admin/Sidebar";

export const metadata = {
  title: "Admin Dashboard - Pahuna Ghar",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 bg-gradient-to-br from-[#0f172a] to-[#1e293b] overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
