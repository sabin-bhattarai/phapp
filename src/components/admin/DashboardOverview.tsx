"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "NPR 450K", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Reservations", value: "124", change: "+8.2%", trend: "up", icon: Calendar },
  { title: "Occupancy Rate", value: "85%", change: "-2.4%", trend: "down", icon: TrendingUp },
  { title: "Total Guests", value: "312", change: "+14.1%", trend: "up", icon: Users },
];

const recentBookings = [
  { id: "RES-001", guest: "Aarav Sharma", room: "Deluxe Mountain View", dates: "Oct 12 - Oct 15", status: "Confirmed", amount: "NPR 15,000" },
  { id: "RES-002", guest: "Sita Thapa", room: "Traditional Heritage", dates: "Oct 14 - Oct 16", status: "Pending", amount: "NPR 8,500" },
  { id: "RES-003", guest: "John Doe", room: "Family Suite", dates: "Oct 18 - Oct 22", status: "Confirmed", amount: "NPR 32,000" },
  { id: "RES-004", guest: "Maya Gurung", room: "Cozy Corner", dates: "Oct 20 - Oct 21", status: "Cancelled", amount: "NPR 4,000" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="px-4 py-2 bg-forest hover:bg-leaf text-white rounded-lg font-medium transition-colors shadow-luxury text-sm">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-leaf">
                  <Icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="text-slate-400 text-sm font-medium">{stat.title}</div>
              <div className="text-3xl font-bold text-white mt-1">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts & Tables Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Analytics</h2>
            <select className="bg-slate-700/50 border border-slate-600 text-sm rounded-lg px-3 py-1.5 text-slate-300 outline-none focus:border-forest">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] flex items-center justify-center border border-dashed border-slate-700 rounded-xl relative overflow-hidden group">
            {/* Mock Chart Animation */}
            <div className="absolute bottom-0 left-10 w-12 bg-forest/20 rounded-t-sm animate-[grow_2s_ease-out_forwards]" style={{ height: '40%' }} />
            <div className="absolute bottom-0 left-32 w-12 bg-forest/40 rounded-t-sm animate-[grow_2s_ease-out_forwards]" style={{ height: '60%' }} />
            <div className="absolute bottom-0 left-56 w-12 bg-forest/60 rounded-t-sm animate-[grow_2s_ease-out_forwards]" style={{ height: '45%' }} />
            <div className="absolute bottom-0 left-80 w-12 bg-forest/80 rounded-t-sm animate-[grow_2s_ease-out_forwards]" style={{ height: '80%' }} />
            <div className="absolute bottom-0 left-[26rem] w-12 bg-leaf/90 rounded-t-sm animate-[grow_2s_ease-out_forwards]" style={{ height: '95%' }} />
            
            <span className="text-slate-500 font-medium z-10 opacity-0 group-hover:opacity-100 transition-opacity">Chart Visualization Area</span>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.slice(0, 4).map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-700/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
                  {booking.guest.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{booking.guest}</div>
                  <div className="text-xs text-slate-400 truncate">{booking.room}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${{ Confirmed: 'text-emerald-400 bg-emerald-400/10', Pending: 'text-amber-400 bg-amber-400/10', Cancelled: 'text-red-400 bg-red-400/10' }[booking.status] ?? 'text-slate-400 bg-slate-400/10'}`}>
                    {booking.status}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{booking.amount}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
            View All Reservations
          </button>
        </motion.div>
      </div>
    </div>
  );
}
