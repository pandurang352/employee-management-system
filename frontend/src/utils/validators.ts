export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidPhone = (value: string): boolean => /^[0-9]{10}$/.test(value);

export const isPositiveNumber = (value: number): boolean => !Number.isNaN(value) && value >= 0;

export interface EmployeeFormErrors {
  [key: string]: string | undefined;
}

interface ValidatableFields {
  name: string;
  email: string;
  password?: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
}

export const validateEmployeeForm = (
  values: ValidatableFields,
  requirePassword: boolean
): EmployeeFormErrors => {
  const errors: EmployeeFormErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!values.email || !isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (requirePassword && (!values.password || values.password.length < 6)) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!values.phone || !isValidPhone(values.phone)) {
    errors.phone = 'Phone must be exactly 10 digits';
  }
  if (!values.department || !values.department.trim()) {
    errors.department = 'Department is required';
  }
  if (!values.designation || !values.designation.trim()) {
    errors.designation = 'Designation is required';
  }
  if (values.salary === undefined || values.salary === null || !isPositiveNumber(Number(values.salary))) {
    errors.salary = 'Salary must be a positive number';
  }
  if (!values.joiningDate) {
    errors.joiningDate = 'Joining date is required';
  }

  return errors;
};

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
