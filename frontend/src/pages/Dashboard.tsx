// import { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// import { useAuth } from '../hooks/useAuth';
// import { fetchDashboardStats } from '../services/employeeService';
// import type { DashboardStats } from '../types';
// import DashboardCard from '../components/DashboardCard';
// import Loader from '../components/Loader';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await fetchDashboardStats();
//         setStats(data);
//       } catch {
//         setError('Unable to load dashboard statistics.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user?.role !== 'employee') {
//       load();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   if (user?.role === 'employee') {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Welcome, {user.name}!</h2>
//         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//           Visit "My Profile" to view your details, or "Organization" to see the company structure.
//         </p>
//       </div>
//     );
//   }

//   if (loading) return <Loader />;
//   if (error) return <p className="text-sm text-rose-600">{error}</p>;
//   if (!stats) return null;

//   return (
//     <div>
//       <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h1>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <DashboardCard title="Total Employees" value={stats.totalEmployees} icon="👥" accent="blue" />
//         <DashboardCard title="Active Employees" value={stats.activeEmployees} icon="✅" accent="green" />
//         <DashboardCard title="Inactive Employees" value={stats.inactiveEmployees} icon="⏸️" accent="red" />
//         <DashboardCard title="Departments" value={stats.departmentCount} icon="🏢" accent="purple" />
//       </div>

//       <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
//         <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Employees by Department</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={stats.byDepartment}>
//             <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
//             <XAxis dataKey="department" tick={{ fontSize: 12 }} />
//             <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
//             <Tooltip />
//             <Bar dataKey="count" fill="#3b6fed" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { fetchDashboardStats } from '../services/employeeService';
import type { DashboardStats } from '../types';
import DashboardCard from '../components/DashboardCard';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch {
        setError('Unable to load dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    if (user?.role !== 'employee') {
      load();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (user?.role === 'employee') {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Welcome, {user.name}!</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Visit "My Profile" to view your details, or "Organization" to see the company structure.
        </p>
      </div>
    );
  }

  if (loading) return <Loader />;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!stats) return null;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100 sm:text-2xl">
        Dashboard
      </h1>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Employees" value={stats.totalEmployees} icon="👥" accent="blue" />
        <DashboardCard title="Active Employees" value={stats.activeEmployees} icon="✅" accent="green" />
        <DashboardCard title="Inactive Employees" value={stats.inactiveEmployees} icon="⏸️" accent="red" />
        <DashboardCard title="Departments" value={stats.departmentCount} icon="🏢" accent="purple" />
      </div>

      {/* Chart - Responsive Container */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Employees by Department
        </h2>
        <div className="h-[200px] w-full sm:h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.byDepartment} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis
                dataKey="department"
                tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                interval={0}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tw-bg-white)',
                  borderColor: 'var(--tw-border-gray-200)',
                  color: 'var(--tw-text-gray-900)',
                }}
                cursor={{ fill: 'rgba(59, 107, 237, 0.1)' }}
              />
              <Bar dataKey="count" fill="#3b6fed" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;