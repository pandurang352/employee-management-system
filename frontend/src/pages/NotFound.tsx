import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    <h1 className="text-6xl font-bold text-brand-600">404</h1>
    <p className="mt-2 text-gray-500 dark:text-gray-400">Page not found</p>
    <Link to="/" className="mt-4 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
      Go Home
    </Link>
  </div>
);

export default NotFound;
