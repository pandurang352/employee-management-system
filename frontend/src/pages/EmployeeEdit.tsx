import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { fetchEmployee, updateEmployee, fetchEmployees } from '../services/employeeService';
import EmployeeForm from '../components/EmployeeForm';
import Loader from '../components/Loader';
import type { Employee, EmployeeFormInput } from '../types';

const EmployeeEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [managers, setManagers] = useState<{ _id: string; name: string; employeeId: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const [emp, list] = await Promise.all([fetchEmployee(id), fetchEmployees({ limit: 100 })]);
        setEmployee(emp);
        setManagers(
          list.employees
            .filter((e) => e._id !== id)
            .map((e) => ({ _id: e._id, name: e.name, employeeId: e.employeeId }))
        );
      } catch {
        setError('Unable to load employee.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (values: EmployeeFormInput) => {
    if (!id) return;
    const payload = { ...values, reportingManager: values.reportingManager || undefined };
    await updateEmployee(id, payload);
    navigate(`/employees/${id}`);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!employee) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">Edit Employee</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <EmployeeForm
          initialValues={employee}
          currentUserRole={user!.role}
          isSelf={user!._id === employee._id}
          managers={managers}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EmployeeEdit;
