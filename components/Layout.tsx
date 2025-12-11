import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FlaskConical, 
  ScrollText, 
  ShieldCheck, 
  UserCircle, 
  Menu,
  Bell,
  Moon,
  Sun,
  X,
  Activity,
  Check
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  // Handle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Click outside to close notification
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Edukasi', path: '/education', icon: BookOpen },
    { name: 'Penelitian', path: '/research', icon: FlaskConical },
    { name: 'Kebijakan', path: '/policy', icon: ScrollText },
    { name: 'Mutu Layanan', path: '/quality', icon: ShieldCheck },
    { name: 'Profil', path: '/profile', icon: UserCircle },
  ];

  const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'Jadwal Posyandu Lansia', desc: 'Besok jam 08:00 di Balai Desa.', time: '1 jam lalu', read: false },
    { id: 2, title: 'Hasil Survei Tersedia', desc: 'Terima kasih telah berpartisipasi.', time: '5 jam lalu', read: true },
    { id: 3, title: 'Tips Kesehatan Baru', desc: 'Cara mencegah diabetes dini.', time: '1 hari lalu', read: true },
  ];

  const ModernLogo = () => (
    <div className={`flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen ? 'justify-center' : ''}`}>
        {/* Liquid Glass Icon Container */}
        <div className="relative group shrink-0">
            {/* Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            
            {/* The Glass Box */}
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-xl border border-white/40 dark:border-white/10 bg-white/20 dark:bg-black/40 backdrop-blur-md flex items-center justify-center">
                
                {/* Liquid Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 animate-liquid bg-[length:200%_200%] opacity-90"></div>
                
                {/* Internal Shimmer/Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-10"></div>
                
                {/* Passing Shine Effect */}
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shine z-20"></div>

                {/* The Icon */}
                <Activity className="w-6 h-6 text-white drop-shadow-md relative z-30 animate-float" />
                
                {/* Notification Dot */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full z-30 shadow-sm animate-pulse"></div>
            </div>
        </div>

        {isSidebarOpen && (
            <div className="flex flex-col animate-fade-in overflow-hidden">
                <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-200 leading-none drop-shadow-sm">
                    SIMAS
                </h1>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 dark:text-slate-400 uppercase mt-1">
                    Health System
                </span>
                <span className="text-[9px] text-gray-400 dark:text-slate-500 font-medium italic -mt-0.5 whitespace-nowrap opacity-80">
                    by Khoirul Anam
                </span>
            </div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex transition-colors duration-300">
      
      {/* Sidebar Desktop */}
      <aside 
        className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-30 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transition-all duration-300 ease-in-out shadow-sm
          ${isSidebarOpen ? 'w-72' : 'w-20'}
        `}
      >
        <div className="h-24 flex items-center px-5 border-b border-gray-100 dark:border-slate-800">
           <ModernLogo />
        </div>

        <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-sm' 
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
                  }
                  ${!isSidebarOpen ? 'justify-center' : ''}
                `}
              >
                <item.icon className={`w-6 h-6 shrink-0 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500 group-hover:text-emerald-500'}`} />
                
                {isSidebarOpen && (
                    <span className="truncate animate-fade-in">{item.name}</span>
                )}
                
                {!isSidebarOpen && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl border border-slate-700">
                        {item.name}
                    </div>
                )}
                
                {isActive && isSidebarOpen && (
                    <div className="absolute right-3 w-2 h-2 rounded-full bg-emerald-500 box-shadow-glow"></div>
                )}
              </NavLink>
             );
          })}
        </nav>

        {/* User Stats Card */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
            {isSidebarOpen ? (
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-600/80 dark:to-teal-800/80 rounded-2xl p-4 text-white shadow-lg shadow-emerald-900/20 animate-fade-in border border-emerald-500/20">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-xs font-medium text-emerald-100">Status Kesehatan</p>
                            <p className="text-lg font-bold">Sangat Baik</p>
                        </div>
                        <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                            <Activity className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-1.5 mb-1">
                        <div className="bg-white w-[85%] h-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                    <p className="text-[10px] text-emerald-100 text-right">85% Optimal</p>
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs ring-2 ring-emerald-500/20">
                        85%
                    </div>
                </div>
            )}
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-30 px-4 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
        <ModernLogo />
        <div className="flex gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
                <Menu className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-slate-900 shadow-2xl p-6 transition-transform transform translate-x-0 border-l border-gray-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-slate-300">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({isActive}) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive 
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out pt-24 md:pt-0 p-6 md:p-8
            ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}
        `}
      >
        {/* Desktop Header / Topbar */}
        <header className="hidden md:flex justify-between items-center mb-8 sticky top-6 z-20 pointer-events-none">
            {/* Left side actions (Menu) - Pointer events auto enabled on children */}
            <div className="flex items-center gap-4 pointer-events-auto">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50 shadow-sm text-gray-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all backdrop-blur-md"
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 px-6 py-2 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                         Selamat Pagi, Rans 👋
                    </h2>
                </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-2 pr-4 rounded-2xl border border-gray-200 dark:border-slate-700/50 shadow-sm pointer-events-auto">
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-yellow-400 transition-colors"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1"></div>
                
                {/* Notification Bell with Dropdown */}
                <div className="relative" ref={notifRef}>
                    <button 
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${isNotifOpen ? 'bg-gray-100 dark:bg-slate-700' : ''} text-gray-500 dark:text-slate-400`}
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
                    </button>

                    {isNotifOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden animate-fade-in-up">
                            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 dark:text-white">Notifikasi</h3>
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer">Tandai semua dibaca</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                {MOCK_NOTIFICATIONS.map(notif => (
                                    <div key={notif.id} className={`p-4 border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${!notif.read ? 'bg-emerald-50/50 dark:bg-emerald-500/10' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900 dark:text-slate-100' : 'text-gray-600 dark:text-slate-400'}`}>{notif.title}</h4>
                                            {!notif.read && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">{notif.desc}</p>
                                        <p className="text-[10px] text-gray-400 dark:text-slate-500">{notif.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 text-center border-t border-gray-100 dark:border-slate-700">
                                <button className="text-xs font-medium text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white py-2 w-full">Lihat Semua</button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Rans Alfred</p>
                        <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1">Masyarakat Umum</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                        RA
                    </div>
                </div>
            </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;