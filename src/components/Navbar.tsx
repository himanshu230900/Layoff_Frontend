import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#dashboard' },
    { id: 'profile', label: 'Profile', icon: '👤', href: '#profile' },
    { id: 'jobs', label: 'Job Search', icon: '💼', href: '#jobs', badge: 5 },
    { id: 'applications', label: 'Applications', icon: '📄', href: '#applications', badge: 12 },
    { id: 'interviews', label: 'Interviews', icon: '🎯', href: '#interviews', badge: 3 },
    { id: 'networking', label: 'Networking', icon: '🤝', href: '#networking' },
    { id: 'resources', label: 'Resources', icon: '📚', href: '#resources' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '#settings' },
  ];

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex w-64 bg-gray-100 border-r border-gray-200 h-full">
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm">Please sign in to access navigation</p>
        </div>
      </div>
    );
  }

  return (
    <nav className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 h-full">
      <div className="flex flex-col w-full">
        {/* Navigation Title */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.id);
              }}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p>© 2024 LayoffApp</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </nav>
  );
} 