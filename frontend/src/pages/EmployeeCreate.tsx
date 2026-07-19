import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createEmployee, fetchEmployees } from '../services/employeeService';
import EmployeeForm from '../components/EmployeeForm';
import type { EmployeeFormInput } from '../types';

const EmployeeCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [managers, setManagers] = useState<{ _id: string; name: string; employeeId: string }[]>([]);

  useEffect(() => {
    const loadManagers = async () => {
      const data = await fetchEmployees({ limit: 100 });
      setManagers(data.employees.map((e) => ({ _id: e._id, name: e.name, employeeId: e.employeeId })));
    };
    loadManagers();
  }, []);

  const handleSubmit = async (values: EmployeeFormInput) => {
    const payload = { ...values, reportingManager: values.reportingManager || undefined };
    const created = await createEmployee(payload);
    navigate(`/employees/${created._id}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">Add New Employee</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <EmployeeForm
          currentUserRole={user!.role}
          managers={managers}
          onSubmit={handleSubmit}
          submitLabel="Create Employee"
        />
      </div>
    </div>
  );
};

export default EmployeeCreate;
