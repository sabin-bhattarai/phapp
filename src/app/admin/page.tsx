"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  BedDouble,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  TrendingUp,
  TrendingDown,
  Eye,
  Check,
  X,
  Clock,
  ChevronRight,
  Star,
  DollarSign,
  Percent,
  Tag,
  Menu,
} from "lucide-react";

// ---- Types ----
type BookingStatus = "pending" | "confirmed" | "cancelled" | "checkedIn";
type NavTab =
  | "dashboard"
  | "bookings"
  | "rooms"
  | "guests"
  | "analytics"
  | "settings";

interface Booking {
  id: string;
  guest: string;
  email: string;
  room: string;
  checkin: string;
  checkout: string;
  guests: number;
  amount: number;
  status: BookingStatus;
  payment: string;
  createdAt: string;
}

// ---- Mock data ----
const mockBookings: Booking[] = [
  { id: "BK001", guest: "Ramesh Sharma", email: "ramesh@gmail.com", room: "Mountain View Suite", checkin: "2026-06-01", checkout: "2026-06-03", guests: 2, amount: 17000, status: "pending", payment: "eSewa", createdAt: "2026-05-25" },
  { id: "BK002", guest: "Sunita Thapa", email: "sunita@email.com", room: "Deluxe Room", checkin: "2026-06-05", checkout: "2026-06-07", guests: 1, amount: 9000, status: "confirmed", payment: "Khalti", createdAt: "2026-05-24" },
  { id: "BK003", guest: "James Miller", email: "james@gmail.com", room: "Traditional Nepali", checkin: "2026-06-10", checkout: "2026-06-14", guests: 2, amount: 22000, status: "confirmed", payment: "Stripe", createdAt: "2026-05-23" },
  { id: "BK004", guest: "Priya Patel", email: "priya@email.com", room: "Family Room", checkin: "2026-06-15", checkout: "2026-06-18", guests: 4, amount: 22500, status: "pending", payment: "Cash", createdAt: "2026-05-22" },
  { id: "BK005", guest: "Bikash Rai", email: "bikash@gmail.com", room: "Deluxe Room", checkin: "2026-05-28", checkout: "2026-05-30", guests: 2, amount: 9000, status: "checkedIn", payment: "eSewa", createdAt: "2026-05-20" },
];

const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "rooms", label: "Rooms", icon: BedDouble },
  { id: "guests", label: "Guests", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  confirmed: "bg-green-100 text-green-700 border border-green-200",
  cancelled: "bg-red-100 text-red-700 border border-red-200",
  checkedIn: "bg-blue-100 text-blue-700 border border-blue-200",
};

