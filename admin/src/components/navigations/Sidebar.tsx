// src/component/Sidebar.tsx

import {
  Calendar,
  ClipboardList,
  HelpCircle,
  Home,
  LogOut,
  Package,
  Settings,
  Sparkles,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HelpModal from './HelpModal';
import WelcomeTour from './WelcomeTour';

interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [showHelp, setShowHelp] = useState(false);

  // Navigation items constant
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: Home
    },
    {
      id: 'services',
      name: 'Services',
      path: '/services',
      icon: Sparkles
    },
    {
      id: 'products',
      name: 'Products',
      path: '/products',
      icon: Package
    },
    {
      id: 'bookings',
      name: 'Bookings',
      path: '/bookings',
      icon: Calendar
    },
    {
      id: 'orders',
      name: 'Orders',
      path: '/orders',
      icon: ClipboardList
    }
  ];

  const handleNavigation = (path: string) => navigate(path);
  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 text-gray-800 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'} shadow-sm`}>

      {/* Modals */}
      <WelcomeTour />
      <HelpModal showHelp={showHelp} setShowHelp={setShowHelp} />

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">

        {!isCollapsed && (
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Drita's Aesthetics
              </h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </Link>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-auto"
        >
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isCollapsed ? 'w-5' : 'w-4'}`}></div>
            <div className="h-0.5 w-5 bg-gray-600"></div>
            <div className={`h-0.5 bg-gray-600 transition-all duration-300 ${isCollapsed ? 'w-5' : 'w-4'}`}></div>
          </div>
        </button>

      </div>

      {/* Rest of the component remains the same... */}
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActivePath(item.path);

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`group w-full py-3 px-4 rounded-lg font-medium flex items-center gap-3 transition-all duration-200 ${isActive
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center px-3' : ''}`}
            >
              <IconComponent
                className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} ${isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'
                  } transition-colors duration-200`}
              />
              {!isCollapsed && (
                <span className="transition-colors duration-200">
                  {item.name}
                </span>
              )}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto p-4 border-t border-gray-100 space-y-3">
        {/* Settings */}
        <button
          onClick={() => handleNavigation('/settings')}
          className={`group w-full py-3 px-4 rounded-lg font-medium flex items-center gap-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ${isCollapsed ? 'justify-center px-3' : ''
            }`}
        >
          <Settings className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-500 group-hover:text-gray-700 transition-colors duration-200`} />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {/* Help */}
        <button
          onClick={() => setShowHelp(true)}
          className={`group w-full py-3 px-4 rounded-lg font-medium flex items-center gap-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ${isCollapsed ? 'justify-center px-3' : ''
            }`}
        >
          <HelpCircle className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} text-gray-500 group-hover:text-gray-700 transition-colors duration-200`} />
          {!isCollapsed && <span>Help & Support</span>}
        </button>

        {/* User Info */}
        <div className={`rounded-lg p-4 bg-gray-50 border border-gray-200 ${isCollapsed ? 'p-3' : ''}`}>
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.username || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@example.com'}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="group w-full py-2 px-3 text-sm flex justify-center items-center gap-2 text-red-600 hover:text-red-700 bg-white border border-red-200 hover:border-red-300 rounded-md transition-all duration-200 font-medium hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <button
                onClick={logout}
                className="p-2 text-red-600 hover:text-red-700 bg-white border border-red-200 hover:border-red-300 rounded-md transition-all duration-200 hover:bg-red-50"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
