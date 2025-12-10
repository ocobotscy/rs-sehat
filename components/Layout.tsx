import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FlaskConical, 
  ScrollText, 
  ShieldCheck, 
  UserCircle, 
  Menu,
  Bell
} from 'lucide-react';
import { Badge } from './UI';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Edukasi', path: '/education', icon: BookOpen },
    { name: 'Penelitian', path: '/research', icon: FlaskConical },
    { name: 'Kebijakan', path: '/policy', icon: ScrollText },
    { name: 'Mutu Layanan', path: '/quality', icon: ShieldCheck },
    { name: 'Profil', path: '/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
           <div className="bg-primary-600 p-1.5 rounded-lg">
             <LayoutDashboard className="w-6 h-6 text-white" />
           </div>
           <h1 className="text-xl font-bold text-gray-800 tracking-tight">SIMAS</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                {item.name}
              </NavLink>
             );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-4 text-white">
                <p className="text-xs font-medium opacity-80 mb-1">Status Kesehatan Anda</p>
                <p className="text-lg font-bold">Sangat Baik</p>
                <div className="mt-2 w-full bg-white/20 rounded-full h-1.5">
                    <div className="bg-white w-[85%] h-1.5 rounded-full"></div>
                </div>
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1 rounded">
                <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-800">SIMAS</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
            <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-800/50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white w-3/4 h-full p-4" onClick={e => e.stopPropagation()}>
                <nav className="space-y-2 mt-12">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                                isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600'
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
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 p-6 overflow-x-hidden">
        {/* Topbar for Desktop */}
        <header className="hidden md:flex justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Selamat Datang, Rans</h2>
                <p className="text-gray-500 text-sm">Mari jaga kesehatan bersama komunitas.</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Rans Alfred</p>
                        <p className="text-xs text-gray-500">Masyarakat Umum</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">RA</div>
                </div>
            </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;