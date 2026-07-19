import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  accent?: 'blue' | 'green' | 'red' | 'purple';
}

const accentMap: Record<string, string> = {
  blue: 'bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-100',
  green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-700/20 dark:text-emerald-300',
  red: 'bg-rose-50 text-rose-600 dark:bg-rose-700/20 dark:text-rose-300',
  purple: 'bg-violet-50 text-violet-600 dark:bg-violet-700/20 dark:text-violet-300',
};

const DashboardCard = ({ title, value, icon, accent = 'blue' }: DashboardCardProps) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${accentMap[accent]}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{value}</p>
    </div>
  </div>
);

export default DashboardCard;
