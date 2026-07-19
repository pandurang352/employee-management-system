import { useState, FormEvent } from 'react';
import type { Employee, EmployeeFormInput, Role, Status } from '../types';
import { validateEmployeeForm, EmployeeFormErrors } from '../utils/validators';

interface EmployeeFormProps {
  initialValues?: Partial<Employee>;
  currentUserRole: Role;
  isSelf?: boolean;
  managers: { _id: string; name: string; employeeId: string }[];
  onSubmit: (values: EmployeeFormInput) => Promise<void>;
  submitLabel?: string;
}

const EmployeeForm = ({
  initialValues,
  currentUserRole,
  isSelf = false,
  managers,
  onSubmit,
  submitLabel = 'Save Employee',
}: EmployeeFormProps) => {
  const isEdit = Boolean(initialValues?._id);
  // Employees editing their own profile can only touch phone
  const restrictedToLimitedFields = currentUserRole === 'employee' && isSelf;

  const [values, setValues] = useState<EmployeeFormInput>({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    password: '',
    phone: initialValues?.phone || '',
    department: initialValues?.department || '',
    designation: initialValues?.designation || '',
    salary: initialValues?.salary || 0,
    joiningDate: initialValues?.joiningDate ? initialValues.joiningDate.slice(0, 10) : '',
    status: (initialValues?.status as Status) || 'active',
    role: (initialValues?.role as Role) || 'employee',
    reportingManager: initialValues?.reportingManager?._id || '',
  });
  const [errors, setErrors] = useState<EmployeeFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const inputClass =
    'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-700';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300';
  const errorClass = 'mt-1 text-xs text-rose-600';

  const handleChange = (field: keyof EmployeeFormInput, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateEmployeeForm(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        department: values.department,
        designation: values.designation,
        salary: Number(values.salary),
        joiningDate: values.joiningDate,
      },
      !isEdit
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const payload = { ...values, salary: Number(values.salary) };
      if (isEdit && !payload.password) delete payload.password;
      await onSubmit(payload);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong. Please try again.';
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = restrictedToLimitedFields;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            disabled={disabled}
            className={inputClass}
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            disabled={disabled || isEdit}
            type="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        {!isEdit && (
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              className={inputClass}
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {errors.password && <p className={errorClass}>{errors.password}</p>}
          </div>
        )}

        <div>
          <label className={labelClass}>Phone</label>
          <input
            className={inputClass}
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <label className={labelClass}>Department</label>
          <input
            disabled={disabled}
            className={inputClass}
            value={values.department}
            onChange={(e) => handleChange('department', e.target.value)}
          />
          {errors.department && <p className={errorClass}>{errors.department}</p>}
        </div>

        <div>
          <label className={labelClass}>Designation</label>
          <input
            disabled={disabled}
            className={inputClass}
            value={values.designation}
            onChange={(e) => handleChange('designation', e.target.value)}
          />
          {errors.designation && <p className={errorClass}>{errors.designation}</p>}
        </div>

        <div>
          <label className={labelClass}>Salary</label>
          <input
            disabled={disabled}
            type="number"
            min={0}
            className={inputClass}
            value={values.salary}
            onChange={(e) => handleChange('salary', Number(e.target.value))}
          />
          {errors.salary && <p className={errorClass}>{errors.salary}</p>}
        </div>

        <div>
          <label className={labelClass}>Joining Date</label>
          <input
            disabled={disabled}
            type="date"
            className={inputClass}
            value={values.joiningDate}
            onChange={(e) => handleChange('joiningDate', e.target.value)}
          />
          {errors.joiningDate && <p className={errorClass}>{errors.joiningDate}</p>}
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            disabled={disabled}
            className={inputClass}
            value={values.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Role</label>
          <select
            disabled={disabled || currentUserRole === 'employee'}
            className={inputClass}
            value={values.role}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="hr_manager">HR Manager</option>
            {currentUserRole === 'super_admin' && <option value="super_admin">Super Admin</option>}
          </select>
        </div>

        <div>
          <label className={labelClass}>Reporting Manager</label>
          <select
            disabled={disabled}
            className={inputClass}
            value={values.reportingManager || ''}
            onChange={(e) => handleChange('reportingManager', e.target.value)}
          >
            <option value="">None</option>
            {managers.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name} ({m.employeeId})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-brand-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

export default EmployeeForm;
