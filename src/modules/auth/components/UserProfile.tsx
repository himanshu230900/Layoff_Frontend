import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../store/authSlice';

interface UserProfileProps {
  compact?: boolean;
  showLogout?: boolean;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  compact = false,
  showLogout = true,
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-sm font-medium">
              {getInitials(user.name)}
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-xl font-medium">
              {getInitials(user.name)}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          {user.role && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
              {user.role}
            </span>
          )}
        </div>

        {showLogout && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}; 