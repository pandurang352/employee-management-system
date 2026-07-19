import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEmployee, fetchReportees } from '../services/employeeService';
import type { Employee } from '../types';
import Loader from '../components/Loader';
import { formatCurrency, formatDate } from '../utils/validators';

const roleLabel: Record<string, string> = {
  super_admin: 'Super Admin',
  hr_manager: 'HR Manager',
  employee: 'Employee',
};

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [reportees, setReportees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const [emp, reps] = await Promise.all([fetchEmployee(id), fetchReportees(id)]);
        setEmployee(emp);
        setReportees(reps);
      } catch {
        setError('Unable to load employee details. You may not have permission to view this profile.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!employee) return null;

  const detailRow = (label: string, value: string) => (
    <div className="flex justify-between border-b border-gray-100 py-2 text-sm dark:border-gray-700">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-800 dark:text-gray-100">{value}</span>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{employee.name}</h1>
        <Link
          to={`/employees/${employee._id}/edit`}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Edit
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {detailRow('Employee ID', employee.employeeId)}
        {detailRow('Email', employee.email)}
        {detailRow('Phone', employee.phone)}
        {detailRow('Department', employee.department)}
        {detailRow('Designation', employee.designation)}
        {detailRow('Salary', formatCurrency(employee.salary))}
        {detailRow('Joining Date', formatDate(employee.joiningDate))}
        {detailRow('Status', employee.status)}
        {detailRow('Role', roleLabel[employee.role])}
        {detailRow('Reporting Manager', employee.reportingManager?.name || 'None')}
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Direct Reportees ({reportees.length})
        </h2>
        {reportees.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No direct reportees.</p>
        ) : (
          <ul className="space-y-2">
            {reportees.map((r) => (
              <li key={r._id}>
                <Link to={`/employees/${r._id}`} className="text-sm text-brand-600 hover:underline">
                  {r.name} &middot; {r.designation}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
