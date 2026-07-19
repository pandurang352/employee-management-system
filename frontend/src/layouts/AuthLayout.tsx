// import { Outlet } from 'react-router-dom';

// const AuthLayout = () => (
//   <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-white px-4 dark:from-gray-900 dark:to-gray-800">
//     <div className="w-full max-w-md">
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-100">EMS</h1>
//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Employee Management System</p>
//       </div>
//       <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
//         <Outlet />
//       </div>
//     </div>
//   </div>
// );

// export default AuthLayout;


import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-white px-4 dark:from-gray-900 dark:to-gray-800">
    <div className="w-full max-w-md">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="text-2xl font-bold text-brand-700 dark:text-brand-100 sm:text-3xl">EMS</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Employee Management System</p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;