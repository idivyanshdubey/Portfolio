import React, { useState } from 'react';
import { TrendingUp, Users, Eye, Download, Calendar, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Total Visitors',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Page Views',
      value: '45,231',
      change: '+8.2%',
      changeType: 'positive',
      icon: Eye
    },
    {
      title: 'Avg. Session',
      value: '2m 34s',
      change: '+5.1%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-2.3%',
      changeType: 'negative',
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-xl text-gray-600">
              Track performance and insights from your portfolio
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Traffic Overview</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Visitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Page Views</span>
              </div>
            </div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-64 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 