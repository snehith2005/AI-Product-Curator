import { useState, useEffect } from 'react';
import type {
  BusinessMetric,
  BusinessDashboardResponse,
  CategoryBreakdown,
  TopSearchTerm,
  CompetitorData,
  UserActivityItem,
  PriceInsight,
  DailySearchVolume,
} from '../types';
import { businessApi } from '../api/business.api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Minus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Loader2,
  AlertCircle,
  Users,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

const CHART_COLORS = [
  '#8b5cf6', '#06b6d4', '#ec4899', '#10b981',
  '#f59e0b', '#ef4444', '#6366f1', '#14b8a6',
];

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<BusinessDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    businessApi
      .getDashboardData()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load dashboard data');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="h-10 w-10 text-rose-500" />
          <p className="text-lg font-semibold">Failed to load dashboard</p>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-2xl">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Badge className="mb-4 px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 border-0">
                <BarChart3 className="h-3 w-3 mr-1" />
                Analytics
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome, <span className="gradient-text">{user?.first_name || 'Admin'}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-time business insights from user activity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-2xl gap-2 h-11">
                <Calendar className="h-4 w-4" />
                Last 30 days
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 space-y-8">
        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* Charts Row 1: Area Chart + Pie Chart */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SearchVolumeAreaChart data={data.dailySearchVolume} />
          <CategoryPieChart categories={data.categoryBreakdown} />
        </div>

        {/* Charts Row 2: Top Search Terms + Platform Access Distribution */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TopSearchTermsBarChart terms={data.topSearchTerms} />
          <PlatformAccessPieChart platforms={data.platformPerformance} />
        </div>

        {/* Bottom Grid: User Activity Table + Price Insights Chart */}
        <div className="grid lg:grid-cols-2 gap-6">
          <UserActivityTable users={data.userActivity} />
          <PriceInsightsChart insights={data.priceInsights} />
        </div>
      </div>
    </div>
  );
}

/* ========== Sub-components ========== */

function MetricCard({ metric, index }: { metric: BusinessMetric; index: number }) {
  const isUp = metric.trend === 'up';
  const isDown = metric.trend === 'down';

  const gradients = [
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-fuchsia-500 to-pink-600',
    'from-emerald-500 to-green-600',
  ];

  return (
    <div className="relative group rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl hover-lift overflow-hidden">
      <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', gradients[index % gradients.length])} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{metric.label}</span>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
            isUp && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
            isDown && 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
            !isUp && !isDown && 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
          )}
        >
          {isUp && <ArrowUpRight className="h-3 w-3" />}
          {isDown && <ArrowDownRight className="h-3 w-3" />}
          {!isUp && !isDown && <Minus className="h-3 w-3" />}
          {metric.change > 0 ? '+' : ''}
          {metric.change}%
        </div>
      </div>
      <div className="text-3xl font-bold">{metric.value}</div>
    </div>
  );
}

/* ---------- Area Chart: Daily Search Volume ---------- */
function SearchVolumeAreaChart({ data }: { data: DailySearchVolume[] }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl">
      <h3 className="text-lg font-semibold mb-1">Search Volume</h3>
      <p className="text-sm text-muted-foreground mb-4">Daily searches over the last 30 days</p>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">No search data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="searchGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="searches"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fill="url(#searchGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/* ---------- Pie Chart: Category Breakdown ---------- */
function CategoryPieChart({ categories }: { categories: CategoryBreakdown[] }) {
  const pieData = categories.slice(0, 8).map((c) => ({
    name: c.category,
    value: c.count,
  }));

  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl">
      <h3 className="text-lg font-semibold mb-1">Category Breakdown</h3>
      <p className="text-sm text-muted-foreground mb-4">Search distribution by category</p>
      {pieData.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">No category data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: 13,
              }}
              formatter={(value) => [`${value} searches`, 'Count']}
            />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/* ---------- Horizontal Bar Chart: Top Search Terms ---------- */
function TopSearchTermsBarChart({ terms }: { terms: TopSearchTerm[] }) {
  if (terms.length === 0) return null;

  const chartData = [...terms].reverse().map((t) => ({
    term: t.term.length > 25 ? t.term.slice(0, 22) + '...' : t.term,
    count: t.count,
  }));

  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl">
      <h3 className="text-lg font-semibold mb-1">Top Search Terms</h3>
      <p className="text-sm text-muted-foreground mb-4">Most frequently searched queries</p>
      <ResponsiveContainer width="100%" height={Math.max(terms.length * 40, 200)}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="term"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={false}
            width={160}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: 13,
            }}
            formatter={(value) => [`${value} searches`, 'Count']}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------- Donut Chart: Platform Access Distribution ---------- */
function PlatformAccessPieChart({ platforms }: { platforms: CompetitorData[] }) {
  const pieData = platforms.map((p) => ({
    name: p.platform,
    value: p.products,
    share: p.marketShare,
  }));

  const PLATFORM_COLORS = [
    '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899',
    '#10b981', '#ef4444', '#6366f1', '#14b8a6',
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <Globe className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-semibold">Platforms Accessed</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Search result distribution by platform</p>
      {pieData.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">No platform data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              label={({ name, percent }) =>
  `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
}
              labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PLATFORM_COLORS[i % PLATFORM_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: 13,
              }}
              formatter={(value, _name, entry) => [
                `${value} products (${entry.payload.share}%)`,
                'Platform',
              ]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

/* ---------- User Activity Table ---------- */
function UserActivityTable({ users }: { users: UserActivityItem[] }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <Users className="h-5 w-5 text-cyan-500" />
        <h3 className="text-lg font-semibold">User Activity</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Top users by search count</p>

      {users.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No user activity yet</p>
      ) : (
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {users.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="min-w-0">
                <p className="font-medium truncate">{u.email}</p>
                <p className="text-xs text-muted-foreground">
                  Last active: {new Date(u.lastActive).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline" className="rounded-full shrink-0 ml-3">
                {u.searchCount} searches
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Grouped Bar Chart: Price Insights ---------- */
function PriceInsightsChart({ insights }: { insights: PriceInsight[] }) {
  const chartData = insights.slice(0, 6).map((ins) => ({
    category: ins.category.length > 15 ? ins.category.slice(0, 12) + '...' : ins.category,
    min: ins.minPrice,
    avg: ins.avgPrice,
    max: ins.maxPrice,
  }));

  return (
    <div className="rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <DollarSign className="h-5 w-5 text-emerald-500" />
        <h3 className="text-lg font-semibold">Price Insights</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Min / Avg / Max price by category</p>

      {chartData.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">No price data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: 13,
              }}
              formatter={(value) => [`$${Number(value).toFixed(0)}`, '']}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Bar dataKey="min" name="Min Price" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="avg" name="Avg Price" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="max" name="Max Price" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
