import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchEmployee, updateEmployee } from '../services/employeeService';
import type { Employee, EmployeeFormInput } from '../types';
import EmployeeForm from '../components/EmployeeForm';
import Loader from '../components/Loader';

const Profile = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const data = await fetchEmployee(user._id);
      setEmployee(data);
      setLoading(false);
    };
    load();
  }, [user]);

  const handleSubmit = async (values: EmployeeFormInput) => {
    if (!user) return;
    await updateEmployee(user._id, { phone: values.phone });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <Loader />;
  if (!employee || !user) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">My Profile</h1>

      {success && (
        <div className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          Profile updated successfully.
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <EmployeeForm
          initialValues={employee}
          currentUserRole={user.role}
          isSelf
          managers={[]}
          onSubmit={handleSubmit}
          submitLabel="Update Profile"
        />
      </div>
    </div>
  );
};

export default Profile;
