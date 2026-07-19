import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-white px-4 text-center dark:from-gray-900 dark:to-gray-800">
    <h1 className="text-4xl font-bold text-brand-700 dark:text-brand-100">Employee Management System</h1>
    <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-400">
      A complete solution for managing employees, roles, departments, and organizational structure.
    </p>
    <Link
      to="/login"
      className="mt-8 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-700"
    >
      Sign In
    </Link>
  </div>
);

export default Landing;
