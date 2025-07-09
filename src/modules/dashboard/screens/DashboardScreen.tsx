import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Badge } from '@/components';
import { useAppSelector } from '@/store/hooks';

const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    { label: t('dashboard.totalApplications'), value: 12, color: 'info' as const },
    { label: t('dashboard.activeApplications'), value: 8, color: 'warning' as const },
    { label: t('dashboard.interviews'), value: 3, color: 'success' as const },
    { label: t('dashboard.offers'), value: 1, color: 'success' as const },
  ];

  const recentActivity = [
    { action: 'Applied to Senior Developer at TechCorp', time: '2 hours ago' },
    { action: 'Interview scheduled with StartupXYZ', time: '1 day ago' },
    { action: 'Application updated for Designer role', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name || 'User'}! Here's your job search overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {stat.label}
            </div>
            <Badge variant={stat.color} size="sm">
              {stat.color === 'success' ? 'Good' : stat.color === 'warning' ? 'Active' : 'Total'}
            </Badge>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('dashboard.recentActivity')}
        </h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
              <div className="text-gray-900">{activity.action}</div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">View Applications</h3>
          <p className="text-gray-600 text-sm">Manage your job applications</p>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Jobs</h3>
          <p className="text-gray-600 text-sm">Find new opportunities</p>
        </Card>
        
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm">Track your progress</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardScreen; 