// ---- Sub-components ----
function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1a2e1a] rounded-2xl p-5 border border-white/5 hover:border-leaf/20 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          }`}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-white/40 text-sm">{title}</div>
    </motion.div>
  );
}

function DashboardView() {
  const stats = [
    { title: "Total Revenue (May)", value: "NPR 1,24,500", change: "+18%", positive: true, icon: DollarSign, color: "#8DC63F" },
    { title: "Active Bookings", value: "12", change: "+3", positive: true, icon: CalendarDays, color: "#4ECCA3" },
    { title: "Occupancy Rate", value: "76%", change: "+5%", positive: true, icon: Percent, color: "#FF6B35" },
    { title: "Avg. Rating", value: "4.9 ★", change: "+0.1", positive: true, icon: Star, color: "#FFD700" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} transition={{ delay: i * 0.1 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-[#1a2e1a] rounded-2xl border border-white/5">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h3 className="font-semibold text-white">Recent Bookings</h3>
          <span className="text-xs text-leaf font-medium cursor-pointer hover:text-leaf/80">
            View all
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Booking ID", "Guest", "Room", "Check-in", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-white/40 font-medium text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockBookings.slice(0, 4).map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-white/60 font-mono text-xs">{b.id}</td>
                  <td className="px-5 py-3 text-white">{b.guest}</td>
                  <td className="px-5 py-3 text-white/60 text-xs">{b.room}</td>
                  <td className="px-5 py-3 text-white/60 text-xs">{b.checkin}</td>
                  <td className="px-5 py-3 text-leaf font-semibold">
                    NPR {b.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini calendar / occupancy */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#1a2e1a] rounded-2xl p-5 border border-white/5">
          <h3 className="font-semibold text-white mb-4">Room Occupancy</h3>
          {[
            { room: "Mountain View Suite", pct: 85, color: "#8DC63F" },
            { room: "Deluxe Room", pct: 70, color: "#4ECCA3" },
            { room: "Family Room", pct: 60, color: "#FF6B35" },
            { room: "Traditional Room", pct: 90, color: "#FFD700" },
          ].map(({ room, pct, color }) => (
            <div key={room} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">{room}</span>
                <span style={{ color }} className="font-semibold">{pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1a2e1a] rounded-2xl p-5 border border-white/5">
          <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Add New Booking", icon: CalendarDays },
              { label: "Update Room Pricing", icon: Tag },
              { label: "View Analytics", icon: BarChart3 },
              { label: "Send Notifications", icon: Bell },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm group"
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} className="text-leaf" />
                  {label}
                </div>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingsView() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <div className="space-y-5">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "checkedIn", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all capitalize ${
              filter === f
                ? "bg-forest text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f} {f === "all" && `(${bookings.length})`}
            {f !== "all" && `(${bookings.filter((b) => b.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="space-y-3">
        {filtered.map((b) => (
          <motion.div
            key={b.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a2e1a] rounded-2xl p-5 border border-white/5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs text-white/30">{b.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <h4 className="font-semibold text-white">{b.guest}</h4>
                <p className="text-white/40 text-xs">{b.email}</p>
              </div>

              <div className="text-right">
                <div className="text-leaf font-bold">NPR {b.amount.toLocaleString()}</div>
                <div className="text-white/40 text-xs">{b.payment}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/50">
              <span className="flex items-center gap-1">
                <BedDouble size={12} /> {b.room}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={12} /> {b.checkin} → {b.checkout}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} /> {b.guests} guests
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> Booked {b.createdAt}
              </span>
            </div>

            {b.status === "pending" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(b.id, "confirmed")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-xs font-semibold hover:bg-green-600/30 transition-colors border border-green-600/20"
                >
                  <Check size={13} /> Approve
                </button>
                <button
                  onClick={() => updateStatus(b.id, "cancelled")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-600/30 transition-colors border border-red-600/20"
                >
                  <X size={13} /> Decline
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenues = [45000, 62000, 78000, 95000, 124500, 88000];
  const maxRev = Math.max(...revenues);

  return (
    <div className="space-y-6">
      <div className="bg-[#1a2e1a] rounded-2xl p-6 border border-white/5">
        <h3 className="font-semibold text-white mb-6">Monthly Revenue (NPR)</h3>
        <div className="flex items-end gap-3 h-48">
          {revenues.map((rev, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-white/40 text-xs">
                {(rev / 1000).toFixed(0)}k
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(rev / maxRev) * 160}px` }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
                className="w-full rounded-t-lg"
                style={{
                  background: i === months.length - 2
                    ? "linear-gradient(to top, #006D3A, #8DC63F)"
                    : "rgba(141,198,63,0.3)",
                }}
              />
              <span className="text-white/40 text-xs">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#1a2e1a] rounded-2xl p-5 border border-white/5">
          <h4 className="font-semibold text-white mb-4">Bookings by Payment</h4>
          {[
            { method: "eSewa", count: 18, pct: 45, color: "#60BB46" },
            { method: "Khalti", count: 12, pct: 30, color: "#5C2D91" },
            { method: "Stripe", count: 6, pct: 15, color: "#635BFF" },
            { method: "Cash", count: 4, pct: 10, color: "#8DC63F" },
          ].map(({ method, count, pct, color }) => (
            <div key={method} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">{method} ({count})</span>
                <span style={{ color }} className="font-semibold">{pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ background: color }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1a2e1a] rounded-2xl p-5 border border-white/5">
          <h4 className="font-semibold text-white mb-4">Top Booked Rooms</h4>
          {[
            { name: "Mountain View Suite", bookings: 28, color: "#8DC63F" },
            { name: "Deluxe Room", bookings: 22, color: "#4ECCA3" },
            { name: "Traditional Room", bookings: 18, color: "#FFD700" },
            { name: "Family Room", bookings: 12, color: "#FF6B35" },
          ].map(({ name, bookings: cnt, color }) => (
            <div key={name} className="flex items-center justify-between mb-3 text-sm">
              <span className="text-white/70 text-xs">{name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cnt / 28) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: color }}
                  />
                </div>
                <span style={{ color }} className="font-semibold text-xs w-4">{cnt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Main Admin Page ----
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tabTitles: Record<NavTab, string> = {
    dashboard: "Dashboard Overview",
    bookings: "Booking Management",
    rooms: "Room Management",
    guests: "Guest Directory",
    analytics: "Revenue Analytics",
    settings: "System Settings",
  };

  return (
    <div className="min-h-screen bg-[#0f1f0f] text-white flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-60 flex-shrink-0 bg-[#0a170a] border-r border-white/5 flex flex-col h-screen sticky top-0"
          >
            {/* Logo */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-forest rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                    <path d="M20 4L6 14v18h28V14L20 4z" fill="#8DC63F" opacity="0.9" />
                    <path d="M15 32V22h10v10" fill="#006D3A" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">Pahuna Ghar</div>
                  <div className="text-white/30 text-[10px] tracking-widest uppercase">Admin Portal</div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? "bg-forest/30 text-leaf border border-forest/20"
                      : "text-white/40 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                  {id === "bookings" && (
                    <span className="ml-auto text-xs bg-yellow-500 text-black px-1.5 rounded-full font-bold">
                      {mockBookings.filter((b) => b.status === "pending").length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Bottom */}
            <div className="p-3 border-t border-white/5">
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-white/40 hover:bg-red-900/20 hover:text-red-400 transition-all">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-[#0a170a] border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
            >
              <Menu size={18} />
            </button>
            <h1 className="font-bold text-white">{tabTitles[activeTab]}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-leaf rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-white text-xs font-medium">Admin</div>
                <div className="text-white/30 text-[10px]">Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "dashboard" && <DashboardView />}
              {activeTab === "bookings" && <BookingsView />}
              {activeTab === "analytics" && <AnalyticsView />}
              {(activeTab === "rooms" || activeTab === "guests" || activeTab === "settings") && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Eye size={40} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/30">
                      {tabTitles[activeTab]} — Coming soon
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
