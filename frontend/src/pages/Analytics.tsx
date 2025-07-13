import React, { useState, useEffect } from 'react';
import { Download, TrendingUp, Users, Eye, MousePointer, Clock, BarChart3, PieChart, Activity } from 'lucide-react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { analytics } from '../utils/analytics';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  metrics: {
    total_contacts: number;
    read_contacts: number;
    unread_contacts: number;
    response_rate: number;
    avg_daily_contacts: number;
    unique_sessions: number;
    total_page_views: number;
  };
  trends: {
    daily_contacts: Array<{ date: string; count: number }>;
  };
  sources: Array<{ source: string; count: number }>;
  popular_pages: Array<{ page: string; views: number }>;
}

interface PerformanceData {
  page_load_times: Record<string, number>;
  device_distribution: Record<string, number>;
  browser_distribution: Record<string, number>;
  geographic_data: Array<{ country: string; visitors: number }>;
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleExport = () => {
    analytics.downloadAnalyticsData(timeRange);
  };

  useEffect(() => {
    // Get real-time analytics data
    setLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const realTimeData = analytics.getAnalyticsData(timeRange);
      const performance = analytics.getPerformanceData();
      
      setAnalyticsData(realTimeData);
      setPerformanceData(performance);
      setLoading(false);
    }, 300);
  }, [timeRange]);

  const stats = analyticsData ? [
    {
      title: 'Total Contacts',
      value: analyticsData.metrics.total_contacts.toString(),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: MousePointer
    },
    {
      title: 'Response Rate',
      value: `${analyticsData.metrics.response_rate}%`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Unique Sessions',
      value: analyticsData.metrics.unique_sessions.toString(),
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Page Views',
      value: analyticsData.metrics.total_page_views.toString(),
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Eye
    }
  ] : [];

  const chartData = analyticsData ? {
    labels: analyticsData.trends.daily_contacts.map(item => 
      new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Daily Page Views',
        data: analyticsData.trends.daily_contacts.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  } : null;

  const sourceData = analyticsData ? {
    labels: analyticsData.sources.map(item => item.source),
    datasets: [
      {
        data: analyticsData.sources.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ]
  } : null;

  const deviceData = performanceData ? {
    labels: Object.keys(performanceData.device_distribution),
    datasets: [
      {
        data: Object.values(performanceData.device_distribution),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">Analytics</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real-time insights from your portfolio
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button 
              onClick={handleExport}
              className="btn-secondary"
            >
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
                className="card p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                    <p className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Page Views Trends Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Page Views Trends</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Daily Views</span>
              </div>
            </div>
            <div className="h-64">
              {chartData && <Line data={chartData} options={chartOptions} />}
            </div>
          </div>

          {/* Contact Sources Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Contact Sources</h2>
              <MousePointer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="h-64">
              {sourceData && <Doughnut data={sourceData} options={chartOptions} />}
            </div>
          </div>
        </div>

        {/* Popular Pages */}
        {analyticsData && analyticsData.popular_pages.length > 0 && (
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Popular Pages</h2>
              <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="space-y-4">
              {analyticsData.popular_pages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {page.page.replace('/', '').replace('-', ' ') || 'Home'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(page.views / Math.max(...analyticsData.popular_pages.map(p => p.views))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {page.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {performanceData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Device Distribution */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Device Distribution</h2>
                <MousePointer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="h-64">
                {deviceData && <Doughnut data={deviceData} options={chartOptions} />}
              </div>
            </div>

            {/* Page Load Times */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Page Load Times</h2>
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="space-y-4">
                {Object.entries(performanceData.page_load_times).map(([page, time]) => (
                  <div key={page} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {page}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(time / 3) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {time}s
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Geographic Data */}
        {performanceData && (
          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Geographic Distribution</h2>
              <MousePointer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceData.geographic_data.map((item, index) => (
                <div key={item.country} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {item.visitors}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.country}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics; 