"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, Settings, LogOut, Building } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Reservations", href: "/admin/reservations", icon: Calendar },
  { name: "Rooms", href: "/admin/rooms", icon: Building },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-[#0b1120] border-r border-slate-800 flex flex-col z-50">
      <div className="p-5 flex items-center gap-3 border-b border-slate-800">
        <div className="rounded-lg overflow-hidden bg-white/10 p-1">
          <Image src="/logo-mark.png" alt="Pahuna Ghar" width={96} height={52} className="w-10 h-auto object-contain" />
        </div>
        <div className="text-xs text-slate-400 font-medium">Admin Portal</div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-forest/20 rounded-xl border border-forest/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "text-forest" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}>
                <Icon size={18} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors text-sm font-medium">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
